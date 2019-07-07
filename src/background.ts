// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     console.log(sender.tab ? "from a content script:" + sender.tab.url :  "from the extension");

//     // if (request.greeting == "hello"){
//       sendResponse({farewell: "goodbye"});
//     // }

//     if (request.action === 'GET_DOCUMENT_HTML') {
//       sendResponse({ hoi: 'test' })
//     }

//     chrome.tabs.sendMessage(sender.tab.id, { action: 'GET_DOCUMENT_HTML'}, doStuffWithDom);

//     return true
//   });

  chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#3aa757'}, function() {
      console.log("The color is green.");
    });
  });

  // function doStuffWithDom(domContent) {
  //   console.log('I received the following DOM content:\n' + domContent);
// }
