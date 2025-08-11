// script.js
// Adds flip functionality to project cards and improves accessibility

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    // Toggle flipped state on click
    card.addEventListener('click', (e) => {
      // Prevent toggle when clicking on links inside the card
      if (e.target.closest('a')) {
        return;
      }
      card.classList.toggle('flipped');
    });
    // Allow keyboard interaction (Enter or Space)
    card.addEventListener('keypress', (e) => {
      const key = e.key || e.code;
      if (key === 'Enter' || key === ' ' || key === 'Spacebar') {
        e.preventDefault();
        card.classList.toggle('flipped');
      }
    });
  });
});