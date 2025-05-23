let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(id) {
  fetch("data/libros.json")
    .then(res => res.json())
    .then(libros => {
      const libro = libros.find(l => l.id === id);
      if (!libro) return;

      const existente = carrito.find(item => item.id === id);
      if (existente) {
        if (existente.cantidad < libro.stock) {
          existente.cantidad += 1;
        } else {
          alert("No hay más stock disponible.");
        }
      } else {
        carrito.push({ ...libro, cantidad: 1 });
      }

      localStorage.setItem("carrito", JSON.stringify(carrito));
      actualizarCarrito();
    });
}

document.getElementById("ver-carrito").addEventListener("click", () => {
  document.getElementById("carrito").classList.remove("oculto");
  actualizarCarrito();
});

function cerrarCarrito() {
  document.getElementById("carrito").classList.add("oculto");
}

function actualizarCarrito() {
  const lista = document.getElementById("items-carrito");
  const totalEl = document.getElementById("total");
  lista.innerHTML = "";

  let total = 0;

  carrito.forEach(item => {
    const li = document.createElement("li");
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    li.innerHTML = `
      ${item.titulo} x ${item.cantidad} = $${subtotal}
      <button onclick="eliminarDelCarrito(${item.id})">❌</button>
    `;
    lista.appendChild(li);
  });

  totalEl.textContent = total;
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter(item => item.id !== id);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCarrito();
}
