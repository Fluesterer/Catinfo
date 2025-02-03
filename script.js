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
