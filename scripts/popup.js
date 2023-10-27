function createSearchBox(){

  const container = document.getElementById('container');
  const searchInput = document.createElement('input');

  searchInput.type = 'text';
  searchInput.placeholder = 'Enter your search query...';
  searchInput.setAttribute('class', 'search-box');

  const searchButton = document.createElement('button');
  searchButton.textContent = 'Search';
  searchButton.setAttribute('class', 'search-button');

  container.appendChild(searchInput);
  container.appendChild(searchButton);

  async function handleSearch() {

  const inputText = searchInput.value;
  const searchQuery = prepareInputText(inputText)

  console.log('Search Query:', searchQuery);
  console.log("The length of the searchQuery: ", searchQuery.length)
  if(inputText.length>0){
    const searchEl = document.getElementById('container')
    searchEl.remove();

    const paragraphEl = document.getElementById('output');
    paragraphEl.setAttribute('class', 'paragraph-output');

    const paragraphDivEl = document.getElementById('text-response');
    paragraphDivEl.setAttribute('class', 'scrollable-paragraph');

    await generateResponseFromGPT(searchQuery.toString());
    
  }

  }

  searchButton.addEventListener('click', handleSearch);

}

async function generateResponseFromGPT(inputValue){
  
  // create the body
  const body = {
    "prompt": inputValue,
    "temperature": 0.5,
    "max_tokens": 100,
    "n": 1,
    "stop": null,
    "model": "text-davinci-002"
  }
  console.log("Body passed: ", body)
  console.log("Waiting for chatgpt response...")

  await fetch("https://api.openai.com/v1/completions",{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': ''
    },
    'body': JSON.stringify(body)
  })
  .then(response => response.json())
  .then(response => {
    console.log("Response from ChatGPT: ", response);
    document.getElementById("output").innerHTML = "Searching...";
    setTimeout(()=>{
      if(response.choices[0].text){
        document.getElementById("output").innerHTML = extractTheResponse(response.choices[0].text.toString());
      }
      else{
        document.getElementById("output").innerHTML = "No response generated for the text selected";
      }
    }, 1000);          
    console.log("The response received: ", response)
  })
  .catch(err=>{
    document.getElementById("Something happened, please try later");
    console.log("Error occured: ", err);
  })
  
}

function prepareInputText(inputValue){
  // ask a valid question to chatgpt

  let refinedInputValue = "Tell me something about " + inputValue;
  return refinedInputValue;

}

function extractTheResponse(outputResponse){

  let cleanedText = outputResponse.replace(/[\n\r]/g, "");
  console.log(cleanedText);

  return cleanedText;
}

window.onload  =  function() {
  chrome.tabs.executeScript( {
    code: "window.getSelection().toString();"
    },function(selection) {
      chrome.runtime.sendMessage({selection: selection[0]}, async function(response) {
      
      let inputValue = response.clips;
      // document.getElementById("output").innerHTML  =  inputValue;   
      
      console.log("Text selected: ", inputValue);
      if(inputValue=="No text selected"){

        console.log("Creating a new search box")      
        createSearchBox();        
      }      
      else{   
        const existElForResponse = document.getElementById('container')
        existElForResponse.remove();   
        let refinedInputValue = prepareInputText(inputValue)  

        const paragraphEl = document.getElementById('output');
        paragraphEl.setAttribute('class', 'paragraph-output');

        const paragraphDivEl = document.getElementById('text-response');
        paragraphDivEl.setAttribute('class', 'scrollable-paragraph');

        generateResponseFromGPT(refinedInputValue);
      }      
    });
  });  
}

  