chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  let clippings = [];

  chrome.storage.sync.get("list", function (result) {
   
    if(request.selection){
      clippings = [request.selection];
    }
    else{
      clippings = ['No text selected']
    }

    sendResponse({clips: clippings});
    chrome.storage.sync.set({
        list: clippings,
    });

  });
  
  return true;

});
