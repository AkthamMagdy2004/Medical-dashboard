import { initLayout } from "./layout.js";
initLayout();

document.addEventListener("DOMContentLoaded", function () {
  const allTestsData = [
    {
      id: 1,
      date: "Dec 14, 2024",
      dateObj: new Date(2024, 11, 14),
      time: "01:00 - 02:00 PM",
      doctorName: "Dr. Johnny Hutaborart",
      specialty: "Cardiology",
      testType: "Electrocardiogram Test",
      avatar: "JH",
      active: false,
    },
    {
      id: 2,
      date: "Jan 14, 2025",
      dateObj: new Date(2025, 0, 14),
      time: "01:00 - 02:00 PM",
      doctorName: "Dr. Johnny Hutaborart",
      specialty: "Cardiology",
      testType: "Electrocardiogram Test",
      avatar: "JH",
      active: false,
    },
    {
      id: 3,
      date: "Jan 16, 2025",
      dateObj: new Date(2025, 0, 16),
      time: "01:00 - 02:00 PM",
      doctorName: "Dr. Sarah Simatupang",
      specialty: "Urinology",
      testType: "Electrocardiogram Test",
      avatar: "SS",
      active: true,
    },
    {
      id: 4,
      date: "Jan 17, 2025",
      dateObj: new Date(2025, 0, 17),
      time: "01:00 - 02:00 PM",
      doctorName: "Dr. Sarah Simatupang",
      specialty: "Urinology",
      testType: "Electrocardiogram Test",
      avatar: "SS",
      active: false,
    },
    {
      id: 5,
      date: "Jan 19, 2025",
      dateObj: new Date(2025, 0, 19),
      time: "01:00 - 02:00 PM",
      doctorName: "Dr. Sarah Simatupang",
      specialty: "Urinology",
      testType: "Electrocardiogram Test",
      avatar: "SS",
      active: false,
    },
    {
      id: 6,
      date: "Feb 10, 2025",
      dateObj: new Date(2025, 1, 10),
      time: "01:00 - 02:00 PM",
      doctorName: "Dr. Michael Chen",
      specialty: "Cardiology",
      testType: "Electrocardiogram Test",
      avatar: "MC",
      active: false,
    },
    {
      id: 7,
      date: "Feb 15, 2025",
      dateObj: new Date(2025, 1, 15),
      time: "01:00 - 02:00 PM",
      doctorName: "Dr. Emily Brown",
      specialty: "Oncology",
      testType: "Electrocardiogram Test",
      avatar: "EB",
      active: false,
    },
  ];

  let currentDate = new Date();
  let currentMonthFilter = null;
  let showAllTests = false;
  let searchQuery = "";

  function getMonthYearString(date) {
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  }

  function updateMonthDisplay() {
    const monthText = document.getElementById("monthText");
    if (showAllTests) {
      monthText.textContent = "All Tests";
    } else {
      monthText.textContent = getMonthYearString(currentDate);
    }
  }

  function filterTestsByMonth(date) {
    return allTestsData.filter(
      (test) =>
        test.dateObj.getMonth() === date.getMonth() &&
        test.dateObj.getFullYear() === date.getFullYear(),
    );
  }

  function getTestsToDisplay() {
    let tests = showAllTests ? allTestsData : filterTestsByMonth(currentDate);

    if (searchQuery) {
      tests = tests.filter((test) => {
        const query = searchQuery.toLowerCase();
        return (
          test.doctorName.toLowerCase().includes(query) ||
          test.specialty.toLowerCase().includes(query) ||
          test.testType.toLowerCase().includes(query)
        );
      });
    }

    return tests;
  }

  function groupByDate(tests) {
    const grouped = {};
    tests.forEach((test) => {
      if (!grouped[test.date]) {
        grouped[test.date] = [];
      }
      grouped[test.date].push(test);
    });
    return grouped;
  }

  function renderTests() {
    const testsList = document.getElementById("testsList");
    testsList.innerHTML = "";

    const tests = getTestsToDisplay();
    const grouped = groupByDate(tests);

    Object.keys(grouped).forEach((dateKey) => {
      const dateGroup = document.createElement("div");
      dateGroup.className = "test-date-group";
      const dateLabel = document.createElement("div");
      dateLabel.className = "test-date-label";
      dateLabel.textContent = dateKey;
      dateGroup.appendChild(dateLabel);

      const dateList = document.createElement("div");
      dateList.className = "tests-list";

      grouped[dateKey].forEach((test) => {
        const testEl = document.createElement("div");
        testEl.className = `test-item ${test.active ? "active" : ""}`;

        testEl.innerHTML = `
                            <div class="test-doctor-section">
                                <div class="doctor-avatar">${test.avatar}</div>
                                <div class="test-doctor-info">
                                    <div class="test-datetime">⏱️ ${test.time}</div>
                                    <div class="doctor-name">${test.doctorName}</div>
                                    <div class="doctor-specialty">${test.specialty}</div>
                                </div>
                            </div>

                            <div class="test-content">
                                <div class="test-info">
                                    <i class="fas fa-file"></i>
                                    <span>${test.testType}</span>
                                </div>
                                <button class="view-details-btn">View Details</button>
                            </div>
                        `;

        testEl.addEventListener("click", function () {
          document.querySelectorAll(".test-item").forEach((item) => {
            item.classList.remove("active");
          });
          this.classList.add("active");
        });

        testEl
          .querySelector(".view-details-btn")
          .addEventListener("click", function (e) {
            e.stopPropagation();
            localStorage.setItem(
              "selectedAppointment",
              JSON.stringify(appointment),
            );
            window.location.href = "#";
          });

        dateList.appendChild(testEl);
      });

      dateGroup.appendChild(dateList);
      testsList.appendChild(dateGroup);
    });

    if (tests.length === 0) {
      testsList.innerHTML =
        '<p style="text-align: center; color: #999; padding: 40px 20px;">No tests found</p>';
    }
  }

  document.getElementById("prevMonth").addEventListener("click", function (e) {
    e.preventDefault();
    showAllTests = false;
    currentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1,
    );
    updateMonthDisplay();
    renderTests();
  });

  document.getElementById("nextMonth").addEventListener("click", function (e) {
    e.preventDefault();
    showAllTests = false;
    currentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1,
    );
    updateMonthDisplay();
    renderTests();
  });

  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", function () {
    searchQuery = this.value;
    renderTests();
  });

  document.querySelector(".tests-link").addEventListener("click", function (e) {
    e.preventDefault();
    showAllTests = true;
    searchQuery = "";
    searchInput.value = "";
    updateMonthDisplay();
    renderTests();
  });

  updateMonthDisplay();
  renderTests();
});
