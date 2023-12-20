const url = 'https://raw.githubusercontent.com/EveRania/JSON/main/pilates.json';
const file = '../data/productos.json';
const containerProducts = document.getElementById('container-products');
const modal = document.getElementById('ventana-modal');
const carrito = document.getElementById('carrito');
const totalCarrito = document.getElementById('total');
const btnClose = document.getElementsByClassName('close')[0];
const containerCart = document.querySelector('.modal-body');
const iconMenu = document.getElementById('icon-menu');
const contenedorProductos = document.querySelector('.contenedor-carrito');
const cantidadProductos = document.querySelector('.count-products');
const finalizarCompra = document.querySelector('#finalizar-compra');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
let productosCarrito = [];

cargarEventos();

function cargarEventos() {
    iconMenu.addEventListener('click', showMenu);

    document.addEventListener('DOMContentLoaded', () => {
        renderizarProductos();
        cargarCarritoLocalStorage();
        mostrarProductosCarrito();
    });

    containerProducts.addEventListener('click', agregarProducto);
    containerCart.addEventListener('click', eliminarProducto);
    finalizarCompra.addEventListener('click', compraFinalizada);
    vaciarCarrito.addEventListener('click', limpiarCarrito);

    carrito.onclick = function () {
        modal.style.display = 'block';
    };

    btnClose.onclick = function () {
        ocultarModal();
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            ocultarModal();
        }
    };
}