const urlParams = new URLSearchParams(window.location.search);
const q = urlParams.get('q')
window.addEventListener("load", () => { search(q) })
