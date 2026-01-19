const url = 'https://raw.githubusercontent.com/EveRania/JSON/main/pilates.json';
const file = "../data/productos.json";
const containerProducts = document.getElementById('container-products');
const modal = document.getElementById('ventana-modal');
const carrito = document.getElementById('carrito');
const totalCarrito = document.getElementById('total');
const btnClose = document.getElementsByClassName('close')[0];
const containerCart = document.querySelector('.modal-body');
const iconMenu = document.getElementById('icon-menu');
const finalizarCompra = document.querySelector('#finalizar-compra');
const vaciarCarrito = document.querySelector('#vaciar-carrito');


cargarEventos();

function cargarEventos() {
    // iconMenu.addEventListener('click', showMenu);
    if (iconMenu) {
        iconMenu.addEventListener('click', showMenu);
    }

    document.addEventListener('DOMContentLoaded', () => {
        try {
            renderizarProductos();
            const params = new URLSearchParams(window.location.search);
            const openCart = params.get("openCart");

            if (openCart === "true" && typeof refrescarCarrito === "function") {
                refrescarCarrito();
                if (modal) {
                    modal.style.display = "block";
                }
                window.history.replaceState(
                    {},
                    document.title,
                    window.location.pathname
                );
            }

        } catch (error) {
            console.error("Error en inicialización del index:", error);
        }

    });

    if (containerProducts) {
        containerProducts.addEventListener('click', agregarProducto);
    }

    if (containerCart) {
        containerCart.addEventListener('click', eliminarProducto);
    }

    if (finalizarCompra) {
        finalizarCompra.addEventListener('click', compraFinalizada);
    }

    if (vaciarCarrito) {
        vaciarCarrito.addEventListener('click', limpiarCarrito);
    }


    if (carrito) {
        carrito.onclick = () => {
            if (modal) {
                if (typeof refrescarCarrito === "function") {
                    refrescarCarrito();   // ✅ siempre recarga el contenido
                }
                modal.style.display = 'block';
            } else {
                window.location.href = "../index.html?openCart=true";
            }
        };
    }

    if (btnClose) {
        btnClose.onclick = ocultarModal;
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            ocultarModal();
        }
    };
}