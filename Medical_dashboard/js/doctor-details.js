import { initLayout } from "./layout.js";
initLayout();
const avatar = document.querySelector(".avatar");
const docName = document.querySelector(".doc-name");
const docSpec = document.querySelector(".specialty");
const docNameModal = document.querySelector(".doc-name-modal");
const docNameModalConfirmed = document.querySelector(".success-state p strong");
avatar.textContent = localStorage.getItem("avatar");
docName.textContent = localStorage.getItem("info-name");
docSpec.textContent = localStorage.getItem("info-spec");
docNameModal.textContent = localStorage.getItem("info-name") + " — Schedule";
docNameModalConfirmed.textContent = localStorage.getItem("info-name");

function openModal(id) {
  document.getElementById(id).classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeModal(id) {
  document.getElementById(id).classList.remove("open");
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-close]").forEach((btn) => {
  btn.addEventListener("click", () => closeModal(btn.dataset.close));
});
document.querySelectorAll(".modal-overlay").forEach((overlay) => {
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal(overlay.id);
  });
});

function showToast(msg) {
  const t = document.getElementById("toast");
  document.getElementById("toastMsg").textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3000);
}
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const takenSlots = [1, 3, 6];
const allSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "02:00",
  "02:30",
  "03:00",
  "03:30",
  "04:00",
  "04:30",
];

let calYear,
  calMonth,
  selectedDay = null,
  selectedTime = null;

function initCal() {
  const now = new Date();
  calYear = now.getFullYear();
  calMonth = now.getMonth();
  renderCal();
}

function renderCal() {
  document.getElementById("calMonthLabel").textContent =
    `${MONTHS[calMonth]} ${calYear}`;

  const grid = document.getElementById("calGrid");
  grid.innerHTML = "";

  DAYS.forEach((d) => {
    const el = document.createElement("div");
    el.className = "cal-day-name";
    el.textContent = d;
    grid.appendChild(el);
  });

  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const today = new Date();

  for (let i = 0; i < firstDay; i++) {
    const el = document.createElement("div");
    el.className = "cal-day empty";
    grid.appendChild(el);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const el = document.createElement("div");
    el.className = "cal-day";
    el.textContent = d;

    const isPast =
      new Date(calYear, calMonth, d) <
      new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const isToday =
      d === today.getDate() &&
      calMonth === today.getMonth() &&
      calYear === today.getFullYear();
    const isSunday = new Date(calYear, calMonth, d).getDay() === 0;

    if (isPast || isSunday) {
      el.classList.add("disabled");
    } else {
      if (isToday) el.classList.add("today");
      if (selectedDay === d) el.classList.add("selected");
      el.addEventListener("click", () => {
        selectedDay = d;
        renderCal();
        renderSlots();
      });
    }
    grid.appendChild(el);
  }
}

function renderSlots() {
  const container = document.getElementById("timeSlots");
  container.innerHTML = "";
  allSlots.forEach((s, i) => {
    const el = document.createElement("div");
    el.className = "time-slot";
    el.textContent = s;
    if (takenSlots.includes(i)) {
      el.classList.add("taken");
    } else {
      if (selectedTime === s) el.classList.add("selected");
      el.addEventListener("click", () => {
        selectedTime = s;
        renderSlots();
      });
    }
    container.appendChild(el);
  });
}

document.getElementById("prevMonth").addEventListener("click", () => {
  calMonth--;
  if (calMonth < 0) {
    calMonth = 11;
    calYear--;
  }
  selectedDay = null;
  renderCal();
  renderSlots();
});
document.getElementById("nextMonth").addEventListener("click", () => {
  calMonth++;
  if (calMonth > 11) {
    calMonth = 0;
    calYear++;
  }
  selectedDay = null;
  renderCal();
  renderSlots();
});

document.getElementById("bookFromSchedule").addEventListener("click", () => {
  if (!selectedDay || !selectedTime) {
    showToast("Please select a date and time slot first.");
    return;
  }
  closeModal("scheduleModal");
  const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`;
  document.getElementById("apptDate").value = dateStr;
  const sel = document.getElementById("apptTime");
  const h = parseInt(selectedTime.split(":")[0]);
  const m = selectedTime.split(":")[1];
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
  const label = `${String(h12).padStart(2, "0")}:${m} ${suffix}`;
  for (let opt of sel.options) {
    if (opt.text === label) {
      sel.value = opt.value;
      break;
    }
  }
  openModal("apptModal");
});

document.getElementById("submitAppt").addEventListener("click", () => {
  const first = document.getElementById("firstName").value.trim();
  const last = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const date = document.getElementById("apptDate").value;
  const time = document.getElementById("apptTime").value;
  const treat = document.getElementById("treatment").value;

  if (!first || !last || !email || !date || !time || !treat) {
    showToast("Please fill in all required fields.");
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast("Please enter a valid email address.");
    return;
  }

  document.getElementById("apptForm").style.display = "none";
  document.getElementById("successState").classList.add("show");
});

document.querySelectorAll('[data-close="apptModal"]').forEach((btn) => {
  btn.addEventListener("click", () => {
    setTimeout(() => {
      document.getElementById("apptForm").style.display = "";
      document.getElementById("successState").classList.remove("show");
      document.getElementById("firstName").value = "";
      document.getElementById("lastName").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("apptDate").value = "";
      document.getElementById("apptTime").value = "";
      document.getElementById("treatment").value = "";
      document.getElementById("notes").value = "";
    }, 300);
  });
});

document.getElementById("checkScheduleBtn").addEventListener("click", () => {
  initCal();
  renderSlots();
  openModal("scheduleModal");
});

document.getElementById("makeApptBtn").addEventListener("click", () => {
  openModal("apptModal");
});

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
document.getElementById("apptDate").min = tomorrow.toISOString().split("T")[0];
