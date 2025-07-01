const key = JSON.parse(localStorage.getItem("profile"))?.auth?.key;
const addonManagerLink = "https://addon-manager.dontwanttos.top/"

function handleButtonClick() {
  navigator.clipboard.writeText(key);
  window.open(addonManagerLink, "_blank");
}

function setupButton() {
  const addonButton = document.querySelector("[class^=add-button-container");
  const editOrderButton = document.createElement("button");

  editOrderButton.classList = addonButton.classList;
  editOrderButton.style = "color: white; font-weight: bold; right: unset;"
  editOrderButton.innerText = "Edit Order";
  editOrderButton.addEventListener("click", handleButtonClick);

  addonButton.insertAdjacentElement('beforebegin', editOrderButton);
};

const insertButtonObserver = new MutationObserver((_, observer) => {
  if (document.querySelector("[class^=add-button-container")) {
    setupButton();
    observer.disconnect();
  }
});

function insertButton() {
  if (/#\/addons.*/.test(window.location.href)) {
    insertButtonObserver.observe(document.body, {
      attributes: false,
      characterData: false,
      childList: true,
      subtree: true,
    });
  }
}

insertButton();
window.addEventListener("popstate", insertButton);
