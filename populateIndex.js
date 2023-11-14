let allPorts;

window.onload = function () {
    fetch('ports.json')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('port-table-body');
            const dropdownContent = document.getElementById('dropdown-content');
            const toolsSet = new Set();


            allPorts = data.services;

            data.services.forEach(service => {
                const row = document.createElement('tr');
                const toolContainer = document.createElement('div');
                toolContainer.className = 'tool-container';

                service.tools.forEach((tool, index) => {
                    toolsSet.add(tool.name);

                    // Create a tool link
                    const toolLink = document.createElement('a');
                    toolLink.className = 'tool-link';
                    toolLink.href = `tool.html#${tool.name.toLowerCase().replace(/ /g, '-')}`;
                    toolLink.textContent = tool.name;

                    // Add the tool link to the tool container
                    toolContainer.appendChild(toolLink);

                    // Add a separator after each tool except the last one
                    if (index < service.tools.length - 1) {
                        const separator = document.createElement('span');
                        separator.className = 'tool-separator';
                        separator.textContent = ' * ';
                        toolContainer.appendChild(separator);
                    }
                });

                row.innerHTML = `
<td>${service.port}</td>
<td><a class="service-link" href="guide.html#${service.service.toLowerCase()}">${service.service}</a></td>
<td></td>
`;

                row.children[2].appendChild(toolContainer);
                tableBody.appendChild(row);
            });

            // Add event listener to search field
            const searchField = document.getElementById('search');
            searchField.addEventListener('input', function () {
                const searchValue = this.value.toLowerCase();
                const labels = dropdownContent.querySelectorAll('label');
                labels.forEach(label => {
                    const labelText = label.textContent.toLowerCase();
                    label.style.display = labelText.includes(searchValue) ? '' : 'none';
                });
            });

            // Add checkbox to hide/unhide all tools
            const allLabel = document.createElement('label');
            const allCheckbox = document.createElement('input');
            allCheckbox.type = 'checkbox';
            allCheckbox.value = 'All tools'; // Assign a value to the 'All tools' checkbox
            allCheckbox.checked = true;
            allLabel.appendChild(allCheckbox);
            allLabel.appendChild(document.createTextNode('All tools'));
            dropdownContent.appendChild(allLabel);

            // Add checkboxes for each tool
            toolsSet.forEach(tool => {
                const label = document.createElement('label');
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = tool;
                checkbox.checked = true;
                label.appendChild(checkbox);
                label.appendChild(document.createTextNode(tool));
                dropdownContent.appendChild(label);
            });

            // Add event listener to checkboxes
            dropdownContent.addEventListener('change', function (e) {
                if (e.target.type === 'checkbox') {
                    const selectedTool = e.target.value;
                    const tools = document.querySelectorAll('.tool-link');
                    const separators = document.querySelectorAll('.tool-separator');
                    const checkboxes = dropdownContent.querySelectorAll('input[type="checkbox"]');
                    if (selectedTool === 'All tools') {
                        tools.forEach(tool => {
                            tool.style.display = e.target.checked ? '' : 'none';
                        });
                        checkboxes.forEach(checkbox => {
                            if (checkbox.value !== 'All tools') {
                                checkbox.checked = e.target.checked;
                            }
                        });
                    } else {
                        tools.forEach(tool => {
                            if (tool.textContent === selectedTool) {
                                tool.style.display = e.target.checked ? '' : 'none';
                            }
                        });
                        // If any individual tool is unchecked, uncheck 'All tools' checkbox
                        if (!e.target.checked) {
                            allCheckbox.checked = false;
                        }
                    }

                    // Update separators
                    separators.forEach(separator => {
                        separator.style.display = 'none';
                    });
                    const visibleTools = [...tools].filter(tool => tool.style.display !== 'none');
                    visibleTools.forEach((tool, index) => {
                        if (index < visibleTools.length - 1) {
                            const nextSibling = tool.nextSibling;
                            if (nextSibling && nextSibling.className === 'tool-separator') {
                                nextSibling.style.display = '';
                            }
                        }
                    });
                }
            });
        });
};

// Add this line after defining the filterPorts function
document.getElementById('portInput').addEventListener('input', filterPorts);

function filterPorts() {
    // Get the user input
    let userInput = document.getElementById('portInput').value.trim();
    
    // If the user input is empty, show all the rows and return
    if (userInput === '') {
        let tableRows = document.querySelectorAll('#port-table-body tr');
        tableRows.forEach(row => {
            row.style.display = '';
        });
        return;
    }
    
    // Split the user input by commas to get the ports
    let userPorts = userInput.split(',').map(port => port.trim()); // Trim whitespace from user input
    
    // Get all the table rows
    let tableRows = document.querySelectorAll('#port-table-body tr');
    
    // Loop through the table rows
    tableRows.forEach(row => {
        // Get the port number from the first cell of the row
        let portNumber = row.cells[0].textContent.split('/')[0].trim(); // Trim whitespace from port number
        
        // If the last user port starts with the port number or any of the other user ports is the port number, show the row, otherwise hide it
        if (portNumber.startsWith(userPorts[userPorts.length - 1]) || userPorts.slice(0, -1).includes(portNumber)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}