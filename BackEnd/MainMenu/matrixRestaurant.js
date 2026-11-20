var local;

// Funcion para filtrar restaurantes por categoria
function Filter() {
  const categoryButtons = document.querySelectorAll(".category-list button");
  const restaurants = document.querySelectorAll(".restaurant-card");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      // Mostrar u ocultar restaurantes segun la categoria seleccionada
      restaurants.forEach((rest) => {
        const category = rest.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          rest.style.display = "block";
        } else {
          rest.style.display = "none";
        }
      });
    });
  });
}

// Funcion para ver el menu de un restaurante
function menuView(buttonElement) {
  // Obtener el elemento padre (tarjeta del restaurante)
  const restaurantCard = buttonElement.closest(".restaurant-card");

  // Extraer datos del restaurante
  let idRestaurant = restaurantCard.id;
  let category = restaurantCard.getAttribute("data-category");
  let img = restaurantCard.querySelector("img").src;

  // Crear objeto con datos del restaurante
  const restaurantData = {
    name: idRestaurant,
    section: category,
    logo: img,
  };

  // Guardar datos en localStorage para usar en otras paginas
  localStorage.setItem("restaurantData", JSON.stringify(restaurantData));

  console.log(idRestaurant + "||" + category + "||" + img);

  // Navegar a la pagina del menu
  moveHtml("detallesPedido.html");
}

// Funcion para transferir datos (export)
export function transferData() { return local;}

// Funcion para cambiar de pagina
function moveHtml(tp) {
  window.location.href = tp;
  console.log("moviendose a " + tp);
}

// Funcion para configurar la busqueda de restaurantes
function setupSearch() {
  const inputBusqueda = document.getElementById("buscarRestaurante");
  const tarjetas = document.querySelectorAll(".restaurant-card");
  const mensaje = document.getElementById("mensaje-no-encontrado");

  // Salir si no existe el elemento de busqueda
  if (!inputBusqueda) return;

  inputBusqueda.addEventListener("input", () => {
    const texto = inputBusqueda.value.toLowerCase();
    let coincidencias = 0;

    // Filtrar restaurantes por texto de busqueda
    tarjetas.forEach((card) => {
      const nombre = card.querySelector("h3").textContent.toLowerCase();
      const descripcion = card.querySelector("p").textContent.toLowerCase();
      const categoria = card.getAttribute("data-category").toLowerCase();

      // Mostrar si coincide con nombre, descripcion o categoria
      if (
        nombre.includes(texto) ||
        descripcion.includes(texto) ||
        categoria.includes(texto)
      ) {
        card.style.display = "block";
        coincidencias++;
      } else {
        card.style.display = "none";
      }
    });

    // Mostrar mensaje si no hay resultados
    if (mensaje) {
      mensaje.style.display = coincidencias === 0 ? "block" : "none";
    }
  });
}

// Funcion para configurar menus desplegables
function setupDropdowns() {
  const menuItems = document.querySelectorAll(".action-item");

  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      const menu = item.querySelector(".dropdown-menu");
      if (menu) {
        // Alternar visibilidad del menu
        menu.style.display = menu.style.display === "block" ? "none" : "block";
      }
    });
  });

  // Cerrar menus al hacer clic fuera de ellos
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".action-item")) {
      document.querySelectorAll(".dropdown-menu").forEach((menu) => {
        menu.style.display = "none";
      });
    }
  });
}

// Inicializar funciones cuando el DOM esta listo
document.addEventListener("DOMContentLoaded", function () {
  setupSearch();
  setupDropdowns();
});

// Hacer funciones disponibles globalmente
window.setupSearch = setupSearch;
window.setupDropdowns = setupDropdowns;
window.Filter = Filter;
window.menuView = menuView;
window.moveHtml = moveHtml;

console.log("✅ Funciones globales disponibles");

// ===== LÓGICA DE MENÚS DESPLEGABLES (CLICK) ===== 
function toggleMenu(menuId, triggerElement) {
  // Cerrar todos los menús abiertos
  document.querySelectorAll(".dropdown-menu").forEach((menu) => {
    if (menu.id !== menuId) menu.classList.remove("show");
  });
  // Quitar clase activa de otros botones
  document
    .querySelectorAll(".profile-btn")
    .forEach((btn) => btn.classList.remove("active"));

  // Alternar el menú clickeado
  const menu = document.getElementById(menuId);
  menu.classList.toggle("show");

  // Si es el menú de perfil, activar el botón para el efecto de flecha
  if (menuId === "profile-dropdown") {
    triggerElement.classList.toggle("active");
  }
}

// Cerrar menús al hacer clic fuera
window.addEventListener("click", function (e) {
  if (!e.target.closest(".action-item")) {
    document
      .querySelectorAll(".dropdown-menu")
      .forEach((menu) => menu.classList.remove("show"));
    document
      .querySelectorAll(".profile-btn")
      .forEach((btn) => btn.classList.remove("active"));
  }
});

function verificarSesion() {
  let isLoggedIn = false; // Cambiar a true para probar el flujo directo

  if (isLoggedIn) {
    window.location.href = "detallesPedido.html";
  } else {
    Swal.fire({
      title: "¡Espera!",
      text: "Debes iniciar sesión para ver el menú y ordenar.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#d89a2e",
      cancelButtonColor: "#6b6363",
      confirmButtonText: "Ir a Iniciar Sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "login.html";
      }
    });
  }
  window.verificarSesion = verificarSesion;
}

// ===== FILTRO DE CATEGORÍAS (VISUAL) =====
document.querySelectorAll(".category-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    document
      .querySelectorAll(".category-btn")
      .forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
  });
});
