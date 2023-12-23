function fetchAndPopulateTools() {
    // Check if there's a hash in the URL and make sure it's a string before calling toLowerCase
    const toolName = window.location.hash.substring(1).toLowerCase();

    fetch('tools.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data fetched:', data); // Debug line
            const toolInfoContainer = document.getElementById('tool-info');

            // Make sure data.tools is defined and then use the lowercase toolName to find the tool information
            const toolInfo = data.tools && data.tools.find(tool => 
                (tool.name && tool.name.toLowerCase().replace(/ /g, '-') === toolName) || 
                (tool.title && tool.title.toLowerCase().replace(/ /g, '-') === toolName));

            if (toolInfo) {
                    toolInfoContainer.innerHTML = `<h1>${toolInfo.name || toolInfo.title}</h1>`;
                    toolInfoContainer.innerHTML += `<p>${toolInfo.description}</p>
                    <p><a href="${toolInfo.officialSite}">Official Site</a></p>
                    <p>Installation Command: <code>${toolInfo.installationCommand}</code></p>
                `;
                // Use a Set to ensure unique flags and their descriptions
                const uniqueFlagsSet = new Set();

                // Make sure to check for undefined properties before calling toLowerCase()
                const checkAndLower = (text) => text && text.toLowerCase();
             
                    toolInfo.sections.forEach((section, index) => {
                        if (section.usefulFlags) {
                            section.usefulFlags.forEach(flagItem => {
                                uniqueFlagsSet.add(JSON.stringify(flagItem)); // Use stringified object for uniqueness
                            });
                        }

                        const sectionClass = toolInfo.sections.length === 1 ? 'section expanded' : 'section';

                        toolInfoContainer.innerHTML += `
                            <h2>${section.title} <span class="port-style">${section.port ? `-p ${section.port}` : ""}</span></h2>
                            <div class="${sectionClass}">
                                <p>${section.description}</p>
                                ${section.basicCommand ? `<h4>Basic Commands:</h4><code>${section.basicCommand}</code><br>` : ""}
                                ${section.example ? `<code>${section.example}</code>` : ""}
                                ${section.advancedUsage ? `<h4>Advanced Usage:</h4><blockquote><p>${section.advancedUsage}</p></blockquote>` : ""}
                                ${section.scriptExamples ? section.scriptExamples.map(script => `<h4>${script.title}: <span style="font-weight: normal; color: white;">${script.description}</span></h4><code>${script.example}</code>`).join('') : ""}
                                ${section.usefulFlags ? `
                                <table class="port-table">
                                    <h4>Useful Flags</h4>
                                    <thead>
                                        <tr>
                                            <th>Flag</th>
                                            <th>Description</th>
                                            <th>Example</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${section.usefulFlags.map(flagItem => `<tr><td>${flagItem.flag}</td><td>${flagItem.description}</td><td>${flagItem.example}</td></tr>`).join('')}
                                    </tbody>
                                </table>
                                ` : ""}
                            </div>
                        `;
                    });
                

                // Create combined flags table
                const combinedFlags = Array.from(uniqueFlagsSet).map(item => JSON.parse(item));
                toolInfoContainer.innerHTML += `
                    <h3>All Useful Flags</h3>
                    <table class="port-table">
                        <thead>
                            <tr>
                                <th>Flag</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${combinedFlags.map(flagItem => `<tr><td>${flagItem.flag}</td><td>${flagItem.description}</td></tr>`).join('')}
                        </tbody>
                    </table>
                `;

                // The expandHeaders() and attachCodeBlockCopyListeners() functions are assumed to be defined elsewhere.
                expandHeaders();
                attachCodeBlockCopyListeners();
            } else {
                console.error(`Tool not found: ${toolName}`);
                toolInfoContainer.innerHTML = `<p>This is still under construction, sorry! : ${toolName}</p>`;
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

fetchAndPopulateTools();
