// A generic onclick callback function.
function genericOnClick(info, tab) {
  alert('Save the url')
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
}

// Create one test item for each context type.
chrome.contextMenus.create({
  title: 'Save to playpost',
  contexts: ['page', 'link', 'selection', 'link'],
  onclick: genericOnClick
});
