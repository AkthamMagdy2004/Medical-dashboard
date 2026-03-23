import { initLayout } from "./layout.js";
initLayout();

document.addEventListener("DOMContentLoaded", function () {
  const today = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  document.getElementById("todayDate").textContent = today.toLocaleDateString(
    "en-US",
    options,
  );

  const calendarEl = document.getElementById("calendar");
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "timeGridDay",
    initialDate: "2021-02-17",
    headerToolbar: false,
    height: "auto",
    contentHeight: "auto",
    slotDuration: "01:00:00",
    slotLabelInterval: "01:00:00",
    slotLabelFormat: {
      meridiem: "short",
      hour: "numeric",
      minute: "2-digit",
    },
    slotMinTime: "01:00:00",
    slotMaxTime: "21:00:00",
    allDaySlot: false,
    nowIndicator: true,
    events: [
      {
        title: "Consultation",
        start: "2021-02-17T10:00:00",
        end: "2021-02-17T11:00:00",
        backgroundColor: "#5541D7",
        borderColor: "#5541D7",
      },
      {
        title: "Medical Test",
        start: "2021-02-17T14:00:00",
        end: "2021-02-17T15:00:00",
        backgroundColor: "#5541D7",
        borderColor: "#5541D7",
      },
      {
        title: "Checkup",
        start: "2021-02-17T16:00:00",
        end: "2021-02-17T17:00:00",
        backgroundColor: "#5541D7",
        borderColor: "#5541D7",
      },
    ],
    eventClick: function (info) {
      alert("Event: " + info.event.title);
    },
  });
  calendar.render();

  window.scheduleCalendar = calendar;

  const selectedAppointment = JSON.parse(
    localStorage.getItem("selectedAppointment"),
  );
  const doctorDetails = document.querySelector(".doctor-details");
  const doctorName = doctorDetails.children[0];
  const doctorSpec = doctorDetails.children[1];
  const avatar = document.querySelector(".doctor-avatar-large");

  doctorName.textContent = selectedAppointment.doctorName;
  doctorSpec.textContent = selectedAppointment.specialty;
  avatar.textContent = selectedAppointment.avatar;

  document
    .querySelector(".date-dropdown")
    .addEventListener("click", function () {
      alert("Date picker would open here");
    });

  const navArrows = document.querySelectorAll(".nav-arrow");
  navArrows[0].addEventListener("click", function () {
    calendar.prev();
  });
  navArrows[1].addEventListener("click", function () {
    calendar.next();
  });

  document.querySelector(".view-mode").addEventListener("click", function () {
    alert("View options: Day, Week, Month");
  });

  document.querySelectorAll(".menu-dots").forEach((btn) => {
    btn.addEventListener("click", function () {
      alert("Show menu options");
    });
  });
});
