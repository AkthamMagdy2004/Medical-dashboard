import { initLayout } from "./layout.js";
initLayout();

document.addEventListener("DOMContentLoaded", () => {
  const contacts = [
    {
      id: 1,
      name: "Devon Lane",
      role: "Allergist",
      initials: "DL",
      online: true,
      badge: 0,
    },
    {
      id: 2,
      name: "Wade Warren",
      role: "Therapist",
      initials: "WW",
      online: true,
      badge: 1,
    },
    {
      id: 3,
      name: "Darrell Steward",
      role: "Dentist",
      initials: "DS",
      online: true,
      badge: 0,
    },
    {
      id: 4,
      name: "Cody Fisher",
      role: "Family Doctor",
      initials: "CF",
      online: true,
      badge: 0,
    },
    {
      id: 5,
      name: "Annette Black",
      role: "Urologist",
      initials: "AB",
      online: false,
      badge: 0,
    },
    {
      id: 6,
      name: "Dianne Russell",
      role: "Therapist",
      initials: "DR",
      online: true,
      badge: 0,
    },
  ];

  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  const loremShort =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut";

  const initialMessages = {
    1: [
      { id: 1, dir: "in", text: lorem, time: "12:14", read: true },
      { id: 2, dir: "out", text: lorem, time: "12:14", read: true },
      { id: 3, dir: "in", text: lorem, time: "12:14", read: true },
      { id: 4, dir: "in", text: loremShort, time: "12:14", read: true },
    ],
    2: [
      {
        id: 1,
        dir: "in",
        text: "Hi! When is our next session?",
        time: "11:30",
        read: false,
      },
    ],
    3: [],
    4: [],
    5: [],
    6: [],
  };

  let activeContact = contacts[0];
  let conversations = JSON.parse(JSON.stringify(initialMessages));
  let msgIdCounter = 100;
  function avatarGrad(initials) {
    const hues = { D: 260, W: 200, C: 290, A: 160 };
    const h = hues[initials[0]] ?? 230;
    return `linear-gradient(135deg, hsl(${h},70%,80%), hsl(${h + 20},80%,70%))`;
  }

  function nowTime() {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  }

  function checkmarkSVG() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>`;
  }

  function renderContacts(list) {
    const el = document.getElementById("contactsList");
    el.innerHTML = list
      .map(
        (c) => `
      <div class="contact-item ${c.id === activeContact.id ? "active" : ""}" data-id="${c.id}">
        <div class="avatar" style="background:${avatarGrad(c.initials)}">
          ${c.initials}
          ${c.online ? '<span class="status-dot"></span>' : ""}
        </div>
        <div class="contact-info">
          <div class="contact-name">${c.name}</div>
          <div class="contact-role">${c.role}</div>
        </div>
        ${c.badge ? `<span class="badge">${c.badge}</span>` : ""}
      </div>`,
      )
      .join("");
    el.querySelectorAll(".contact-item").forEach((item) => {
      item.addEventListener("click", () =>
        selectContact(Number(item.dataset.id)),
      );
    });
  }

  function renderMessages() {
    const area = document.getElementById("messagesArea");
    const msgs = conversations[activeContact.id] ?? [];

    area.innerHTML =
      `<div class="date-sep">Today</div>` +
      msgs
        .map(
          (m) => `
        <div class="msg-row ${m.dir}">
          ${m.dir === "in" ? `<div class="msg-avatar"></div>` : ""}
          <div class="bubble ${m.dir}">
            ${m.text}
            <div class="bubble-meta">
              <span>${m.time}</span>
              ${checkmarkSVG()}
            </div>
          </div>
          ${
            m.dir === "out"
              ? `<div class="msg-avatar" style="background:linear-gradient(135deg,#a89af9,#7c6ef5)"></div>`
              : ""
          }
        </div>`,
        )
        .join("");

    area.scrollTop = area.scrollHeight;
  }

  function selectContact(id) {
    activeContact = contacts.find((c) => c.id === id);
    activeContact.badge = 0;

    const headerAvatar = document.getElementById("headerAvatar");
    headerAvatar.style.background = avatarGrad(activeContact.initials);
    headerAvatar.innerHTML =
      activeContact.initials +
      (activeContact.online ? '<span class="status-dot"></span>' : "");

    document.getElementById("headerName").textContent = activeContact.name;

    renderContacts(contacts);
    renderMessages();

    if (window.innerWidth <= 768) {
      document.getElementById("chatSidebar").classList.add("hidden");
    }
  }

  function sendMessage() {
    const input = document.getElementById("msgInput");
    const text = input.value.trim();
    if (!text) return;

    conversations[activeContact.id] ??= [];
    conversations[activeContact.id].push({
      id: ++msgIdCounter,
      dir: "out",
      text,
      time: nowTime(),
      read: false,
    });

    input.value = "";
    input.style.height = "auto";
    renderMessages();
    setTimeout(
      () => {
        const replies = [
          "Thank you for the information!",
          "I understand. We can discuss further at our next appointment.",
          "Please make sure to take your medication on time.",
          "Got it. Let me check your records and get back to you.",
          "That sounds good. See you soon!",
        ];
        conversations[activeContact.id].push({
          id: ++msgIdCounter,
          dir: "in",
          text: replies[Math.floor(Math.random() * replies.length)],
          time: nowTime(),
          read: true,
        });
        renderMessages();
      },
      1000 + Math.random() * 800,
    );
  }

  function filterContacts(q) {
    const lc = q.toLowerCase();
    renderContacts(
      contacts.filter(
        (c) =>
          c.name.toLowerCase().includes(lc) ||
          c.role.toLowerCase().includes(lc),
      ),
    );
  }

  document
    .getElementById("searchInput")
    .addEventListener("input", (e) => filterContacts(e.target.value));

  document.getElementById("sendBtn").addEventListener("click", sendMessage);

  const msgInput = document.getElementById("msgInput");
  msgInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  msgInput.addEventListener("input", () => {
    msgInput.style.height = "auto";
    msgInput.style.height = Math.min(msgInput.scrollHeight, 120) + "px";
  });
  document.getElementById("mobileBackBtn")?.addEventListener("click", () => {
    document.getElementById("chatSidebar").classList.remove("hidden");
  });
  renderContacts(contacts);
  selectContact(1);
});
