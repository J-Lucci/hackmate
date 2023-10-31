// displayTools.js

function displayTools(data) {
    const toolsList = document.getElementById('tools-list');
  
    data.tools.forEach(tool => {
      const toolContainer = document.createElement('div');
      toolContainer.className = 'tool-container';
  
      const toolHeader = document.createElement('div');
      toolHeader.className = 'tool-header';
      toolHeader.textContent = tool.name;
      toolHeader.addEventListener('click', () => {
        toolContainer.classList.toggle('expanded');
      });
  
      const sectionsContainer = document.createElement('div');
      sectionsContainer.className = 'sections-container';
  
      tool.sections.forEach(section => {
        const sectionContainer = document.createElement('div');
        sectionContainer.className = 'section-container';
  
        const sectionHeader = document.createElement('div');
        sectionHeader.className = 'section-header';
        sectionHeader.textContent = section.title;
  
        const sectionContent = document.createElement('div');
        sectionContent.className = 'section-content';
        sectionContent.innerHTML = `
          <p><strong>Port:</strong> ${section.port}</p>
          <p><strong>Description:</strong> ${section.description}</p>
          <p><strong>Basic Command:</strong> ${section.basicCommand}</p>
          <p><strong>Example:</strong> ${section.example}</p>
          <p><strong>Additional Options:</strong> ${section.additionalOptions.join(', ')}</p>
          <p><strong>Advanced Usage:</strong> ${section.advancedUsage}</p>
        `;
  
        sectionContainer.appendChild(sectionHeader);
        sectionContainer.appendChild(sectionContent);
        sectionsContainer.appendChild(sectionContainer);
      });
  
      toolContainer.appendChild(toolHeader);
      toolContainer.appendChild(sectionsContainer);
      toolsList.appendChild(toolContainer);
    });
  }
  