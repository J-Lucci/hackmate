function fetchAndPopulateGuide() {
    const serviceName = window.location.hash.substring(1).toLowerCase();

    Promise.all([
        fetch('guides.json').then(response => response.json()),
        fetch('tools.json').then(response => response.json())
    ])
    .then(([guidesData, toolsData]) => {
        const guide = guidesData.guides.find(g => g.service.toLowerCase() === serviceName);
        const guideContainer = document.getElementById('guide-info');

        if (guideContainer && guide) {
            guideContainer.innerHTML = `<h1>${guide.title}</h1><h4>${linkifyTools(guide.introduction, toolsData.tools)}</h4>`;

            guide.steps.forEach((step, index) => {
                const stepId = `step-${index}`;
                const linkedStep = linkifyTools(step, toolsData.tools);
                guideContainer.innerHTML += `
                    <div class="step">
                        <input type="checkbox" id="${stepId}" name="step${index}" class="step-checkbox" onclick="toggleStrikeThrough(this)">
                        <label for="${stepId}">${linkedStep}</label>
                    </div>
                `;
            });

            if (guide.tips && guide.tips.length > 0) {
                guideContainer.innerHTML += `<h2>Tips</h2>`;
                guide.tips.forEach(tip => {
                    guideContainer.innerHTML += `<p>${linkifyTools(tip, toolsData.tools)}</p>`;
                });
            }

            if (guide.conclusion) {
                guideContainer.innerHTML += `<h2>Conclusion</h2><p>${linkifyTools(guide.conclusion, toolsData.tools)}</p>`;
            }

            // Populate tool details based on the service name in their sections
            toolsData.tools.forEach(tool => {
                tool.sections.forEach(section => {
                    if (section.title.toLowerCase() === serviceName) {
                        // Check if the section has a port and add it next to the header
                        const portInfo = section.port ? `<span class="port-style">${section.port}</span>` : '';
                        guideContainer.innerHTML += `
                            <div class="tool-section">
                                <h2>Tool: ${tool.name} ${portInfo}</h2>
                                <p>Description: ${linkifyTools(section.description, toolsData.tools)}</p>
                                // You can add more details here as needed
                            </div>
                        `;
                    }
                });
            });
        } else {
            console.error('Guide not found or the guide container element does not exist in the DOM.');
        }
    })
    .catch(error => {
        console.error('Error fetching guide data:', error);
    });
}

function linkifyTools(text, tools) {
    tools.forEach(tool => {
        if (tool && tool.name) { // Check if tool and tool.name are not undefined
            const toolLink = `<a href="/tool.html#${encodeURIComponent(tool.name.toLowerCase())}">${tool.name}</a>`;
            const regex = new RegExp(`\\b${tool.name}\\b`, 'gi');
            text = text.replace(regex, toolLink);
        }
    });
    return text;
}

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', (event) => {
    fetchAndPopulateGuide();
});
