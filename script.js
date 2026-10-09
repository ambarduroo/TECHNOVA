const articles = [
  {
    id: 1,
    category: "Celulares",
    title: "Apple presenta novedades para sus celulares",
    description: "Conocé las tendencias, funciones y novedades que están transformando los smartphones.",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80",
    alt: "Teléfono inteligente moderno",
    date: "Novedades móviles",
    details: "Los celulares siguen incorporando nuevas funciones, mejores cámaras y herramientas inteligentes. En esta sección de TECHNOVA reunimos información para conocer las tendencias del mundo móvil."
  },
  {
    id: 2,
    category: "IA",
    title: "Herramientas de IA que tenés que conocer",
    description: "Una mirada a las aplicaciones de inteligencia artificial que ayudan a estudiar y crear.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    alt: "Inteligencia artificial y tecnología",
    date: "Mundo IA",
    details: "La inteligencia artificial permite generar ideas, analizar información y automatizar tareas. También es importante revisar sus resultados y usar estas herramientas de forma responsable."
  },
  {
    id: 3,
    category: "Videojuegos",
    title: "Las novedades del mundo gamer",
    description: "Consolas, juegos y tendencias para quienes disfrutan del entretenimiento digital.",
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=800&q=80",
    alt: "Equipo de videojuegos",
    date: "Gaming",
    details: "El mundo gamer continúa evolucionando con nuevas experiencias, gráficos y formas de jugar. TECHNOVA reúne información sobre tendencias y novedades del entretenimiento digital."
  },
  {
    id: 4,
    category: "Tecnología",
    title: "Las mejores herramientas digitales para estudiar",
    description: "Aplicaciones y dispositivos que pueden ayudar a organizar las tareas y el tiempo.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    alt: "Computadora portátil sobre un escritorio",
    date: "Vida digital",
    details: "Las herramientas digitales pueden ayudar a organizar apuntes, crear calendarios y trabajar en proyectos. La mejor opción depende de las necesidades y los hábitos de cada persona."
  },
  {
    id: 5,
    category: "Celulares",
    title: "Qué tener en cuenta al elegir un celular",
    description: "Batería, cámara, almacenamiento y otras características importantes antes de elegir.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    alt: "Smartphone visto de cerca",
    date: "Guía de compra",
    details: "Antes de elegir un celular, conviene comparar la duración de la batería, el almacenamiento, la calidad de la cámara, el soporte de actualizaciones y el precio."
  },
  {
    id: 6,
    category: "Videojuegos",
    title: "Cómo evoluciona la tecnología gamer",
    description: "Accesorios, gráficos y equipos que ofrecen nuevas experiencias de juego.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    alt: "Espacio de videojuegos con iluminación de colores",
    date: "Tecnología gamer",
    details: "Los equipos y accesorios para videojuegos cambian constantemente. La comodidad, el rendimiento y la accesibilidad son factores importantes al elegir un dispositivo."
  }
];

const newsGrid = document.getElementById("newsGrid");
const newsCount = document.getElementById("newsCount");
const emptyMessage = document.getElementById("emptyMessage");
const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");
const filterButtons = document.querySelectorAll(".filter-button");

const articleDialog = document.getElementById("articleDialog");
const dialogClose = document.getElementById("dialogClose");

let activeCategory = "Todas";
let searchTerm = "";

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    return entities[character];
  });
}

function renderNews() {
  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      activeCategory === "Todas" ||
      article.category === activeCategory;

    const searchableText = [
      article.title,
      article.description,
      article.category
    ].join(" ").toLowerCase();

    const matchesSearch = searchableText.includes(searchTerm);

    return matchesCategory && matchesSearch;
  });

  newsGrid.innerHTML = filteredArticles.map((article) => `
    <article class="news-card">
      <img
        src="${escapeHTML(article.image)}"
        alt="${escapeHTML(article.alt)}"
        loading="lazy">

      <div class="news-card-content">
        <span class="category-pill">
          ${escapeHTML(article.category.toUpperCase())}
        </span>

        <h3>${escapeHTML(article.title)}</h3>
        <p>${escapeHTML(article.description)}</p>

        <div class="card-bottom">
          <span>${escapeHTML(article.date)}</span>
          <button
            class="card-read"
            data-article-id="${article.id}"
            type="button">
            Leer más →
          </button>
        </div>
      </div>
    </article>
  `).join("");

  newsCount.textContent =
    `${filteredArticles.length} ${filteredArticles.length === 1 ? "noticia" : "noticias"}`;

  emptyMessage.hidden = filteredArticles.length !== 0;
}

function openArticle(article) {
  if (!article) return;

  document.getElementById("dialogCategory").textContent =
    article.category.toUpperCase();

  document.getElementById("dialogTitle").textContent =
    article.title;

  document.getElementById("dialogImage").src =
    article.image;

  document.getElementById("dialogImage").alt =
    article.alt;

  document.getElementById("dialogDescription").textContent =
    article.details || article.description;

  if (typeof articleDialog.showModal === "function") {
    articleDialog.showModal();
  }
}

newsGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-article-id]");
  if (!button) return;

  const article = articles.find(
    (item) => item.id === Number(button.dataset.articleId)
  );

  openArticle(article);
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.filter;

    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    renderNews();
  });
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  searchTerm = searchInput.value.trim().toLowerCase();
  renderNews();
  document.getElementById("noticias").scrollIntoView({
    behavior: "smooth"
  });
});

searchInput.addEventListener("input", () => {
  searchTerm = searchInput.value.trim().toLowerCase();
  renderNews();
});

document.getElementById("featuredReadMore").addEventListener("click", () => {
  openArticle({
    category: "Inteligencia artificial",
    title: "La IA está cambiando el futuro de la tecnología",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=85",
    alt: "Imagen ilustrativa de inteligencia artificial",
    description: "La inteligencia artificial está transformando la forma en que vivimos, estudiamos y trabajamos.",
    details: "La inteligencia artificial permite analizar información, reconocer patrones y crear nuevas herramientas digitales. Su uso abre oportunidades en la educación, la ciencia y el desarrollo de software, pero también requiere pensamiento crítico y un uso responsable."
  });
});

dialogClose.addEventListener("click", () => {
  articleDialog.close();
});

articleDialog.addEventListener("click", (event) => {
  if (event.target === articleDialog) {
    articleDialog.close();
  }
});

// Menú desplegable para pantallas pequeñas.
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Cerrar menú" : "Abrir menú"
  );
});

navigation.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (!link) return;

  if (link.dataset.category) {
    const category = link.dataset.category;
    activeCategory = category === "Tecnología" ? "Tecnología" : "IA";

    filterButtons.forEach((button) => {
      button.classList.toggle(
        "active",
        button.dataset.filter === activeCategory
      );
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.filter === activeCategory)
      );
    });

    renderNews();
  }

  navigation.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menú");
});

// El formulario muestra una confirmación visual.
// No envía datos a un servidor ni guarda suscripciones.
document.getElementById("newsletterForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const emailInput = document.getElementById("emailInput");
  const message = document.getElementById("newsletterMessage");

  if (!emailInput.checkValidity()) {
    emailInput.reportValidity();
    return;
  }

  message.textContent =
    "¡Gracias por tu interés! La suscripción es una demostración.";
  emailInput.value = "";
});

renderNews();

