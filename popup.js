document.getElementById('startBtn').addEventListener('click', async () => {
  const count = parseInt(document.getElementById('count').value);
  const delay = parseInt(document.getElementById('delay').value);
  const startBtn = document.getElementById('startBtn');

  if (count < 1 || count > 200) {
    showStatus('Veuillez entrer un nombre entre 1 et 200', 'error');
    return;
  }

  startBtn.disabled = true;
  showStatus('📸 Capture en cours...', 'info');

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    console.log('Tab trouvé:', tab.id);
    
    const screenshots = [];
    
    for (let i = 0; i < count; i++) {
      showStatus(`📸 Capture ${i + 1}/${count}...`, 'info');
      console.log(`Capture ${i + 1}/${count}...`);
      
      const response = await chrome.runtime.sendMessage({ action: 'captureTab' });
      console.log('Réponse reçue');
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      if (!response.dataUrl) {
        throw new Error('Pas de dataUrl dans la réponse');
      }
      
      screenshots.push(response.dataUrl);
      console.log(`Screenshot ${i + 1} capturé`);
      
      if (i < count - 1) {
        console.log('Envoi flèche droite...');
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => {
            const event = new KeyboardEvent('keydown', {
              key: 'ArrowRight',
              code: 'ArrowRight',
              keyCode: 39,
              which: 39,
              bubbles: true,
              cancelable: true
            });
            document.dispatchEvent(event);
            document.body.dispatchEvent(event);
            
            const nextBtn = document.querySelector('[data-testid="next-page-button"], button[aria-label*="next" i]');
            if (nextBtn) {
              console.log('Clic sur bouton suivant');
              nextBtn.click();
            }
          }
        });
        
        console.log(`Attente ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    console.log(`${screenshots.length} screenshots capturés`);
    showStatus('📄 Génération du PDF...', 'info');
    
    await generatePDF(screenshots);
    
    showStatus('✅ PDF généré et téléchargé !', 'success');
    setTimeout(() => {
      startBtn.disabled = false;
      document.getElementById('status').style.display = 'none';
    }, 3000);

  } catch (error) {
    console.error('Erreur globale:', error);
    showStatus('❌ Erreur : ' + (error.message || 'Erreur inconnue'), 'error');
    startBtn.disabled = false;
  }
});

function showStatus(message, type) {
  const statusDiv = document.getElementById('status');
  statusDiv.textContent = message;
  statusDiv.className = type;
  statusDiv.style.display = 'block';
}

async function generatePDF(screenshots) {
  console.log('Génération PDF avec', screenshots.length, 'images');
  
  if (!window.jspdf) {
    throw new Error('jsPDF non chargé');
  }
  
  const { jsPDF } = window.jspdf;
  
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });
  
  for (let i = 0; i < screenshots.length; i++) {
    console.log(`Ajout page ${i + 1}/${screenshots.length}`);
    if (i > 0) pdf.addPage();
    
    pdf.addImage(screenshots[i], 'PNG', 0, 0, 297, 210);
  }
  
  // Télécharger
  const filename = `canva_export_${new Date().toISOString().slice(0, 10)}.pdf`;
  console.log('Téléchargement:', filename);
  pdf.save(filename);
  console.log('✅ PDF sauvegardé');
}
