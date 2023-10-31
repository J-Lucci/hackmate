function fetchAndPopulateTools() {
    const toolName = window.location.hash.substring(1);
    fetch('tools.json')
        .then(response => response.json())
        .then(data => {
            const toolInfoContainer = document.getElementById('tool-info');
            const toolInfo = data.tools.find(tool => tool.name === toolName || tool.title === toolName);

            if (toolInfo) {
                let newContent = `<h1>${toolInfo.name || toolInfo.title}</h1>`;
                toolInfo.sections.forEach(section => {
                    newContent += `
                        <h2>${section.title}</h2>
                        <div class="section">
                        <p style="margin-left: 10px;">${section.description}</p>
                        ${section.port ? `<h3>Port: ${section.port}</h3>` : ""}
                        ${section.basicCommand ? `<h4>Basic Commands:</h4><pre><code>${section.basicCommand}</code></pre>` : ""}
                        ${section.example ? `<pre><code>${section.example}</code></pre>` : ""}
                        ${section.additionalOptions ? `<h4>Additional Options:</h4><ul>${section.additionalOptions.map(option => `<li>${option}</li>`).join('')}</ul>` : ""}
                        ${section.advancedUsage ? `<h4>Advanced Usage:</h4><p style="margin-left: 25px;margin-top: 10px;">${section.advancedUsage}</p>` : ""}
                        ${section.scriptExamples ? section.scriptExamples.map(script => `<h4>${script.title}:</h4><p>${script.description}</p><pre><code>${script.example}</code></pre>`).join('') : ""}
                        ${section.additionalFlags ? section.additionalFlags.map(flag => `<h4>${flag.flag}:</h4><p>${flag.description}</p>`).join('') : ""}
                        </div>
                    `;
                });
                toolInfoContainer.innerHTML = newContent;
                expandHeaders(); // Call expandHeaders after updating innerHTML
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}
// Call the function immediately when the script loads
fetchAndPopulateTools();