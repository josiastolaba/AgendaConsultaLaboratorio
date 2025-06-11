
const dniElement = document.getElementById("dni");
const nombreElement = document.getElementById("nombre");
const apellidoElement = document.getElementById("apellido");
const direccionElement = document.getElementById("direccion");
const fechaNacimientoElement = document.getElementById("fechaNacimiento");
const emailElement = document.getElementById("email");
const estado_usuarioElement = document.getElementById("estado_usuario");
const rolElement = document.getElementById("rol");
const id_usuarioElement = document.getElementById("id_usuario");

function cargarFormulario(usuario) {
    id_usuarioElement.value = usuario.id_usuario || "";
    dniElement.value = usuario.dni || "";
    nombreElement.value = usuario.nombre || "";
    apellidoElement.value = usuario.apellido || "";
    direccionElement.value = usuario.direccion || "";
    fechaNacimientoElement.value = cargarDate(usuario.fechaNacimiento) || "";
    emailElement.value = usuario.email || "";
    estado_usuarioElement.value = usuario.estado_usuario;
    rolElement.value = usuario.id_rol;
    console.log("Formulario cargado:", usuario);
}

function cargarDate(fecha) {
    try {
        const date = new Date(fecha);
        if (isNaN(date.getTime())) throw new Error("Fecha inválida");

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    } catch (error) {
        console.warn("Error al formatear fecha:", error);
        return "";
    }
}