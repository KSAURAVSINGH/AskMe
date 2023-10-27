export function createSearchBox(){
    // JavaScript in yourJavaScriptFile.js

    // Create the container div
    const container = document.getElementById('container');

    // Create the search input element
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Enter your search query...';

    // Create the search button
    const searchButton = document.createElement('button');
    searchButton.textContent = 'Search';

    // Append the search input and search button to the container div
    container.appendChild(searchInput);
    container.appendChild(searchButton);

    // Function to handle the search
    function handleSearch() {
    const searchQuery = searchInput.value;
    // You can perform your search logic here using the searchQuery
    console.log('Search Query:', searchQuery);
    // Perform other actions as needed
    }

    // Add a click event listener to the search button
    searchButton.addEventListener('click', handleSearch);
    return searchQuery;
}
