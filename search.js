import { tools } from './tools.json';


// document.addEventListener('DOMContentLoaded', function() {

//     const searchBox = document.getElementById('navSearchBox');
//     const dropdownMenu = document.getElementById('searchDropdownMenu');

//     tools.forEach(tool => {
//         const toolItem = document.createElement('div');
//         toolItem.textContent = tool;
//         toolItem.addEventListener('click', () => {
//             window.location.href = `${tool.toLowerCase()}.html`;
//         });
//         dropdownMenu.appendChild(toolItem);
//     });

//     searchBox.addEventListener('input', () => {
//         const searchTerm = searchBox.value.toLowerCase();
//         const filteredTools = tools.filter(tool => tool.toLowerCase().includes(searchTerm));

//         dropdownMenu.innerHTML = '';

//         filteredTools.forEach(tool => {
//             const toolItem = document.createElement('div');
//             toolItem.textContent = tool;
//             toolItem.addEventListener('click', () => {
//                 window.location.href = `${tool.toLowerCase()}.html`;
//             });
//             dropdownMenu.appendChild(toolItem);
//         });
//     });
// });







document.addEventListener('DOMContentLoaded', function() {
    // Select the search box and dropdown menu
    var searchBox = document.getElementById('navbarSearchBox');
    var dropdownMenu = document.getElementById('dropdownMenu');

    // Add an event listener to the search box
    searchBox.addEventListener('input', function() {
        // Get the search term
        var searchTerm = searchBox.value.toLowerCase();

        // Filter the tools based on the search term
        var searchResults = tools.filter(function(tool) {
            return tool.name.toLowerCase().includes(searchTerm);
        });

        // Clear the dropdown menu
        dropdownMenu.innerHTML = '';

        // Add the search results to the dropdown menu
        searchResults.forEach(function(result) {
            var link = document.createElement('a');
            link.href = result.url; // Set the href to the tool's URL
            link.textContent = result.name;
            dropdownMenu.appendChild(link);
        });
    });