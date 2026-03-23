import { initLayout } from "./layout.js";
initLayout();

document.querySelector(".card-menu-btn").addEventListener("click", function () {
  alert("Show menu options");
});
const testResultItems = document.querySelectorAll(".test-result-item");
testResultItems.forEach((item) => {
  item.addEventListener("click", function () {
    testResultItems.forEach((i) => i.classList.remove("active"));
    this.classList.add("active");
  });
});

const viewDetailsButtons = document.querySelectorAll(".view-details");
viewDetailsButtons.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    sessionStorage.setItem("activeSidebarLink", "../test-results-page.html");
    window.location.href = "../test-results-page.html";
  });
});

document.querySelector(".see-all-link").addEventListener("click", function () {
  sessionStorage.setItem("activeSidebarLink", "../test-results-page.html");
  window.location.href = "../test-results-page.html";
});

document.querySelector(".see-more-btn").addEventListener("click", function () {
  sessionStorage.setItem("activeSidebarLink", "../appointments.html");
  window.location.href = "../appointments.html";
});
