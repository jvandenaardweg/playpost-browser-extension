// Listen for messages
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // If the received message has the expected format...
  if (message.action === 'GET_DOCUMENT_HTML') {
      // Call the specified callback, passing
      // the web-page's DOM content as argument
      sendResponse(document.all[0].outerHTML);
  }
});
