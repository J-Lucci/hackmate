document.getElementById('show-flags-btn').addEventListener('click', function() {
    document.getElementById('flags-modal').style.display = 'flex'; /* Changed from block to flex */
});

document.getElementById('flags-modal').addEventListener('click', function(event) {
    if (event.target == this) {
        this.style.display = 'none';
    }
});