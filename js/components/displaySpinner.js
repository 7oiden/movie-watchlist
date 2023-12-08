export function displaySpinner(targetElement) {
  const element = document.querySelector(targetElement);

  element.innerHTML = `
  <div class="spinner-container">
    <div class="spinner"></div>
    </div>
  `;
}
