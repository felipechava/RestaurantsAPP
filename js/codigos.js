/* MOSTRAR-NO MOSTRAR */

//Encabezado
let botones = document.querySelectorAll(".btnSeccion");
for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", mostrarSeccion)
}

function mostrarSeccion() {
    ocultarSecciones();
    let idBtn = this.getAttribute("id");

    switch (idBtn) {
        case "btnSeccionRealizarReserva":
            CargarFormularioRealizarReserva();
            document.querySelector("#seccionRealizarReserva").style.display = "block";
            break;
        case "nombreUsuarioLogueado":
            if (UsuarioLogueadoEsLocal()) {
                CargarPerfilLocal();
                document.querySelector("#seccionPerfilLocal").style.display = "block";
            }
            break;
        case "btnSeccionVerReservas":
            CargarReservas();
            document.querySelector("#seccionVerReservas").style.display = "block";
            break;
        case "btnSeccionVerEstadisticas":
            if (UsuarioLogueadoEsLocal()) {
                CargarEstadisticasLocal();
                document.querySelector("#seccionEstadisticasLocal").style.display = "block";
            }
            else {
                CargarEstadisticasCliente();
                document.querySelector("#seccionEstadisticasCliente").style.display = "block";
            }
            break;
        default:
            document.querySelector("#seccionBienvenida").style.display = "block";
    }
}

function ocultarSecciones() {
    let secciones = document.querySelectorAll(".seccion");
    for (let i = 0; i < secciones.length; i++) {
        secciones[i].style.display = "none";
    }
}

// Al entrar a la APP
document.querySelector("#btnIngresar").addEventListener("click", mostrarComienzoApp);

function mostrarComienzoApp() {
    ocultarSecciones();
    document.querySelector("#seccionBienvenida").style.display = "block";
    document.querySelector("#pBienvenida").innerHTML = `Seleccione en el menú superior la acción que desea realizar.`;
}

/* INFORMACIÓN */

let locales = []; // Array donde se almacenan los datos de los distintos locales. 
let usuarios = []; // Array de las personas donde se almacenan datos de su nombre de usuario.
let usuarioLogueado = null;
let localLogueado = null;

function UsuarioLogueadoEsLocal() {
    return localLogueado != null;
}

function UsuarioLogueadoEsCliente() {
    return usuarioLogueado != null
}

const TipoLocal = {
    Restaurant: "Restaurant",
    Teatro: "Teatro",
    Museo: "Museo"
}

class Local {
    constructor(Id, Nombre, Usuario, Contraseña, TipoDeLocal, FotoUrl, Direccion) { // Objeto del local con sus determinadas partes.
        this.Id = Id;
        this.Usuario = Usuario;
        this.Contraseña = Contraseña;
        this.Nombre = Nombre;
        this.Habilitado = true;
        this.CupoMaximo = 15;
        this.Reservas = [];
        this.Direccion = Direccion;
        this.TipoDeLocal = TipoDeLocal;
        this.FotoUrl = FotoUrl;
    }
}

const EstadoReserva = { // Función estática para el estado de las reservas; cada estado está representado por un número. 
    Pendiente: "Pendiente",
    Cancelado: "Cancelado",
    Finalizado: "Finalizado",
}

class Reserva {
    constructor(Id, IdUsuario, NombreCliente, IdLocal, Cupos) { // Objeto de la reserva.
        this.Id = Id;
        this.IdUsuario = IdUsuario;
        this.NombreCliente = NombreCliente;
        this.IdLocal = IdLocal;
        this.Cupos = Cupos;
        this.Estado = EstadoReserva.Pendiente;
        this.Puntuacion = 0;
    }
}

class Usuario {
    constructor(Id, Nombre, Usuario, Contraseña) { // Objeto de los usuarios con sus determinadas partes.
        this.Id = Id;
        this.Nombre = Nombre;
        this.Usuario = Usuario;
        this.Contraseña = Contraseña;
    }
}

// Información precargada:

function Inicializar() { // Función de usuario local y persona con sus datos precargados precargadas. 

    // Locales
    let local1 = new Local("01", "Nombre local 1", "local1", "Local1", TipoLocal.Restaurant, "https://img.freepik.com/free-photo/restaurant-interior_1127-3394.jpg?w=360", "Dirección local 1");
    let local2 = new Local("02", "Nombre local 2", "local2", "Local2", TipoLocal.Restaurant, "https://media-cdn.tripadvisor.com/media/photo-s/17/75/3f/d1/restaurant-in-valkenswaard.jpg", "Dirección local 2");
    let local3 = new Local("03", "Nombre local 3", "local3", "Local3", TipoLocal.Restaurant, "https://media-cdn.tripadvisor.com/media/photo-s/1a/18/3a/cb/restaurant-le-47.jpg", "Dirección local 3");
    let local4 = new Local("04", "Nombre local 4", "local4", "Local4", TipoLocal.Museo, "https://imagenes.elpais.com/resizer/S8_ehMqrjD2IuKkcQ4JEX5qI6-Q=/414x0/arc-anglerfish-eu-central-1-prod-prisa.s3.amazonaws.com/public/6ED2OK2CHJZN57T2UTFKI72K4M.jpg", "Dirección local 4");
    let local5 = new Local("05", "Nombre local 5", "local5", "Local5", TipoLocal.Museo, "https://static.anuevayork.com/wp-content/uploads/2021/02/18105800/Visitar-el-Museo-de-Historia-Natural-de-Nueva-York-Precios-entradas-y-que-ver.jpg", "Dirección local 5");
    let local6 = new Local("06", "Nombre local 6", "local6", "Local6", TipoLocal.Teatro, "https://conceptodefinicion.de/wp-content/uploads/2022/05/teatro_10.jpg", "Dirección local 6");
    let local7 = new Local("07", "Nombre local 7", "local7", "Local7", TipoLocal.Teatro, "https://us.123rf.com/450wm/tom19275/tom192751812/tom19275181200006/120562858-sala-de-teatro-vac%C3%ADa-con-escenario-cortina-roja-y-asientos-render-3d.jpg?ver=6", "Dirección local 7");

    locales.push(local1); // Restaurant 1 
    locales.push(local2); // Restaurant 2
    locales.push(local3); // Restaurant 3
    locales.push(local4); // Museo 1
    locales.push(local5); // Museo 2
    locales.push(local6); // Teatro 1
    locales.push(local7); // Teatro 2

    // Usuarios
    let usuario1 = new Usuario(1, "usuario1", "usuario1", "Usuario1");
    let usuario2 = new Usuario(2, "usuario2", "usuario2", "Usuario2");
    let usuario3 = new Usuario(3, "usuario3", "usuario3", "Usuario3");
    let usuario4 = new Usuario(4, "usuario4", "usuario4", "Usuario4");
    let usuario5 = new Usuario(5, "usuario5", "usuario5", "Usuario5");
    let usuario6 = new Usuario(6, "usuario6", "usuario6", "Usuario6");
    let usuario7 = new Usuario(7, "usuario7", "usuario7", "Usuario7");

    usuarios.push(usuario1);
    usuarios.push(usuario2);
    usuarios.push(usuario3);
    usuarios.push(usuario4);
    usuarios.push(usuario5);
    usuarios.push(usuario6);
    usuarios.push(usuario7);

    // Precarga de reservas:
    // El orden de los datos es --> (Id, IdUsuario, NombreCliente, IdLocal, Cupos)

    // Usuario 1
    locales[0].Reservas.push(new Reserva(1, 1, usuario1.Nombre, "01", 2)); // Reserva Num 1 a Local 1 - usuario1 - 2 personas - Pendiente

    // Usuario 2
    locales[3].Reservas.push(new Reserva(2, 2, usuario2.Nombre, "04", 3)); // Reserva Num 2 a Local 4 - usuario2 - 3 personas - Pendiente

    // Usuario 3
    locales[4].Reservas.push(new Reserva(3, 3, usuario3.Nombre, "05", 4)); // Reserva Num 3 a Local 5 - usuario3 - 4 personas - Pendiente

    // Usuario 4
    locales[1].Reservas.push(new Reserva(4, 4, usuario4.Nombre, "02", 1)); // Reserva Num 4 a Local 2 - usuario4 - 1 personas - Pendiente

    let reserva5 = new Reserva(5, 4, usuario1.Nombre, "03", 3);
    reserva5.Estado = EstadoReserva.Finalizado;
    locales[2].Reservas.push(reserva5); // Reserva Num 5 a Local 3 - usuario4 - 3 personas - Finalizada

    // Usuario 5
    locales[5].Reservas.push(new Reserva(6, 5, usuario5.Nombre, "06", 5)); // Reserva Num 6 a Local 6 - usuario5 - 5 personas - Pendiente

    let reserva7 = new Reserva(7, 5, usuario5.Nombre, "07", 3);
    reserva7.Estado = EstadoReserva.Finalizado;
    locales[6].Reservas.push(reserva7); // Reserva Num 7 a Local 7 - usuario5 - 2 personas - Finalizada

    // Usuario 6
    // Sin reservas

    // Usuario 7
    // Sin reservas
}


document.querySelector("#a").addEventListener("click", mostrarIniciarSesion);
document.querySelector("#b").addEventListener("click", mostrarRegistro);

Inicializar();

/* FUNCIONALIDAD: REGISTRARSE */

document.querySelector("#btnRegistrarse").addEventListener("click", Registrarse);

function Registrarse() {
    let nombre = document.querySelector("#txtNombre").value;
    let usuario = document.querySelector("#txtUsuario").value;
    let contraseña = document.querySelector("#txtContraseña").value;

    if (nombre.trim().length === 0) {
        document.querySelector("#pRegistrarse").innerHTML = "No se ha ingresado el nombre.";
        return; // Finaliza la función.
    } else if (usuario.trim().length === 0) {
        document.querySelector("#pRegistrarse").innerHTML = "No se ha ingresado el usuario.";
        return;
    } else if (contraseña.trim().length === 0) {
        document.querySelector("#pRegistrarse").innerHTML = "No se ha ingresado la contraseña.";
        return;
    }

    let usuarioNuevo = new Usuario(usuarios.length + 1, nombre, usuario, contraseña);

    if (usuarios.find(x => x.Usuario === usuarioNuevo.Usuario)) { // Busca si el usuario creado ya existe en el array de usuarios.
        document.querySelector("#pRegistrarse").innerHTML = "El usuario seleccionado ya existe.";
        return;
    }

    if (locales.find(x => x.Usuario === usuarioNuevo.Usuario)) { // Busca si el local creado ya existe en el array de locales.
        document.querySelector("#pRegistrarse").innerHTML = "El usuario seleccionado ya existe.";
        return;
    }

    if (!ContraseñaEsValida(usuarioNuevo.Contraseña)) {
        document.querySelector("#pRegistrarse").innerHTML = "La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula y al menos un número.";
        return;
    }

    usuarios.push(usuarioNuevo);
    document.querySelector("#pRegistrarse").innerHTML = `¡Te has registrado correctamente!`;
}

function mostrarRegistro() {
    document.querySelector("#contenedorRegistrarse").style.display = 'block';
    document.querySelector("#contenedorIniciarSesion").style.display = 'none';
}


/* FUNCIONALIDAD: INICIAR SESIÓN */

document.querySelector("#btnIngresar").addEventListener("click", IniciarSesion);

function IniciarSesion() {
    let usuario = document.querySelector("#txtUsuarioInicioSesion").value;
    let contraseña = document.querySelector("#txtContraseñaInicioSesion").value;

    if (usuario.trim().length === 0 && contraseña.trim().length === 0) { // Verifica que el largo del usuario y la contraseña no sea 0 y que no tenga espacios en blanco. 
        document.querySelector("#pIniciarSesion").innerHTML = "No se ha ingresado el usuario y contraseña.";
        return;
    } else if (usuario.trim().length === 0) {
        document.querySelector("#pIniciarSesion").innerHTML = "No se ha ingresado el usuario.";
        return;
    } else if (contraseña.trim().length === 0) {
        document.querySelector("#pIniciarSesion").innerHTML = "No se ha ingresado la contraseña.";
        return;
    }

    let usuarioExistente = usuarios.find(x => x.Usuario === usuario); // Verifica que el usuario ingresado coincida con uno existente
    if (usuarioExistente != null) {
        if (usuarioExistente.Contraseña === contraseña) { // Verifica que la contraseña sea igual a la registrada
            usuarioLogueado = usuarioExistente;
        } else {
            document.querySelector("#pIniciarSesion").innerHTML = `La contraseña y el usuario ingresado no coinciden.`;
            return;
        }
    }

    let localExistente = locales.find(x => x.Usuario === usuario); // Verifica que el local ingresado coincida con uno existente
    if (localExistente != null) {
        if (localExistente.Contraseña === contraseña) { // Verifica que la contraseña sea igual a la registrada
            localLogueado = localExistente;
        } else {
            document.querySelector("#pIniciarSesion").innerHTML = `La contraseña y el local ingresado no coinciden.`;
            return;
        }

    }

    if (usuarioLogueado === null && localLogueado === null) { // Verificaciín extra
        document.querySelector("#pIniciarSesion").innerHTML = `Usuario o contraseña incorrectos.`;
        return;
    }

    if (UsuarioLogueadoEsCliente() == true) { // Que mostrar si es cliente
        document.querySelector("#nombreUsuarioLogueado").innerHTML = usuarioLogueado.Usuario;
        document.querySelector("#btnSeccionRealizarReserva").style.display = 'block';
    } else if (UsuarioLogueadoEsLocal() == true) { // Que mostrar si es local
        document.querySelector("#nombreUsuarioLogueado").innerHTML = localLogueado.Usuario;
        document.querySelector("#btnSeccionRealizarReserva").style.display = 'none';
    }

    document.querySelector("#contenedor").style.display = 'block';
    document.querySelector("#contenedorIniciarSesion").style.display = 'none';
    document.querySelector("#contenedorBotones").style.display = "none";

    document.querySelector("#txtUsuarioInicioSesion").value = "";
    document.querySelector("#txtContraseñaInicioSesion").value = "";
}

function ContraseñaEsValida(contraseña) {
    let i = 0;
    let caracter = '';
    let tieneMayuscula = false; // Se hace como que no tiene para luego verificar y cambiar de valor
    let tieneMinuscula = false;
    let tieneNumero = false;

    contraseña = contraseña.trim();

    if (contraseña.length < 6) {
        return false;
    }

    while (i < contraseña.length) { // Recorre toda la contraseña caractér por caractér
        caracter = contraseña.charAt(i);
        if (!isNaN(caracter * 1)) { // Verifica que sea númeroy que tenga uno
            tieneNumero = true;
        } else {
            if (caracter == caracter.toUpperCase()) { // Verifica que tenga una mayúscula
                tieneMayuscula = true;
            } else if (caracter == caracter.toLowerCase()) { // Verifica que tenga una minúscula
                tieneMinuscula = true;
            }
        }
        i++; // Al ser while se le aumenta para que recorra
    }
    return tieneNumero && tieneMayuscula && tieneMinuscula; // Retorna solo si cumple los 3 requisitos
}

function mostrarIniciarSesion() {
    document.querySelector("#contenedorRegistrarse").style.display = 'none';
    document.querySelector("#contenedorIniciarSesion").style.display = 'block';
}

/* FUNCIONALIDAD: CERRAR SESIÓN */

document.querySelector("#btnCerrarSesion").addEventListener("click", CerrarSesion);

function CerrarSesion() {

    let confirmacionCerrarSesion = confirm(`¿Seguro que desea cerrar sesión?`);

    if (confirmacionCerrarSesion) {
        localLogueado = null;
        usuarioLogueado = null;

        document.querySelector("#contenedor").style.display = 'none';
        document.querySelector("#contenedorIniciarSesion").style.display = 'none';
        document.querySelector("#contenedorBotones").style.display = "block";
    }
}

/* FUNCIONALIDAD: HACER RESERVA Y HABILITAR-DESHABILITAR LOCALES */

function CargarFormularioRealizarReserva() {

    // Para resetear el formulario
    document.getElementById('imgLocal').src = ``;
    document.querySelector("#txtDireccionLocal").innerHTML = "";
    document.querySelector("#txtCupoReserva").value = "";
    document.querySelector("#slcDistintosLocales").value = 0;
    document.querySelector("#pRealizarReserva").innerHTML = "";

    let localesHabilitados = [];
    for (let i = 0; i < locales.length; i++) { // Si el local está habilitado lo suma al array de localesHabilitados
        if (locales[i].Habilitado) {
            localesHabilitados.push(locales[i]);
        }
    }

    let select = document.querySelector('#slcDistintosLocales');
    select.innerHTML = "";
    select.options.add(new Option("...", -1)); // Se le agrega al select la opcion predeterminada de "..."

    for (let i = 0; i < localesHabilitados.length; i++) {
        const localHabilitado = localesHabilitados[i];

        select.options.add(new Option(localHabilitado.Nombre, localHabilitado.Id)); // Se le agrega al select como opcion el nombre de los locales que estén habilitados
    }
}

function SeleccionarLocal() {
    let idLocalSeleccionado = document.querySelector("#slcDistintosLocales").value; // Del select se saca el id del local
    let localSeleccionado;

    for (let i = 0; i < locales.length; i++) { // Recorre lo locales
        if (locales[i].Id === idLocalSeleccionado) { // El id del local seleccionado cuando coincida con uno de los locales lo guarda
            localSeleccionado = locales[i];
        }
    }

    //Cambiar imagen SRC
    document.getElementById('imgLocal').src = `${localSeleccionado.FotoUrl}`;

    document.querySelector("#txtDireccionLocal").innerHTML = localSeleccionado.Direccion; // Muestra la direccion precargada del local seleccionado

    let puntajeTotal = 0;
    let cantidadReservas = 0;

    for (let i = 0; i < localSeleccionado.Reservas.length; i++) { // Recorre las reservas del local seleccionado

        let reserva = localSeleccionado.Reservas[i]; // Guardada en una variable

        if (reserva.Puntuacion > 0) {
            puntajeTotal += reserva.Puntuacion;
            cantidadReservas++;
        }
    }

    puntajeTotal = Number(puntajeTotal / cantidadReservas);

    if (!isNaN(puntajeTotal)) {
        document.querySelector("#txtPuntajeLocal").innerHTML = `Puntaje: ${puntajeTotal}`;
    }
}

document.querySelector("#slcDistintosLocales").addEventListener("change", SeleccionarLocal);

function CrearReserva() {
    document.querySelector("#pRealizarReserva").innerHTML = "";

    let idLocalSeleccionado = document.querySelector("#slcDistintosLocales").value; // Para sacar del select el id del local seleccionado
    let localSeleccionado;

    for (let i = 0; i < locales.length; i++) {
        if (locales[i].Id === idLocalSeleccionado) { // Se verifica que el id sea el mismo para identificar el local
            localSeleccionado = locales[i];
        }
    }

    if (localSeleccionado == null) {
        document.querySelector("#pRealizarReserva").innerHTML = `Se debe seleccionar un local.`;
        return;
    }

    let cupoIngresado = Number(document.querySelector("#txtCupoReserva").value);

    if (isNaN(cupoIngresado)) {
        document.querySelector("#pRealizarReserva").innerHTML = `Se debe ingresar un número en el campo de cupo.`;
        return;
    }

    if (cupoIngresado % 1 != 0) {
        document.querySelector("#pRealizarReserva").innerHTML = `Se debe ingresar un número entero en el campo de cupo.`;
        return;
    }

    if (cupoIngresado <= 0) {
        document.querySelector("#pRealizarReserva").innerHTML = `Se debe ingresar cuántas personas van a asistir al local.`;
        return;
    }

    let cuposOcupadosLocal = 0; // Predetermina que no tienen ningúna reserva

    for (let i = 0; i < localSeleccionado.Reservas.length; i++) {
        if (localSeleccionado.Reservas[i].Estado === EstadoReserva.Aceptado || localSeleccionado.Reservas[i].Estado === EstadoReserva.Pendiente) { // Si el estado es aceptado o pendiente
            cuposOcupadosLocal += localSeleccionado.Reservas[i].Cupos; // Agrega la reserva a los cupos
        }
    }

    if ((cupoIngresado + cuposOcupadosLocal) <= localSeleccionado.CupoMaximo) { // Entra si no supera la capacidad máxima

        let confirmacionReservaRealizada = confirm(`¿Seguro que desea realizar una reserva
        de ${cupoIngresado} personas para ${localSeleccionado.Nombre}?`);

        if (confirmacionReservaRealizada) { // Si confirma

            let reserva = new Reserva(`${localSeleccionado.Id}${localSeleccionado.Reservas.length}`, usuarioLogueado.Id, usuarioLogueado.Nombre, localSeleccionado.Id, cupoIngresado); // Se agrega al objeto de reserva

            localSeleccionado.Reservas.push(reserva);

            document.querySelector("#pRealizarReserva").innerHTML = `La reserva se ha realizado con éxito`;
        }

    } else {
        document.querySelector("#pRealizarReserva").innerHTML = `El local no tiene esa cantidad de cupos disponibles.`; // Si no entra no tiene cupo disponible
        return;
    }
}

document.querySelector("#btnReservarCupo").addEventListener("click", CrearReserva);

function CargarPerfilLocal() {
    let slcLocales = document.querySelector("#slcVisualizarEstado");

    if (localLogueado.Habilitado == true) {    // Precarga si local esta habilitado o no
        slcLocales.value === "s";
    } else {
        slcLocales.value === "n";
    }

    document.querySelector("#txtCupoMaximo").value = localLogueado.CupoMaximo; // Precarga el cupo maximo actual del local

    document.querySelector("#txtCupoMaximo").disabled = false;
    for (let i = 0; i < localLogueado.Reservas.length; i++) {
        let reserva = localLogueado.Reservas[i];

        if (reserva.Estado === EstadoReserva.Pendiente) {
            document.querySelector("#txtCupoMaximo").disabled = true;
            break;
        }
    }
}

function GuardarPerfilLocal() {
    let localHabilitado = document.querySelector("#slcVisualizarEstado").value;
    let cupoMaximo = Number(document.querySelector("#txtCupoMaximo").value);

    if (localHabilitado === "s") { // Local habilitado
        localLogueado.Habilitado = true;
    } else {
        localLogueado.Habilitado = false; // Local no habilitado
    }

    if (cupoMaximo > 0) { // Verificaciones 
        localLogueado.CupoMaximo = cupoMaximo;
    } else if (cupoMaximo <= 0) {
        document.querySelector("#pPerfilLocalGuardarCambios").innerHTML = `Se debe ingresar un número que sea mayor a 0.`;
        return;
    } else if (isNaN(Number(cupoMaximo))) {
        document.querySelector("#pPerfilLocalGuardarCambios").innerHTML = `Se debe ingresar un número.`;
        return;
    }

    let confirmacionCambiosGuardados = confirm(`¿Desea guardar los cambios?`);

    if (confirmacionCambiosGuardados) {
        document.querySelector("#pPerfilLocalGuardarCambios").innerHTML = `Se han guardado los cambios correctamente.`;
    }
}

document.querySelector("#btnGuardarPerfilLocal").addEventListener("click", GuardarPerfilLocal);

/* FUNCIONALIDAD:REALIZAR RESERVA Y FINALIZAR RESERVA*/

function CargarReservas(Busqueda) {

    document.querySelector("#tblReservas").innerHTML = "";
    document.querySelector("#pReservasLocal").innerHTML = "";

    if (UsuarioLogueadoEsLocal()) { // Lo que se muestra si es local
        document.querySelector("#buscador").style.display = 'block';
        document.querySelector("#txtColumnaNombre").innerHTML = "Nombre del Cliente";

        for (let i = 0; i < localLogueado.Reservas.length; i++) { // Recorre las reservas hechas por los usuarios (obviamente logueados)
            let reserva = localLogueado.Reservas[i];

            if (Busqueda === undefined || reserva.NombreCliente.includes(Busqueda)) { // Si lo que se pone en el campo de búsqueda incluye parte del nombre del usuario, o no se ingresa nada
                document.querySelector("#tblReservas").innerHTML += `<tr>
                <td>${reserva.NombreCliente}</td>
                <td>${reserva.Cupos}</td>
                <td>${reserva.Estado}</td>
                <td><input type="button"id="btnFinalizar${i}" data-reserva="${reserva.Id}" class="btnFinalizar" value="Finalizar"></td> 
                </tr>`; // Se le ingresa un id al botón de finalizar para ubicarlo con cada reserva-usuario 
            } else {
                document.querySelector("#pReservasLocal").innerHTML = "No hay coincidencias con ese nombre."; // Sino no hay coincidencias
            }

            if (reserva.Estado === EstadoReserva.Finalizado || reserva.Estado === EstadoReserva.Cancelado) {
                document.querySelector("#btnFinalizar" + i).parentElement.style.display = "none";
            }

            if (reserva.Estado === EstadoReserva.Pendiente) {
                document.querySelector("#btnFinalizar" + i).parentElement.style.display = "block";
            }
        }

        let botonesFinalizar = document.querySelectorAll(".btnFinalizar");
        for (let i = 0; i < botonesFinalizar.length; i++) {
            const btnFinalizar = botonesFinalizar[i];
            btnFinalizar.addEventListener("click", FinalizarReserva);
        }

    } else if (UsuarioLogueadoEsCliente()) {
        document.querySelector("#buscador").style.display = 'none';
        document.querySelector("#txtColumnaNombre").innerHTML = "Nombre del Local"; // Que muestre nombre del local (sino diría cliente).

        let reservasUsuario = []; // Se crea array

        for (let i = 0; i < locales.length; i++) { // Recorre todos los locales
            for (let x = 0; x < locales[i].Reservas.length; x++) { // Recorre las reserva de los locales

                let reserva = locales[i].Reservas[x];

                if (reserva.IdUsuario == usuarioLogueado.Id) { // Cuando coincida la reserva con el idUsuario lo pushea e ingresa. 
                    reservasUsuario.push(reserva)
                }
            }
        }

        for (let i = 0; i < reservasUsuario.length; i++) { // Recorre las reservas de los usuarios

            let reserva = reservasUsuario[i];

            let localReserva = locales.find(x => x.Id === reserva.IdLocal); // Busca en los locales los id que coincidan con una reserva hecha a un local con ese mismo id

            document.querySelector("#tblReservas").innerHTML += `<tr>
        <td>${localReserva.Nombre}</td>
        <td>${reserva.Cupos}</td>
        <td>${reserva.Estado}</td>
        <td><input type="button" data-local="${localReserva.Id}" id="btnCancelar${i}" data-reserva="${reserva.Id}" class="btnCancelar" value="Cancelar"></td>
        <td><input type="button" data-local="${localReserva.Id}" id="btnPuntuar${i}" data-reserva="${reserva.Id}" class="btnPuntuar" value="Puntuar"></td>
        </tr>`;

            if (reserva.Estado === EstadoReserva.Cancelado) { // Validaciones para identificar que mostrar y que no
                document.querySelector("#btnCancelar" + i).parentElement.style.display = 'none';
                document.querySelector("#btnPuntuar" + i).parentElement.style.display = 'none';
            }

            if (reserva.Estado === EstadoReserva.Pendiente) {
                document.querySelector("#btnCancelar" + i).parentElement.style.display = 'display';
                document.querySelector("#btnPuntuar" + i).parentElement.style.display = 'none';
            }

            if (reserva.Estado === EstadoReserva.Finalizado) {
                document.querySelector("#btnCancelar" + i).parentElement.style.display = 'none';

                if (reserva.Puntuacion === 0) {
                    document.querySelector("#btnPuntuar" + i).parentElement.style.display = 'block';
                }
                else {
                    document.querySelector("#btnPuntuar" + i).parentElement.style.display = 'none';
                }
            }

            let botonesEliminar = document.querySelectorAll(".btnCancelar");
            for (let i = 0; i < botonesEliminar.length; i++) {
                const btnEliminar = botonesEliminar[i];
                btnEliminar.addEventListener("click", CancelarReserva);
            }

            let botonesPuntuar = document.querySelectorAll(".btnPuntuar");
            for (let i = 0; i < botonesPuntuar.length; i++) {
                const btnPuntuar = botonesPuntuar[i];
                btnPuntuar.addEventListener("click", CargarFormularioPuntuarReserva);
            }
        }
    }
}

document.querySelector("#btnBuscar").addEventListener("click", function () { CargarReservas(document.querySelector("#txtBusqueda").value) });

/* FUNCIONALIDAD: CANCELAR UNA RESERVA */

function CancelarReserva() {

    let idLocal = Number(this.getAttribute("data-local"));
    let idReserva = Number(this.getAttribute("data-reserva"));

    let confirmacion = confirm(
        `¿Seguro que desea cancelar la reserva?`);
    if (confirmacion) {

        let reserva = locales.find(x => x.Id == idLocal).Reservas.find(i => i.Id == idReserva); // Busca esa reserva y la cambia de estado a cancelado

        reserva.Estado = EstadoReserva.Cancelado;

        CargarReservas();
    }
}

/* FUNCIONALIDAD: FINALIZAR UNA RESERVA */

function FinalizarReserva() {
    let idReserva = Number(this.getAttribute("data-reserva"));

    let confirmacion = confirm(
        `¿Seguro que desea finalizar la reserva?`);
    if (confirmacion) {

        let reserva = localLogueado.Reservas.find(i => i.Id == idReserva); // Busca esa reserva y la cambia de estado a finalizado

        reserva.Estado = EstadoReserva.Finalizado;

        CargarReservas();
    }
}

/* FUNCIONALIDAD: PUNTUAR RESERVA */
let reservaAPuntuar;

function CargarFormularioPuntuarReserva() {
    let idLocal = Number(this.getAttribute("data-local"));
    let idReserva = Number(this.getAttribute("data-reserva"));

    let localReserva = locales.find(x => x.Id == idLocal);

    let reserva = localReserva.Reservas.find(i => i.Id == idReserva);

    document.querySelector("#txtNombreLocalAPuntuar").innerHTML = localReserva.Nombre;

    reservaAPuntuar = reserva;

    ocultarSecciones();
    document.querySelector("#seccionPuntuarReserva").style.display = "block";
}

function PuntuarReserva() {

    let confirmacion = confirm(
        `¿Seguro que desea guardar el puntaje?`);
    if (confirmacion) {

        let puntajeSeleccionado = Number(document.querySelector("#slcPuntaje").value);

        reservaAPuntuar.Puntuacion = puntajeSeleccionado;

        reservaAPuntuar = null; // Le saca la propiedad
    }

    ocultarSecciones(); // Se oculta todo
    CargarReservas(); // Se cargan las reservas
    document.querySelector("#seccionVerReservas").style.display = "block";

}

document.querySelector("#btnPuntuarReserva").addEventListener("click", PuntuarReserva);

/* FUNCIONALIDAD: INFORMACIÓN ESTADÍSTICA */

function CargarEstadisticasLocal() {

    let puntuacionTotal = 0;
    let cuposOcupados = 0;
    let cantidadReservasPendientes = 0;
    let cantidadReservasFinalizadas = 0;
    let cantidadReservasCanceladas = 0;

    for (let i = 0; i < localLogueado.Reservas.length; i++) { // Recorre las reservas del local logueado seleccionado

        let reserva = localLogueado.Reservas[i]; // Guardada en una variable

        if (reserva.Puntuacion > 0 && reserva.Estado == EstadoReserva.Finalizado) {
            puntuacionTotal += reserva.Puntuacion;
            cantidadReservasFinalizadas++;
        }

        if (reserva.Estado == EstadoReserva.Pendiente) {
            cantidadReservasPendientes++;
            cuposOcupados = cuposOcupados + reserva.Cupos;
        }

        if (reserva.Estado == EstadoReserva.Cancelado) {
            cantidadReservasCanceladas++;
        }
    }

    let puntajePromedio = Number(puntuacionTotal / cantidadReservasFinalizadas);
    let porcentajeDeOcupacion = Number(cuposOcupados / localLogueado.CupoMaximo) * 100;

    if (!isNaN(puntajePromedio)) {
        document.querySelector("#txtPromedioCalificacion").innerHTML = puntajePromedio;
    }

    if (!isNaN(porcentajeDeOcupacion)) {
        document.querySelector("#txtPorcentajeOcupacion").innerHTML = `${porcentajeDeOcupacion} %`;
    }

    document.querySelector("#txtTotalReservas").innerHTML = localLogueado.Reservas.length;
    document.querySelector("#txtTotalReservasPendientes").innerHTML = cantidadReservasPendientes;
    document.querySelector("#txtTotalReservasFinalizadas").innerHTML = cantidadReservasFinalizadas;
    document.querySelector("#txtTotalReservasCanceladas").innerHTML = cantidadReservasCanceladas;
}

function CargarEstadisticasCliente() {

    document.querySelector("#tblEstadisticasCliente").innerHTML = "";
    document.querySelector("#tblLocalesMasReservados").innerHTML = "";

    let localesMasReservados = [];
    let cantReservas = 0;

    for (let i = 0; i < locales.length; i++) { // Recorre los locales

        let local = locales[i]; // Asigna cada posicion a la variable

        let cantidadReservasEnLocal = 0;
        let cantidadReservasFinalizadasEnLocal = 0;

        for (let x = 0; x < local.Reservas.length; x++) { // Recorre las reservas de cada uno de los locales 

            let reserva = local.Reservas[x]; // Asigna cada posicion a la variable

            if (reserva.IdUsuario === usuarioLogueado.Id) {
                cantidadReservasEnLocal++;

                if (reserva.Estado == EstadoReserva.Finalizado) {
                    cantidadReservasFinalizadasEnLocal++;
                }
            }
        }

        if (cantidadReservasEnLocal > 0) { // Si al menos tiene 1 reserva muestra todo
            document.querySelector("#tblEstadisticasCliente").innerHTML += `<tr>
        <td>${local.Nombre}</td>
        <td>${cantidadReservasFinalizadasEnLocal}</td>
        <td>${cantidadReservasEnLocal}</td>
        <td>${local.Reservas.length}</td>
        <td>${(cantidadReservasEnLocal / local.Reservas.length) * 100}</td>
        </tr>`;
        }

        if (cantidadReservasEnLocal === cantReservas) { // Mecánica para verificar el máximo de reservas 
            localesMasReservados.push(local);
        } else if (cantidadReservasEnLocal > cantReservas) {
            localesMasReservados = []; // Se resetea
            localesMasReservados.push(local);
            cantReservas = cantidadReservasEnLocal; // Cambia el máximo
        }
    }

    if (cantReservas > 0) {
        for (let i = 0; i < localesMasReservados.length; i++) {
            let local = localesMasReservados[i];

            document.querySelector("#tblLocalesMasReservados").innerHTML += `<tr>
            <td>${local.Nombre}</td>
            <td>${cantReservas}</td>
            </tr>`;
        }
    }
}
















