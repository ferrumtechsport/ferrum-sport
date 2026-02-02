// ===== Productos (para la página de detalle) =====
const PRODUCTOS = {
  banco: {
    nombre: "Banco Multifunción",
    precio: 350000,
    img: "img/banco.jpg",
    desc: "Banco multifunción robusto para entrenamiento completo. Ideal para uso en casa o gimnasio."
  },
  cinta: {
    nombre: "Cinta de correr",
    precio: 1200000,
    img: "img/cinta.jpg",
    desc: "Cinta de correr profesional para uso intensivo. Estructura firme y rendimiento estable."
  },
  reformer: {
    nombre: "Reformer Pilates",
    precio: 980000,
    img: "img/reformer.jpg",
    desc: "Reformer ideal para estudios de Pilates. Diseño moderno, cómodo y resistente."
  }
};

// ===== Carrito persistente (funciona en todas las páginas) =====
let carrito = [];
let total = 0;

function format(n) {
  return n.toLocaleString("es-AR");
}

function cargarCarrito() {
  const data = localStorage.getItem("ferrum_carrito");
  carrito = data ? JSON.parse(data) : [];
  total = carrito.reduce((acc, item) => acc + item.precio, 0);
}

function guardarCarrito() {
  localStorage.setItem("ferrum_carrito", JSON.stringify(carrito));
}

function actualizarBadge() {
  const b = document.getElementById("carrito-badge");
  if (!b) return;
  b.textContent = carrito.length;
}

function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  total += precio;
  guardarCarrito();

  // animación del carrito (la tuya)
  const c = document.getElementById("carrito");
  if (c) {
   c.classList.add("abierto");

  }

  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const totalEl = document.getElementById("total");
  if (!lista || !totalEl) return;

  lista.innerHTML = "";

  carrito.forEach((item, i) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.nombre} - $${format(item.precio)} <button onclick="eliminar(${i})">✖</button>`;
    lista.appendChild(li);
  });

  totalEl.textContent = `Total: $${format(total)}`;
  actualizarBadge();
}

function eliminar(i) {
  total -= carrito[i].precio;
  carrito.splice(i, 1);
  guardarCarrito();
  actualizarCarrito();
}

function toggleCarrito() {
  const c = document.getElementById("carrito");
  if (!c) return;
  c.classList.toggle("abierto");
}

function finalizarCompra() {
  alert("Gracias por tu compra");
  carrito = [];
  total = 0;
  guardarCarrito();
  actualizarCarrito();
}

// ===== Página de detalle: cargar datos según ?id= =====
function initProductoDetalle() {
  const nombreEl = document.getElementById("prod-nombre");
  const precioEl = document.getElementById("prod-precio");
  const descEl = document.getElementById("prod-desc");
  const imgEl = document.getElementById("prod-img");
  const btnEl = document.getElementById("btn-agregar");

  // Si no estamos en producto.html, no hacer nada
  if (!nombreEl || !precioEl || !descEl || !imgEl || !btnEl) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const prod = PRODUCTOS[id];
  if (!prod) {
    nombreEl.textContent = "Producto no encontrado";
    precioEl.textContent = "";
    descEl.textContent = "Volvé a productos y seleccioná uno válido.";
    imgEl.style.display = "none";
    btnEl.style.display = "none";
    return;
  }

  nombreEl.textContent = prod.nombre;
  precioEl.textContent = `$${format(prod.precio)}`;
  descEl.textContent = prod.desc;
  imgEl.src = prod.img;
  imgEl.alt = prod.nombre;

  btnEl.onclick = () => agregarAlCarrito(prod.nombre, prod.precio);
}

// ===== Arranque =====
document.addEventListener("DOMContentLoaded", () => {
  cargarCarrito();
  actualizarBadge();
  actualizarCarrito();
  initProductoDetalle();
});
