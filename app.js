const STORAGE_KEY = "projects";

const testProjects = [
  { id: 1, title: "Интернет-магазин", description: "Пет-проект на React" },
  { id: 2, title: "Telegram-бот",     description: "Бот для напоминаний" },
  { id: 3, title: "Портфолио",        description: "Сайт-визитка на HTML/CSS" },
  { id: 4, title: "API для задач",    description: "REST на Node.js + Express" },
  { id: 5, title: "Игра «Змейка»",    description: "Canvas + JavaScript" }
];

let projects = load();

const listEl   = document.getElementById("list");
const emptyEl  = document.getElementById("empty");
const searchEl = document.getElementById("search");
const formEl   = document.getElementById("form");
const titleEl  = document.getElementById("title");
const descEl   = document.getElementById("description");

function isValidProject(p) {
  return (
    p &&
    typeof p === "object" &&
    typeof p.title === "string" &&
    p.title.trim() !== "" &&
    typeof p.description === "string" &&
    p.description.trim() !== ""
  );
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return testProjects;

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return testProjects;

    const clean = parsed.filter(isValidProject);
    return clean.length > 0 ? clean : testProjects;
  } catch {
    return testProjects;
  }
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

function render(items) {
  listEl.innerHTML = "";

  if (items.length === 0) {
    emptyEl.hidden = false;
    return;
  }
  emptyEl.hidden = true;

  items.forEach(p => {
    const li = document.createElement("li");
    li.className = "card";
    li.innerHTML = `
      <div class="card__title"></div>
      <div class="card__desc"></div>
    `;
    li.querySelector(".card__title").textContent = p.title;
    li.querySelector(".card__desc").textContent = p.description;
    listEl.appendChild(li);
  });
}

function filter(query) {
  const q = query.trim().toLowerCase();
  if (!q) return projects;
  return projects.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q)
  );
}

searchEl.addEventListener("input", () => {
  render(filter(searchEl.value));
});

formEl.addEventListener("submit", e => {
  e.preventDefault();

  const title = titleEl.value.trim();
  const description = descEl.value.trim();
  if (!title || !description) return;

  const newProject = {
    id: Date.now(),
    title,
    description
  };

  projects.push(newProject);
  save();

  titleEl.value = "";
  descEl.value = "";
  searchEl.value = "";

  render(projects);
});

render(projects);