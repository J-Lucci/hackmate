(function() {
    const table = document.querySelector('#flags-modal .special-tool-table');
    if (!table) {
        console.error('Table not found');
        return;
    }

    fetch('tools.json')
        .then(response => response.json())
        .then(data => {
            const tools = data.tools;
            if (!tools) {
                console.error('No tools data found');
                return;
            }

            const nmapData = tools.find(tool => tool.name === 'Nmap');
            if (!nmapData) {
                console.error('No Nmap data found');
                return;
            }

            const nmapFlags = nmapData.sections.find(section => section.title === 'Flags').content;
            if (!nmapFlags) {
                console.error('No Nmap flags found');
                return;
            }

            nmapFlags.forEach(item => {
                const row = document.createElement('tr');

                const flagCell = document.createElement('td');
                flagCell.textContent = item.flag;
                row.appendChild(flagCell);

                const descriptionCell = document.createElement('td');
                descriptionCell.textContent = item.description;
                row.appendChild(descriptionCell);

                const exampleCell = document.createElement('td');
                const code = document.createElement('code');
                code.textContent = item.example || '';
                exampleCell.appendChild(code);
                row.appendChild(exampleCell);

                table.appendChild(row);
            });
        });
})();