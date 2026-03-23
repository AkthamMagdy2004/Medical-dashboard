export async function initLayout() {
  document.addEventListener("DOMContentLoaded", async () => {
    const p1 = loadComponent("header", "./components/navbar.html");
    const p2 = loadComponent("aside", "./components/sidebar.html");
    await Promise.all([p1, p2]);
    document.dispatchEvent(new Event("componentsLoaded"));
  });
}

async function loadComponent(selector, file) {
  const res = await fetch(file);
  const data = await res.text();
  const element = document.querySelector(selector);
  if (element) {
    element.innerHTML = data;
  }
}
