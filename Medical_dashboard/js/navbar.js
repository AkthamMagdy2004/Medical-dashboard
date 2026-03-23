document.addEventListener("componentsLoaded", () => {
  const searchInput = document.querySelector(".search-box input");
  if (searchInput) {
    searchInput.addEventListener("focus", function () {
      this.parentElement.style.borderColor = "#5541D7";
    });
    searchInput.addEventListener("blur", function () {
      this.parentElement.style.borderColor = "#E1E1E1";
    });
  }

  searchInput.addEventListener("input", function () {
    const searchQuery = this.value.toLowerCase();
    const testResultItems = document.querySelectorAll(".test-result-item");
    let visibleCount = 0;

    testResultItems.forEach((item) => {
      const doctorName =
        item.querySelector(".doctor-name")?.textContent.toLowerCase() || "";
      const specialty =
        item.querySelector(".doctor-specialty")?.textContent.toLowerCase() ||
        "";
      const testType =
        item.querySelector(".test-type span")?.textContent.toLowerCase() || "";

      const matches =
        doctorName.includes(searchQuery) ||
        specialty.includes(searchQuery) ||
        testType.includes(searchQuery);

      if (searchQuery === "" || matches) {
        item.style.display = "";
        visibleCount++;
      } else {
        item.style.display = "none";
      }
    });

    const testContainer =
      document.querySelector(".test-result-item").parentElement;
    const noResultsMsg = testContainer.querySelector(".no-results-message");

    if (visibleCount === 0 && searchQuery !== "") {
      if (!noResultsMsg) {
        const msg = document.createElement("div");
        msg.className = "no-results-message";
        msg.textContent =
          'No test results found matching "' + searchQuery + '"';
        msg.style.padding = "20px";
        msg.style.textAlign = "center";
        msg.style.color = "#999";
        msg.style.fontSize = "14px";
        testContainer.appendChild(msg);
      }
    } else if (noResultsMsg) {
      noResultsMsg.remove();
    }
  });

  const notifyBtn = document.querySelector(".notification-btn");
  if (notifyBtn) {
    notifyBtn.addEventListener("click", function () {
      alert("You have 1 new notification");
    });
  }
});
