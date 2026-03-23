document.addEventListener("componentsLoaded", () => {
  const links = document.querySelectorAll(".sidebar-btn");
  const currentUrl = window.location.href;

  const isMainPage = Array.from(links).some((link) => link.href === currentUrl);

  if (isMainPage) {
    sessionStorage.setItem("activeSidebarLink", currentUrl);
  }

  const savedUrl = sessionStorage.getItem("activeSidebarLink");

  links.forEach((link) => {
    link.classList.remove("active");

    const isCurrentPage = link.href === currentUrl;
    const isSavedParent = link.href === savedUrl && !isCurrentPage;

    if (isCurrentPage || isSavedParent) {
      link.classList.add("active");
    }
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      sessionStorage.setItem("activeSidebarLink", link.href);
    });
  });
});
