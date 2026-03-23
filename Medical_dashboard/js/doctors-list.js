import { initLayout } from "./layout.js";
initLayout();

const doctors = [
  { id: 1, name: "Dr. Sarah Chen", specialty: "Dentist", appointments: 72 },
  {
    id: 2,
    name: "Dr. Marcus Lee",
    specialty: "Cardiologist",
    appointments: 58,
  },
  {
    id: 3,
    name: "Dr. Priya Patel",
    specialty: "Neurologist",
    appointments: 85,
  },
  {
    id: 4,
    name: "Dr. James Okafor",
    specialty: "Pediatrician",
    appointments: 43,
  },
  { id: 5, name: "Dr. Ana Ruiz", specialty: "Orthopedic", appointments: 67 },
  { id: 6, name: "Dr. Tom Nguyen", specialty: "Dentist", appointments: 30 },
  {
    id: 7,
    name: "Dr. Laila Hassan",
    specialty: "Dermatologist",
    appointments: 91,
  },
  {
    id: 8,
    name: "Dr. Kevin Brooks",
    specialty: "Cardiologist",
    appointments: 55,
  },
  { id: 9, name: "Dr. Nina Kovač", specialty: "Neurologist", appointments: 48 },
  { id: 10, name: "Dr. Samuel Park", specialty: "Dentist", appointments: 76 },
  {
    id: 11,
    name: "Dr. Mia Johansson",
    specialty: "Pediatrician",
    appointments: 62,
  },
  { id: 12, name: "Dr. Raj Sharma", specialty: "Orthopedic", appointments: 39 },
  {
    id: 13,
    name: "Dr. Chloe Martin",
    specialty: "Dermatologist",
    appointments: 80,
  },
  {
    id: 14,
    name: "Dr. Ethan Wells",
    specialty: "Cardiologist",
    appointments: 22,
  },
];

let activeSpecialty = "All";
let minAppt = 0;
let pendingSpecialty = "All";
let pendingMinAppt = 0;

const searchInput = document.getElementById("searchInput");
const filterBtn = document.getElementById("filterBtn");
const filterPanel = document.getElementById("filterPanel");
const apptRange = document.getElementById("apptRange");
const rangeVal = document.getElementById("rangeVal");
const resetBtn = document.getElementById("resetFilters");
const applyBtn = document.getElementById("applyFilters");
const doctorGrid = document.getElementById("doctorGrid");
const resultsInfo = document.getElementById("resultsInfo");

function initials(name) {
  return name
    .replace("Dr. ", "")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
}

const avatarColors = [
  ["#EEF2FF", "#6C63FF"],
  ["#ECFDF5", "#059669"],
  ["#FEF3C7", "#D97706"],
  ["#FFE4E6", "#E11D48"],
  ["#E0F2FE", "#0284C7"],
  ["#F5F3FF", "#7C3AED"],
];

function render() {
  const query = searchInput.value.trim().toLowerCase();

  const filtered = doctors.filter((d) => {
    const matchSearch =
      d.name.toLowerCase().includes(query) ||
      d.specialty.toLowerCase().includes(query);
    const matchSpec =
      activeSpecialty === "All" || d.specialty === activeSpecialty;
    const matchAppt = d.appointments >= minAppt;
    return matchSearch && matchSpec && matchAppt;
  });

  doctorGrid.innerHTML = "";

  if (filtered.length === 0) {
    doctorGrid.innerHTML = `
        <div class="empty">
          <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="#9CA3AF" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"/>
          </svg>
          <p>No doctors found</p>
          <span>Try adjusting your search or filters</span>
        </div>`;
    resultsInfo.innerHTML = "";
    return;
  }

  resultsInfo.innerHTML = `Showing <strong>${filtered.length}</strong> of ${doctors.length} doctors`;

  filtered.forEach((d, i) => {
    const colors = avatarColors[d.id % avatarColors.length];
    const card = document.createElement("div");
    card.className = "doctor-card";
    card.style.animationDelay = `${i * 30}ms`;
    card.innerHTML = `
        <div class="avatar" style="background:${colors[0]};color:${colors[1]}">${initials(d.name)}</div>
        <div class="doctor-info">
          <div class="doctor-name">${d.name}</div>
          <div class="doctor-spec">${d.specialty}</div>
        </div>
        <div class="appt-info">
          <div class="appt-label">Overall Booked Appointments</div>
          <div class="progress-bar">
            <div class="progress-fill" style="width:${d.appointments}%"></div>
          </div>
        </div>
        <button class="appt-btn">Make an Appointment</button>
      `;
    doctorGrid.appendChild(card);
  });
  function getSiblings(elem) {
    const allChildren = elem.parentElement.children;

    const siblings = Array.from(allChildren).filter(
      (sibling) => sibling !== elem,
    );

    return siblings;
  }
  document.addEventListener("DOMContentLoaded", () => {
    const apptBtn = document.querySelectorAll(".appt-btn");
    apptBtn.forEach((btn) =>
      btn.addEventListener("click", (e) => {
        const avatar = getSiblings(e.target)[0].textContent;
        const infoName = getSiblings(e.target)[1].children[0].textContent;
        const infoSpec = getSiblings(e.target)[1].children[1].textContent;
        console.log(infoName, infoSpec);
        localStorage.setItem("avatar", avatar);
        localStorage.setItem("info-name", infoName);
        localStorage.setItem("info-spec", infoSpec);
        makeAppointment();
      }),
    );
  });
}
function makeAppointment() {
  window.location.href = "../doctor-details.html";
}
searchInput.addEventListener("input", render);

filterBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  filterPanel.classList.toggle("open");
  filterBtn.classList.toggle("active", filterPanel.classList.contains("open"));
  pendingSpecialty = activeSpecialty;
  pendingMinAppt = minAppt;
  apptRange.value = minAppt;
  rangeVal.textContent = minAppt + "%";
  document.querySelectorAll(".filter-chip").forEach((c) => {
    c.classList.toggle("selected", c.dataset.value === pendingSpecialty);
  });
});

document.addEventListener("click", (e) => {
  if (!filterPanel.contains(e.target) && e.target !== filterBtn) {
    filterPanel.classList.remove("open");
    filterBtn.classList.remove("active");
  }
});
document.querySelectorAll(".filter-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    pendingSpecialty = chip.dataset.value;
    document
      .querySelectorAll(".filter-chip")
      .forEach((c) => c.classList.remove("selected"));
    chip.classList.add("selected");
  });
});

apptRange.addEventListener("input", () => {
  pendingMinAppt = parseInt(apptRange.value);
  rangeVal.textContent = pendingMinAppt + "%";
});

applyBtn.addEventListener("click", () => {
  activeSpecialty = pendingSpecialty;
  minAppt = pendingMinAppt;
  filterPanel.classList.remove("open");
  filterBtn.classList.remove("active");
  render();
});

resetBtn.addEventListener("click", () => {
  pendingSpecialty = "All";
  pendingMinAppt = 0;
  apptRange.value = 0;
  rangeVal.textContent = "0%";
  document.querySelectorAll(".filter-chip").forEach((c) => {
    c.classList.toggle("selected", c.dataset.value === "All");
  });
  activeSpecialty = "All";
  minAppt = 0;
  filterPanel.classList.remove("open");
  filterBtn.classList.remove("active");
  render();
});

render();
