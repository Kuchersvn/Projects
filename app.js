const testProjects = [
  { id: 1, title: "Интернет-магазин", description: "Пет-проект на React" },
  { id: 2, title: "Telegram-бот",     description: "Бот для напоминаний" },
  { id: 3, title: "Портфолио",        description: "Сайт-визитка на HTML/CSS" },
  { id: 4, title: "API для задач",    description: "REST на Node.js + Express" },
  { id: 5, title: "Игра «Змейка»",    description: "Canvas + JavaScript" }
];

let projects = testProjects;

const listEl = document.getElementById("list");

function render(items) {
  listEl.innerHTML = "";

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

render(projects);