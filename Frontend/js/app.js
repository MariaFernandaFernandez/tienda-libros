document.addEventListener("DOMContentLoaded", () => {
  fetch("data/libros.json")
  .then(response => response.json())
  .then(data => mostrarLibros(data));


  const inputBusqueda = document.getElementById("busqueda");
  inputBusqueda.addEventListener("input", () => {
    const texto = inputBusqueda.value.toLowerCase();
    fetch("/data/libros.json")
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
// Mostrar usuario logueado y botón de cerrar sesión
const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
if (usuarioActivo) {
  const bienvenida = document.getElementById("bienvenida");
  const botonCerrar = document.getElementById("cerrarSesion");

  bienvenida.textContent = `Bienvenido, ${usuarioActivo.usuario}`;
  botonCerrar.style.display = "inline-block";

  botonCerrar.addEventListener("click", () => {
    localStorage.removeItem("usuarioActivo");
    window.location.href = "login.html";
  });
  
}
document.addEventListener("DOMContentLoaded", () => {
  const libros = [
    {
      "id": 1,
      "titulo": "1984",
      "autor": "George Orwell",
      "categoria": "Distopía",
      "precio": 28000,
      "stock": 10,
      "imagen": "1984.jpg",
      "descripcion": "Una sociedad vigilada donde el Gran Hermano lo controla todo."
    },
    {
      "id": 2,
      "titulo": "El Alquimista",
      "autor": "Paulo Coelho",
      "categoria": "Autoayuda",
      "precio": 25000,
      "stock": 8,
      "imagen": "alquimista.jpg",
      "descripcion": "La historia de un joven pastor que busca su leyenda personal."
    },
    {
      "id": 3,
      "titulo": "El Señor de los Anillos",
      "autor": "J.R.R. Tolkien",
      "categoria": "Fantasía",
      "precio": 40000,
      "stock": 5,
      "imagen": "anillos.jpg",
      "descripcion": "Una épica aventura para destruir el Anillo Único."
    },
    // 🔽 Continúa pegando los demás libros desde tu `libros.json` aquí...
  ];

  mostrarLibros(libros);

  const inputBusqueda = document.getElementById("busqueda");
  inputBusqueda.addEventListener("input", () => {
    const texto = inputBusqueda.value.toLowerCase();
    const filtrados = libros.filter(libro =>
      libro.titulo.toLowerCase().includes(texto) ||
      libro.autor.toLowerCase().includes(texto) ||
      libro.categoria.toLowerCase().includes(texto)
    );
    mostrarLibros(filtrados);
  });
});
