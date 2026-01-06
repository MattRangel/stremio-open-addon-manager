const defaultLink = "https://addon-manager.dontwanttos.top/";

async function getLink() {
  return (await browser.storage.sync.get("addonManagerLink")).addonManagerLink;
}

function setLinkInputValue(link) {
  document.querySelector("[name='addon-manager-link']").value = (link || defaultLink);
}

function setAddonManagerLink(link) {
  document.querySelector("form").classList.remove("unsaved");
  browser.storage.sync.set({
    addonManagerLink: link,
  });
}

function handleSubmit(e) {
  e.preventDefault();
  setAddonManagerLink(e.target["addon-manager-link"].value);
}

function handleReset(e) {
  e.preventDefault();
  restoreSaved();
}

function restoreDefault(e) {
  e.preventDefault();
  setAddonManagerLink(defaultLink);
  setLinkInputValue(defaultLink);
}

function updateUnsavedState() {
  const form = document.querySelector("form");
  getLink().then(savedLink => (
    form.classList.toggle("unsaved",
      (document.querySelector("input").value !== savedLink)
    )
  ));
}

function restoreSaved() {
  getLink().then(setLinkInputValue);
  document.querySelector("form").classList.remove("unsaved");
}

function setupForm() {
  restoreSaved();
  document.querySelector("form").addEventListener("submit", handleSubmit);
  document.querySelector("form").addEventListener("reset", handleReset);
  document.querySelector("#restore").addEventListener("click", restoreDefault);
  document.querySelector("input").addEventListener("input", updateUnsavedState);
}

document.addEventListener("DOMContentLoaded", setupForm);
