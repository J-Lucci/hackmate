function copyToClipboard(e, text) {
    const textarea = document.createElement('textarea');
    textarea.textContent = text;
    document.body.appendChild(textarea);
    
    textarea.select();
    document.execCommand('copy');
    
    document.body.removeChild(textarea);
    console.log('Copied to clipboard:', text);

    // Create a tooltip
    const tooltip = document.createElement('span');
    tooltip.textContent = 'Copied!';
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = 'black';
    tooltip.style.color = 'white';
    tooltip.style.padding = '5px';
    tooltip.style.borderRadius = '5px';
    tooltip.style.zIndex = '1000';

    // Append the tooltip to the body
    document.body.appendChild(tooltip);

    // Position the tooltip under the mouse cursor
    tooltip.style.left = `${e.pageX}px`;
    tooltip.style.top = `${e.pageY - 30}px`;

    // Remove the tooltip after 2 seconds
    setTimeout(function() {
        document.body.removeChild(tooltip);
    }, 2000);
}

function attachCodeBlockCopyListeners() {
    document.querySelectorAll('pre code').forEach(codeBlock => {
        console.log('Found a code block, attaching event.');

        codeBlock.addEventListener('click', (e) => {
            console.log('Code block clicked!');
            copyToClipboard(e, codeBlock.innerText);
        });
    });
}

// Attach the copy listeners initially (for code blocks visible on page load).
attachCodeBlockCopyListeners();