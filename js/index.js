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

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    width: 300,
    color: 'whitesmoke',
    timer: 1000,
    timerProgressBar: true,
});


class Producto {
    constructor(imagen, nombre, precio, descripcion, id, aclaracion) {
        this.imagen = imagen;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.id = id;
        this.aclaracion = aclaracion;
        this.cantidad = 1;
        this.subtotal = 0;
    }

    obtenerTotal() {
        this.subtotal = this.precio * this.cantidad;
    }
}

cargarEventos();

function cargarEventos() {
    iconMenu.addEventListener('click', showMenu);

    document.addEventListener('DOMContentLoaded', () => {
        renderizarProductos();
        // productosCarrito = JSON.parse(localStorage.getItem('productosLS')) || [];
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

function ocultarModal() {
    modal.style.display = 'none';
}

function cargarCarritoLocalStorage() {
    productosCarrito = JSON.parse(localStorage.getItem('productosLS')) || [];
}

function compraFinalizada() {
    Swal.fire({
        icon: 'success',
        title: 'Compra finalizada',
        text: '¡Su compra se realizó con exito!',
        timerProgressBar: true,
        timer: 5000,
    });

    eliminarCarritoLS();
    cargarCarritoLocalStorage();
    mostrarProductosCarrito();
    ocultarModal();
}

function limpiarCarrito() {

    Swal.fire({
        title: 'Limpiar carrito',
        text: '¿Confirma que desea vaciar el carrito de compras?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
    }).then((btnResponse) => {
        if (btnResponse.isConfirmed) {
            Swal.fire({
                title: 'Vaciando Carrito',
                icon: 'success',
                text: 'Su carrito de compras fue vaciado con exito.',
                timerProgressBar: true,
                timer: 5000,
            });
            eliminarCarritoLS();
            cargarCarritoLocalStorage();
            mostrarProductosCarrito();
            ocultarModal();
        } else {
            Swal.fire({
                title: 'Operación cancelada',
                icon: 'info',
                text: '¡La operación de vaciar el carrito de compras fue cancelada!',
                timerProgressBar: true,
                timer: 5000,
            });
        }
    });
}

function eliminarCarritoLS() {
    localStorage.removeItem('productosLS');
}

function eliminarProducto(e) {
    if (e.target.classList.contains('eliminar-producto')) {
        const productoId = parseInt(e.target.getAttribute('id'));
        productosCarrito = productosCarrito.filter((producto) => producto.id !== productoId);
        guardarProductosLocalStorage();
        mostrarProductosCarrito();
    }
}

function agregarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const productoAgregado = e.target.parentElement;
        alertProducto('success', 'producto agregado', '#619b8a');
        leerDatosProducto(productoAgregado);
    }
}

function alertProducto(icono, titulo, colorFondo) {
    Toast.fire({
        icon: icono, 
        title: titulo, 
        background: colorFondo, 
    });
}

function leerDatosProducto(producto) {
    const datosProducto = new Producto(
        producto.querySelector('img').src,
        producto.querySelector('h4').textContent,
        Number(producto.querySelector('h5').textContent.replace('$', '')),
        producto.querySelector('h6').textContent,
        parseInt(producto.querySelector('a').getAttribute('id')),
        producto.querySelector('p').textContent,
    );

    datosProducto.obtenerTotal();

    agregarAlCarrito(datosProducto);
}

function agregarAlCarrito(productoAgregar) {

    const existeEnCarrito = productosCarrito.some((producto) => producto.id === productoAgregar.id);

    if (existeEnCarrito) {
        const productos = productosCarrito.map((producto) => {
            if (producto.id === productoAgregar.id) {
                producto.cantidad++;
                producto.subtotal = producto.precio * producto.cantidad;
                return producto;
            } else {
                return producto;
            }
        });
        productosCarrito = productos;
    } else {
        productosCarrito.push(productoAgregar);

    }
    guardarProductosLocalStorage();
    mostrarProductosCarrito();
}

function mostrarProductosCarrito() {
    limpiarHTML();

    productosCarrito.forEach((producto) => {
        const { imagen, nombre, precio, cantidad, subtotal, id } = producto;

        const div = document.createElement('div');
        div.classList.add('contenedor-producto');
        div.innerHTML = `
             <img src="${imagen}" width="100">
            <p>${nombre}</p>
            <p>$${precio}</p>
            <p>${cantidad}</p>
            <p>$${subtotal}</p>
            <a href="#" class= "eliminar-producto" id="${id}"> X </a>
         `;

        containerCart.appendChild(div);
    });

    mostrarCantidadProductos();
    calcularTotal();
}

function mostrarCantidadProductos() {
    let contarProductos;

    if (productosCarrito.length > 0) {
        contenedorProductos.style.display = 'flex';
        contenedorProductos.style.alignItems = 'center';
        cantidadProductos.style.display = 'flex';
        contarProductos = productosCarrito.reduce((cantidad, producto) => cantidad + producto.cantidad, 0);
        cantidadProductos.innerText = `${contarProductos}`;
    } else {
        contenedorProductos.style.display = 'block';
        cantidadProductos.style.display = 'none';
    }
}

function calcularTotal() {
    let total = productosCarrito.reduce((sumaTotal, producto) => sumaTotal + producto.subtotal, 0);

    totalCarrito.innerHTML = `Total a pagar $ ${total}`;
}

function limpiarHTML() {
    while (containerCart.firstChild) {
        containerCart.removeChild(containerCart.firstChild);
    }
}

function guardarProductosLocalStorage() {
    localStorage.setItem('productosLS', JSON.stringify(productosCarrito));
}

async function realizarPeticion(datos) {
    try {
        const response = await fetch(datos);
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    } finally {
    }
}

async function renderizarProductos() {
    const productos = await realizarPeticion(file);
    recorrerArray(productos);
}

function recorrerArray(arregloProductos) {
    arregloProductos.forEach((producto) => {
        const divCard = document.createElement('div');
        divCard.classList.add('card');
        divCard.innerHTML = `
                                <img src="./img/${producto.img}" alt="${producto.nombre}" />
                                <h4>${producto.nombre}</h4>
                                <h5>$${producto.precio}</h5>
                                <p>${producto.descripcion}</p>
                                <a id="${producto.id}" class="boton agregar-carrito" href="#">Nueva suscripción</a>
                                <h6>${producto.aclaracion}</h6>
                            `;

        containerProducts.appendChild(divCard);
    });
};

function showMenu() {
    let navBar = document.getElementById('navigation-bar');


    if (navBar.className === 'navigation-bar') {
        navBar.className += ' responsive';
    } else {
        navBar.className = 'navigation-bar';
    }
}