import { initLayout } from "./layout.js";
initLayout();

document.addEventListener("DOMContentLoaded", function () {
  const allAppointmentsData = [
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
  let showAllAppointments = false;
  let searchQuery = "";

  function getMonthYearString(date) {
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  }

  function updateMonthDisplay() {
    const monthText = document.getElementById("monthText");
    if (showAllAppointments) {
      monthText.textContent = "All Appointments";
    } else {
      monthText.textContent = getMonthYearString(currentDate);
    }
  }

  function filterAppointmentsByMonth(date) {
    return allAppointmentsData.filter(
      (app) =>
        app.dateObj.getMonth() === date.getMonth() &&
        app.dateObj.getFullYear() === date.getFullYear(),
    );
  }

  function getAppointmentsToDisplay() {
    let appointments = showAllAppointments
      ? allAppointmentsData
      : filterAppointmentsByMonth(currentDate);

    if (searchQuery) {
      appointments = appointments.filter((app) => {
        const query = searchQuery.toLowerCase();
        return (
          app.doctorName.toLowerCase().includes(query) ||
          app.specialty.toLowerCase().includes(query) ||
          app.testType.toLowerCase().includes(query)
        );
      });
    }

    return appointments;
  }

  function groupByDate(appointments) {
    const grouped = {};
    appointments.forEach((app) => {
      if (!grouped[app.date]) {
        grouped[app.date] = [];
      }
      grouped[app.date].push(app);
    });
    return grouped;
  }

  function renderAppointments() {
    const appointmentsList = document.getElementById("appointmentsList");
    appointmentsList.innerHTML = "";

    const appointments = getAppointmentsToDisplay();
    const grouped = groupByDate(appointments);

    Object.keys(grouped).forEach((dateKey) => {
      const dateGroup = document.createElement("div");
      dateGroup.className = "appointment-date-group";
      const dateLabel = document.createElement("div");
      dateLabel.className = "appointment-date-label";
      dateLabel.textContent = dateKey;
      dateGroup.appendChild(dateLabel);

      const dateList = document.createElement("div");
      dateList.className = "appointments-list";

      grouped[dateKey].forEach((appointment) => {
        const appointmentEl = document.createElement("div");
        appointmentEl.className = `appointment-item ${appointment.active ? "active" : ""}`;

        appointmentEl.innerHTML = `
                            <div class="appointment-doctor-section">
                                <div class="doctor-avatar">${appointment.avatar}</div>
                                <div class="appointment-doctor-info">
                                    <div class="appointment-datetime">⏱️ ${appointment.time}</div>
                                    <div class="doctor-name">${appointment.doctorName}</div>
                                    <div class="doctor-specialty">${appointment.specialty}</div>
                                </div>
                            </div>

                            <div class="appointment-content">
                                <div class="test-info">
                                    <i class="fas fa-file"></i>
                                    <span>${appointment.testType}</span>
                                </div>
                                <button class="view-details-btn">View Details</button>
                            </div>
                        `;

        appointmentEl.addEventListener("click", function () {
          document.querySelectorAll(".appointment-item").forEach((item) => {
            item.classList.remove("active");
          });
          this.classList.add("active");
        });

        appointmentEl
          .querySelector(".view-details-btn")
          .addEventListener("click", function (e) {
            e.stopPropagation();
            localStorage.setItem(
              "selectedAppointment",
              JSON.stringify(appointment),
            );
            window.location.href = "schedule-page.html";
          });

        dateList.appendChild(appointmentEl);
      });

      dateGroup.appendChild(dateList);
      appointmentsList.appendChild(dateGroup);
    });

    if (appointments.length === 0) {
      appointmentsList.innerHTML =
        '<p style="text-align: center; color: #999; padding: 40px 20px;">No appointments found</p>';
    }
  }

  document.getElementById("prevMonth").addEventListener("click", function (e) {
    e.preventDefault();
    showAllAppointments = false;
    currentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1,
    );
    updateMonthDisplay();
    renderAppointments();
  });

  document.getElementById("nextMonth").addEventListener("click", function (e) {
    e.preventDefault();
    showAllAppointments = false;
    currentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1,
    );
    updateMonthDisplay();
    renderAppointments();
  });

  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", function () {
    searchQuery = this.value;
    renderAppointments();
  });

  document
    .querySelector(".appointments-link")
    .addEventListener("click", function (e) {
      e.preventDefault();
      showAllAppointments = true;
      searchQuery = "";
      searchInput.value = "";
      updateMonthDisplay();
      renderAppointments();
    });

  updateMonthDisplay();
  renderAppointments();
});
