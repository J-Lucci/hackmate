document.addEventListener('DOMContentLoaded', (event) => {
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.id = 'ip-input';
    inputElement.value = '192.168.1.1'; // pre-fill the input box with an IP address

    const textNode = document.createTextNode(' enter your target IP here to autofill the IP for each command below: ');

    const headerElement = document.querySelector('h1');
    headerElement.parentNode.insertBefore(inputElement, headerElement.nextSibling);
    headerElement.parentNode.insertBefore(textNode, inputElement.nextSibling);

    function replaceTextInNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            const originalText = node.nodeValue;
            const replacedText = originalText.replace(/<target_ip>/g, '<span class="ip-placeholder">' + inputElement.value + '</span>'); // replace <target_ip> with the value of the input box
            if (originalText !== replacedText) {
                const newElement = document.createElement('span');
                newElement.innerHTML = replacedText;
                node.parentNode.replaceChild(newElement, node);
            }
        }
    }

    function walkTheDOM(node, func) {
        func(node);
        node = node.firstChild;
        while (node) {
            walkTheDOM(node, func);
            node = node.nextSibling;
        }
    }

    walkTheDOM(document.body, replaceTextInNode);

    document.getElementById('ip-input').addEventListener('input', function(e) {
        const ipAddress = e.target.value;
        document.querySelectorAll('.ip-placeholder').forEach(ipPlaceholder => {
            ipPlaceholder.textContent = ipAddress;
        });
    });
});