function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.textContent = text;
    document.body.appendChild(textarea);
    
    textarea.select();
    document.execCommand('copy');
    
    document.body.removeChild(textarea);
    console.log('Copied to clipboard:', text);
}

function attachCodeBlockCopyListeners() {
    document.querySelectorAll('pre code').forEach(codeBlock => {
        console.log('Found a code block, attaching event.');

        codeBlock.addEventListener('click', () => {
            console.log('Code block clicked!');
            copyToClipboard(codeBlock.innerText);
        });
    });
}

// Attach the copy listeners initially (for code blocks visible on page load).
attachCodeBlockCopyListeners();
