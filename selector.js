let selectorState = {
    active: false,
    box: null,
    overlay: null,
    info: null,
    controls: null,
    startX: 0,
    startY: 0,
    currentHandle: null,
    isDragging: false,
    isResizing: false,
    orientation: 'landscape',
    savedSelection: null
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'startSelection') {
        startSelection(request.orientation);
        sendResponse({ success: true });
    } else if (request.action === 'getSelection') {
        sendResponse({ selection: selectorState.savedSelection });
    }
    return true;
});

function startSelection(orientation) {
    if (selectorState.active) return;

    selectorState.orientation = orientation;
    selectorState.active = true;

    const overlay = document.createElement('div');
    overlay.id = 'screenshot-selector-overlay';
    document.body.appendChild(overlay);
    selectorState.overlay = overlay;

    const box = document.createElement('div');
    box.id = 'screenshot-selector-box';
    document.body.appendChild(box);
    selectorState.box = box;

    const handles = ['nw', 'ne', 'sw', 'se', 'n', 's', 'w', 'e'];
    handles.forEach(pos => {
        const handle = document.createElement('div');
        handle.className = `screenshot-resize-handle handle-${pos}`;
        handle.dataset.position = pos;
        box.appendChild(handle);

        handle.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            startResize(e, pos);
        });
    });

    const info = document.createElement('div');
    info.id = 'screenshot-selector-info';
    document.body.appendChild(info);
    selectorState.info = info;

    createControls();

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let width, height;
    if (orientation === 'landscape') {
        width = Math.min(800, windowWidth * 0.7);
        height = width * (9/16);
    } else {
        height = Math.min(800, windowHeight * 0.7);
        width = height * (9/16);
    }

    const left = (windowWidth - width) / 2;
    const top = (windowHeight - height) / 2;

    updateBoxPosition(left, top, width, height);

    box.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', stopDragResize);
}

function createControls() {
    const controls = document.createElement('div');
    controls.id = 'screenshot-selector-controls';

    const validateBtn = document.createElement('button');
    validateBtn.id = 'screenshot-selector-validate';
    validateBtn.className = 'screenshot-selector-btn';
    validateBtn.textContent = '✓ Valider la sélection';
    validateBtn.onclick = validateSelection;

    const resetBtn = document.createElement('button');
    resetBtn.id = 'screenshot-selector-reset';
    resetBtn.className = 'screenshot-selector-btn';
    resetBtn.textContent = '↻ Réinitialiser';
    resetBtn.onclick = () => {
        stopSelection();
        startSelection(selectorState.orientation);
    };

    const cancelBtn = document.createElement('button');
    cancelBtn.id = 'screenshot-selector-cancel';
    cancelBtn.className = 'screenshot-selector-btn';
    cancelBtn.textContent = '✕ Annuler';
    cancelBtn.onclick = () => {
        selectorState.savedSelection = null;
        stopSelection();
    };

    controls.appendChild(validateBtn);
    controls.appendChild(resetBtn);
    controls.appendChild(cancelBtn);
    document.body.appendChild(controls);
    selectorState.controls = controls;
}

function updateBoxPosition(left, top, width, height) {
    const box = selectorState.box;
    box.style.left = left + 'px';
    box.style.top = top + 'px';
    box.style.width = width + 'px';
    box.style.height = height + 'px';

    selectorState.info.textContent = `${Math.round(width)} × ${Math.round(height)} px`;
    selectorState.info.style.left = (left + width + 10) + 'px';
    selectorState.info.style.top = top + 'px';
}

function startDrag(e) {
    if (e.target.classList.contains('screenshot-resize-handle')) return;

    selectorState.isDragging = true;
    const rect = selectorState.box.getBoundingClientRect();
    selectorState.startX = e.clientX - rect.left;
    selectorState.startY = e.clientY - rect.top;
    e.preventDefault();
}

function startResize(e, position) {
    selectorState.isResizing = true;
    selectorState.currentHandle = position;
    const rect = selectorState.box.getBoundingClientRect();
    selectorState.startX = e.clientX;
    selectorState.startY = e.clientY;
    selectorState.startRect = {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height
    };
    e.preventDefault();
}

function onMouseMove(e) {
    if (selectorState.isDragging) {
        const newLeft = e.clientX - selectorState.startX;
        const newTop = e.clientY - selectorState.startY;
        const rect = selectorState.box.getBoundingClientRect();

        const maxLeft = window.innerWidth - rect.width;
        const maxTop = window.innerHeight - rect.height;

        updateBoxPosition(
            Math.max(0, Math.min(newLeft, maxLeft)),
            Math.max(0, Math.min(newTop, maxTop)),
            rect.width,
            rect.height
        );
    } else if (selectorState.isResizing) {
        const dx = e.clientX - selectorState.startX;
        const dy = e.clientY - selectorState.startY;
        const start = selectorState.startRect;
        const handle = selectorState.currentHandle;

        let newLeft = start.left;
        let newTop = start.top;
        let newWidth = start.width;
        let newHeight = start.height;

        if (handle.includes('w')) {
            newLeft = start.left + dx;
            newWidth = start.width - dx;
        }
        if (handle.includes('e')) {
            newWidth = start.width + dx;
        }
        if (handle.includes('n')) {
            newTop = start.top + dy;
            newHeight = start.height - dy;
        }
        if (handle.includes('s')) {
            newHeight = start.height + dy;
        }

        if (newWidth < 100) newWidth = 100;
        if (newHeight < 100) newHeight = 100;

        if (newLeft < 0) {
            newWidth += newLeft;
            newLeft = 0;
        }
        if (newTop < 0) {
            newHeight += newTop;
            newTop = 0;
        }
        if (newLeft + newWidth > window.innerWidth) {
            newWidth = window.innerWidth - newLeft;
        }
        if (newTop + newHeight > window.innerHeight) {
            newHeight = window.innerHeight - newTop;
        }

        updateBoxPosition(newLeft, newTop, newWidth, newHeight);
    }
}

function stopDragResize() {
    selectorState.isDragging = false;
    selectorState.isResizing = false;
    selectorState.currentHandle = null;
}

function validateSelection() {
    const rect = selectorState.box.getBoundingClientRect();

    const dpr = window.devicePixelRatio || 1;

    selectorState.savedSelection = {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        x: Math.round(rect.left * dpr),
        y: Math.round(rect.top * dpr),
        w: Math.round(rect.width * dpr),
        h: Math.round(rect.height * dpr),
        orientation: selectorState.orientation
    };

    chrome.runtime.sendMessage({
        action: 'selectionSaved',
        selection: selectorState.savedSelection
    });

    stopSelection();

    const confirm = document.createElement('div');
    confirm.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #4CAF50;
    color: white;
    padding: 20px 40px;
    border-radius: 8px;
    font-size: 18px;
    font-weight: bold;
    z-index: 1000002;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  `;
    confirm.textContent = '✓ Zone de capture enregistrée !';
    document.body.appendChild(confirm);

    setTimeout(() => {
        confirm.remove();
    }, 2000);
}

function stopSelection() {
    if (selectorState.overlay) selectorState.overlay.remove();
    if (selectorState.box) selectorState.box.remove();
    if (selectorState.info) selectorState.info.remove();
    if (selectorState.controls) selectorState.controls.remove();

    selectorState.active = false;
    selectorState.box = null;
    selectorState.overlay = null;
    selectorState.info = null;
    selectorState.controls = null;

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', stopDragResize);
}