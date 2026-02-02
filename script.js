let carrito = [];
let total = 0;

function comprar(producto, precio) {
  carrito.push({ producto, precio });
  total += precio;
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const totalTexto = document.getElementById("total");

  lista.innerHTML = "";

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
  <span>${item.producto} - $${item.precio}</span>
  <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">✕</button>
`;

    lista.appendChild(li);
  });

  totalTexto.textContent = `Total: $${total}`;
}

function eliminarDelCarrito(index) {
  total -= carrito[index].precio;
  carrito.splice(index, 1);
  actualizarCarrito();
}

function toggleCarrito() {
  const carritoDiv = document.getElementById("carrito");
  carritoDiv.style.display =
    carritoDiv.style.display === "block" ? "none" : "block";
}

function enviarWhatsApp() {
  let mensaje = "Hola! 👋 Quiero comprar en Ferrum Sport:\n\n";

  carrito.forEach(item => {
    mensaje += `• ${item.producto} - $${item.precio}\n`;
  });

  mensaje += `\nTotal: $${total}\n\n`;
  mensaje += "¿Me pasás el link de Mercado Pago para abonar?";

  const telefono = "5493454330074";
  window.open(
    `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`,
    "_blank"
  );
}

