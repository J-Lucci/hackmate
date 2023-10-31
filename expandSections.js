function expandHeaders() {
    document.querySelectorAll('h2:not(.listener-attached)').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;

            if (content.style.display === 'block' || content.style.display === 'inline-block') { // Updated this line
                content.style.display = 'none';
                header.classList.remove('expanded');
            } else {
                content.style.display = 'block';
                header.classList.add('expanded');
            }
        });
        header.classList.add('listener-attached');
    });
}
