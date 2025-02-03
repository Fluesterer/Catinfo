document.querySelectorAll('.info-button').forEach(button => {
    button.addEventListener('click', () => {
        const info = button.nextElementSibling;
        if (info.style.display === "block") {
            info.style.display = "none";
        } else {
            info.style.display = "block";
        }
    });
});
