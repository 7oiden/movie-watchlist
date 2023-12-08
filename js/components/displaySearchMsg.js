export function displaySearchMsg(iconType, msgType, searchMsg, targetElement) {
  const element = document.querySelector(targetElement);

  element.innerHTML = `
  <div class="search__msg-container">
  <i class="fas fa-film ${iconType}"></i>
  <p class="search__msg ${msgType}">${searchMsg}</p>
  </div>
  `;
}
