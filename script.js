const pantallaPortada = document.getElementById(
    "pantalla-portada"
);

const pantallaLibro = document.getElementById(
    "pantalla-libro"
);

const libroCerrado = document.getElementById(
    "libro-cerrado"
);

const botonAbrir = document.getElementById(
    "boton-abrir"
);

const botonCerrar = document.getElementById(
    "boton-cerrar"
);

const zonaLibro = document.getElementById(
    "zona-libro"
);

const paginas = document.querySelectorAll(
    ".pagina"
);

const botonAnterior = document.getElementById(
    "pagina-anterior"
);

const botonSiguiente = document.getElementById(
    "pagina-siguiente"
);

const contadorPagina = document.getElementById(
    "contador-pagina"
);

const contenedorIndicadores = document.getElementById(
    "indicadores"
);

const tituloCarta = document.getElementById(
    "titulo-carta"
);

const corazonCarta = document.getElementById(
    "corazon-carta"
);

const audio = document.getElementById(
    "audio"
);

const botonMusica = document.getElementById(
    "boton-musica"
);

const iconoMusica = document.getElementById(
    "icono-musica"
);

const textoMusica = document.getElementById(
    "texto-musica"
);

const ondas = document.getElementById(
    "ondas"
);

const temas = [
    "tema-carta",
    "tema-carnica",
    "tema-playa",
    "tema-atardecer",
    "tema-teatro",
    "tema-distancia",
    "tema-cine",
    "tema-final"
];

let paginaActual = 0;
let cartaAnimada = false;


/**
 * Abre el libro.
 */
function abrirLibro() {

    botonAbrir.classList.add("oculto");
    libroCerrado.classList.add("abriendo");

    setTimeout(function () {

        pantallaPortada.classList.remove("activa");
        pantallaLibro.classList.add("activa");

        paginaActual = 0;

        actualizarLibro();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        if (!cartaAnimada) {

            escribirCarta();
            cartaAnimada = true;
        }

    }, 920);
}


/**
 * Regresa a la portada.
 */
function cerrarLibro() {

    pantallaLibro.classList.remove("activa");
    pantallaPortada.classList.add("activa");

    libroCerrado.classList.remove("abriendo");
    botonAbrir.classList.remove("oculto");

    paginaActual = 0;

    actualizarLibro();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/**
 * Muestra la página seleccionada.
 */
function actualizarLibro() {

    paginas.forEach(function (pagina, indice) {

        pagina.classList.toggle(
            "activa",
            indice === paginaActual
        );
    });

    contadorPagina.textContent =
        `${paginaActual + 1} / ${paginas.length}`;

    botonAnterior.disabled =
        paginaActual === 0;

    botonSiguiente.disabled =
        paginaActual === paginas.length - 1;

    actualizarTema();
    actualizarIndicadores();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/**
 * Cambia los colores según el capítulo.
 */
function actualizarTema() {

    temas.forEach(function (tema) {

        zonaLibro.classList.remove(tema);
    });

    const paginaActiva = paginas[paginaActual];

    const temaActual =
        paginaActiva.dataset.tema || "tema-carta";

    zonaLibro.classList.add(temaActual);
}


/**
 * Crea los puntos inferiores.
 */
function crearIndicadores() {

    paginas.forEach(function (_, indice) {

        const indicador = document.createElement(
            "button"
        );

        indicador.type = "button";

        indicador.classList.add("indicador");

        indicador.setAttribute(
            "aria-label",
            `Ir a la página ${indice + 1}`
        );

        indicador.addEventListener(
            "click",
            function () {

                paginaActual = indice;

                actualizarLibro();
            }
        );

        contenedorIndicadores.appendChild(
            indicador
        );
    });
}


/**
 * Marca el punto correspondiente.
 */
function actualizarIndicadores() {

    const indicadores =
        document.querySelectorAll(".indicador");

    indicadores.forEach(function (
        indicador,
        indice
    ) {

        indicador.classList.toggle(
            "activo",
            indice === paginaActual
        );
    });
}


/**
 * Escribe el título de la carta.
 */
function escribirCarta() {

    const texto = "Para ti Nandini.";

    tituloCarta.textContent = "";
    corazonCarta.textContent = "";

    let indice = 0;

    const intervalo = setInterval(function () {

        tituloCarta.textContent +=
            texto.charAt(indice);

        indice++;

        if (indice >= texto.length) {

            clearInterval(intervalo);

            setTimeout(function () {

                corazonCarta.textContent = "♡";

            }, 420);
        }

    }, 115);
}


/**
 * Reproduce o pausa la canción.
 */
async function alternarMusica() {

    if (audio.paused) {

        try {

            await audio.play();

            iconoMusica.textContent = "⏸";

            textoMusica.textContent =
                "Pausar la cancioncita";

            ondas.classList.add(
                "reproduciendo"
            );

        } catch (error) {

            textoMusica.textContent =
                "No pude reproducir la canción";

            console.error(
                "Error al reproducir el audio:",
                error
            );
        }

    } else {

        audio.pause();

        iconoMusica.textContent = "▶";

        textoMusica.textContent =
            "Una cancioncita para ti ♡";

        ondas.classList.remove(
            "reproduciendo"
        );
    }
}


/**
 * Comprueba si alguna imagen no carga.
 */
function comprobarImagenes() {

    const imagenes = document.querySelectorAll(
        "img"
    );

    imagenes.forEach(function (imagen) {

        imagen.addEventListener(
            "error",
            function () {

                console.warn(
                    `No se encontró: ${imagen.src}`
                );

                imagen.classList.add(
                    "imagen-no-encontrada"
                );
            }
        );
    });
}


// Abrir libro
botonAbrir.addEventListener(
    "click",
    abrirLibro
);


// Cerrar libro
botonCerrar.addEventListener(
    "click",
    cerrarLibro
);


// Página anterior
botonAnterior.addEventListener(
    "click",
    function () {

        if (paginaActual > 0) {

            paginaActual--;

            actualizarLibro();
        }
    }
);


// Página siguiente
botonSiguiente.addEventListener(
    "click",
    function () {

        if (
            paginaActual <
            paginas.length - 1
        ) {

            paginaActual++;

            actualizarLibro();
        }
    }
);


// Música
botonMusica.addEventListener(
    "click",
    alternarMusica
);


// Teclado
document.addEventListener(
    "keydown",
    function (evento) {

        if (
            !pantallaLibro.classList.contains(
                "activa"
            )
        ) {
            return;
        }

        if (
            evento.key === "ArrowRight" &&
            paginaActual < paginas.length - 1
        ) {

            paginaActual++;

            actualizarLibro();
        }

        if (
            evento.key === "ArrowLeft" &&
            paginaActual > 0
        ) {

            paginaActual--;

            actualizarLibro();
        }

        if (evento.key === "Escape") {

            cerrarLibro();
        }
    }
);


// Si la canción termina por algún motivo
audio.addEventListener(
    "pause",
    function () {

        if (audio.currentTime === 0) {
            return;
        }

        iconoMusica.textContent = "▶";

        textoMusica.textContent =
            "Una cancioncita para ti ♡";

        ondas.classList.remove(
            "reproduciendo"
        );
    }
);


// Inicialización
crearIndicadores();
comprobarImagenes();
actualizarLibro();