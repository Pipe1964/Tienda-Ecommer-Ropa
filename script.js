// PERSONALIZA ESTOS DATOS ANTES DE USAR ESTA WEB CON UNA TIENDA REAL.
const TIENDA = {
  nombre: "ATELIER NORTE",
  // Número completo con indicativo, solo números. Ejemplo de formato Colombia: 573001234567
  whatsapp: ""
};

const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");

menuToggle.addEventListener("click", () => {
  const abierto = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(abierto));
  menuToggle.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Filtros de catálogo.
const filterButtons = document.querySelectorAll(".filter");
const products = document.querySelectorAll(".product-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    const filtro = button.dataset.filter;
    products.forEach((product) => {
      product.hidden = filtro !== "todos" && product.dataset.category !== filtro;
    });
  });
});

// Botones de consulta de producto.
function crearEnlaceWhatsApp(mensaje) {
  const texto = encodeURIComponent(mensaje);
  const numero = TIENDA.whatsapp.trim();
  return numero
    ? `https://wa.me/${numero}?text=${texto}`
    : `https://wa.me/?text=${texto}`;
}

document.querySelectorAll(".quick-add").forEach((button) => {
  button.addEventListener("click", () => {
    const producto = button.dataset.product;
    const mensaje = `Hola, ${TIENDA.nombre}. Quisiera información sobre ${producto}: tallas, colores y disponibilidad.`;
    if (!TIENDA.whatsapp.trim()) {
      alert("Demo: abre script.js y configura el WhatsApp real de la tienda antes de usar este botón.");
      return;
    }
    window.open(crearEnlaceWhatsApp(mensaje), "_blank", "noopener");
  });
});

const whatsappButton = document.querySelector("#whatsappButton");
whatsappButton.href = crearEnlaceWhatsApp(
  `Hola, ${TIENDA.nombre}. Quisiera consultar el catálogo, las tallas y la disponibilidad.`
);
whatsappButton.addEventListener("click", (event) => {
  if (!TIENDA.whatsapp.trim()) {
    event.preventDefault();
    alert("Demo: abre script.js y agrega el número de WhatsApp de la tienda para activar las consultas.");
  }
});

document.querySelector("#year").textContent = new Date().getFullYear();
