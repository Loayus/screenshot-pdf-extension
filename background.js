chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Background reçu:', request.action);

    if (request.action === 'captureTab') {
        chrome.tabs.captureVisibleTab(
            null,
            { format: 'png', quality: 100 },
            async (dataUrl) => {
                if (chrome.runtime.lastError) {
                    console.error('Erreur capture:', chrome.runtime.lastError);
                    sendResponse({ error: chrome.runtime.lastError.message });
                } else {
                    console.log('Capture réussie, taille:', dataUrl.length);

                    if (request.zone) {
                        try {
                            const croppedDataUrl = await cropImage(dataUrl, request.zone);
                            sendResponse({ dataUrl: croppedDataUrl });
                        } catch (error) {
                            console.error('Erreur recadrage:', error);
                            sendResponse({ error: error.message });
                        }
                    } else {
                        sendResponse({ dataUrl: dataUrl });
                    }
                }
            }
        );
        return true;
    }

    if (request.action === 'selectionSaved') {
        chrome.storage.local.set({ captureZone: request.selection }, () => {
            console.log('Zone de capture sauvegardée:', request.selection);
            sendResponse({ success: true });
        });
        return true;
    }

    if (request.action === 'downloadPDF') {
        chrome.downloads.download({
            url: request.dataUrl,
            filename: request.filename,
            saveAs: false
        }, (downloadId) => {
            if (chrome.runtime.lastError) {
                console.error('Erreur download:', chrome.runtime.lastError);
            } else {
                console.log('PDF téléchargé, ID:', downloadId);
            }
        });
    }
});

async function cropImage(dataUrl, zone) {
    try {
        const response = await fetch(dataUrl);
        const blob = await response.blob();

        const imageBitmap = await createImageBitmap(blob);

        const canvas = new OffscreenCanvas(zone.w, zone.h);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            imageBitmap,
            zone.x, zone.y, zone.w, zone.h,  // Source
            0, 0, zone.w, zone.h              // Destination
        );

        const croppedBlob = await canvas.convertToBlob({ type: 'image/png', quality: 1 });

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(croppedBlob);
        });
    } catch (error) {
        console.error('Erreur dans cropImage:', error);
        throw error;
    }
}

console.log('Background script chargé');