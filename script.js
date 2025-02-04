document.getElementById('theme-toggle').addEventListener('click', function() {
  const body = document.body;
  body.classList.toggle('dark-theme');

  // Text des Buttons ändern je nach Modus
  if (body.classList.contains('dark-theme')) {
    this.textContent = '🌞 Hellen Modus';
  } else {
    this.textContent = '🌙 Dunkelmodus';
  }
});


// Öffnen des Modals
function openModal(title, description, imgSrc) {
  document.getElementById('modal-title').innerText = title;
  document.getElementById('modal-description').innerText = description;
  document.getElementById('modal-image').src = imgSrc;
  document.getElementById('modal').style.display = 'block';
}

// Schließen des Modals
function closeModal() {
  document.getElementById('modal').style.display = 'none';
}
