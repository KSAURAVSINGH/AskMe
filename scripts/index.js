document.getElementById("save-btn").onclick = async () => {
  const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
  let result;
  try {
    [{result}] = await chrome.scripting.executeScript({
      target: {tabId: tab.id},
      func: () => getSelection().toString(),
    });
  } catch (e) {
    return; // ignoring an unsupported page like chrome://extensions
  }
  console.log(result)
  document.body.append('Selection: ' + result);
  const data = document.getElementById("text").innerHTML = result;
};