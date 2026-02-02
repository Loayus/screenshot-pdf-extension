chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Background reçu:', request.action);
  
  if (request.action === 'captureTab') {
    chrome.tabs.captureVisibleTab(
      null,
      { format: 'png', quality: 100 },
      (dataUrl) => {
        if (chrome.runtime.lastError) {
          console.error('Erreur capture:', chrome.runtime.lastError);
          sendResponse({ error: chrome.runtime.lastError.message });
        } else {
          console.log('Capture réussie, taille:', dataUrl.length);
          sendResponse({ dataUrl: dataUrl });
        }
      }
    );
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

console.log('Background script chargé');
