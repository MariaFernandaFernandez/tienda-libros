document.addEventListener("DOMContentLoaded", () => {
  fetch("data/libros.json")

    .then(response => response.json())
    .then(data => mostrarLibros(data));

  const inputBusqueda = document.getElementById("busqueda");
  inputBusqueda.addEventListener("input", () => {
    const texto = inputBusqueda.value.toLowerCase();
    fetch("data/libros.json") // 👈 sin barra inicial
      .then(res => res.json())
      .then(libros => {
        const filtrados = libros.filter(libro =>
          libro.titulo.toLowerCase().includes(texto) ||
          libro.autor.toLowerCase().includes(texto) ||
          libro.categoria.toLowerCase().includes(texto)
        );
        mostrarLibros(filtrados);
      });
  });
});

function mostrarLibros(libros) {
  const catalogo = document.getElementById("catalogo");
  catalogo.innerHTML = "";

  libros.forEach(libro => {
    const div = document.createElement("div");
    div.classList.add("libro");
    div.innerHTML = `
      <img src="img/${libro.imagen}" alt="${libro.titulo}" width="120">

      <h3>${libro.titulo}</h3>
      <p><strong>Autor:</strong> ${libro.autor}</p>
      <p><strong>Categoría:</strong> ${libro.categoria}</p>
      <p><strong>Precio:</strong> $${libro.precio}</p>
      <p><strong>Stock:</strong> ${libro.stock}</p>
      <button onclick="verDetalles('${libro.descripcion}')">Ver más</button>
      <button onclick="agregarAlCarrito(${libro.id})">Agregar al carrito</button>
    `;
    catalogo.appendChild(div);
  });
}

function verDetalles(descripcion) {
  alert("Descripción del libro:\n\n" + descripcion);
}

const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
if (usuarioActivo) {
  const bienvenida = document.getElementById("bienvenida");
  const botonCerrar = document.getElementById("cerrarSesion");

  if (bienvenida && botonCerrar) {
    bienvenida.textContent = `Bienvenido, ${usuarioActivo.usuario}`;
    botonCerrar.style.display = "inline-block";
    botonCerrar.addEventListener("click", () => {
      localStorage.removeItem("usuarioActivo");
      window.location.href = "login.html";
    });
  }
}
