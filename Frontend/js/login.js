document.addEventListener("DOMContentLoaded", () => {
  const formRegistro = document.getElementById("form-registro");
  const formLogin = document.getElementById("form-login");
  const mensaje = document.getElementById("mensaje-login");

  // Cargar usuarios existentes o inicializar vacío
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  formRegistro.addEventListener("submit", (e) => {
    e.preventDefault();
    const nuevoUsuario = document.getElementById("nuevo-usuario").value.trim();
    const nuevaClave = document.getElementById("nueva-clave").value.trim();

    if (usuarios.some(u => u.usuario === nuevoUsuario)) {
      mensaje.textContent = "Este usuario ya existe.";
      mensaje.style.color = "red";
      return;
    }

    usuarios.push({ usuario: nuevoUsuario, clave: nuevaClave });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    mensaje.textContent = "Registro exitoso. Ahora puedes iniciar sesión.";
    mensaje.style.color = "green";

    document.getElementById("form-registro").reset();
  });

  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    const usuario = document.getElementById("usuario").value.trim();
    const clave = document.getElementById("clave").value.trim();

    const encontrado = usuarios.find(u => u.usuario === usuario && u.clave === clave);
    if (encontrado) {
      localStorage.setItem("usuarioActivo", JSON.stringify(encontrado));
      location.href = "index.html";
    } else {
      mensaje.textContent = "Usuario o contraseña incorrectos.";
      mensaje.style.color = "red";
    }
  });
});
