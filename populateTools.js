function fetchAndPopulateTools() {
    const toolName = window.location.hash.substring(1); // Get tool name from URL fragment
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
            const toolInfo = data.tools.find(tool => tool.name === toolName || tool.title === toolName);

            if (toolInfo) {
                toolInfoContainer.innerHTML = `<h1>${toolInfo.name || toolInfo.title}</h1>`;
                
                // Use a Set to ensure unique flags and their descriptions
                const uniqueFlagsSet = new Set();

                toolInfo.sections.forEach(section => {
                    if (section.usefulFlags) {
                        section.usefulFlags.forEach(flagItem => {
                            uniqueFlagsSet.add(JSON.stringify(flagItem)); // Use stringified object for uniqueness
                        });
                    }

                    toolInfoContainer.innerHTML += `
                        <h2>${section.title} <span class="port-style">${section.port ? `${section.port}` : ""}</span></h2>
                        <div class="section">
                            <p>${section.description}</p>
                            ${section.basicCommand ? `<h4>Basic Commands:</h4><pre><code>${section.basicCommand}</code></pre>` : ""}
                            ${section.example ? `<pre><code>${section.example}</code></pre>` : ""}
                            ${section.advancedUsage ? `<h4>Advanced Usage:</h4><blockquote><p>${section.advancedUsage}</p></blockquote>` : ""}
                            ${section.scriptExamples ? section.scriptExamples.map(script => `<h4>${script.title}:</h4><blockquote><p>${script.description}</p><pre><code>${script.example}</code></pre></blockquote>`).join('') : ""}
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

                expandHeaders();
                attachCodeBlockCopyListeners();
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}
fetchAndPopulateTools();
