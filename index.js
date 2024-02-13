// Array para almacenar el pedido del usuario
let pedido = [];

// Función para mostrar el menú en la interfaz gráfica
const mostrarMenu = () => {
    const menuDiv = document.getElementById('menu');
    menuDiv.innerHTML = '<h2>Menú</h2><ul>';

    for(let producto of productos) {
        menuDiv.innerHTML += `<li>${producto.codigo} - ${producto.nombre} - $${producto.costo}</li>`;
    }

    menuDiv.innerHTML += '</ul>';
}

// Función para pedir un producto y agregarlo al pedido
const pedirProducto = () => {
    const codigoProducto = prompt("Ingrese el código del producto que desea pedir:");

    // Buscar el producto por su código en el array de productos
    const productoEncontrado = productos.find(producto => producto.codigo === codigoProducto);

    if(productoEncontrado) {
        pedido.push(productoEncontrado);
        alert(`Producto ${productoEncontrado.nombre} agregado al pedido.`);
    } else {
        alert("Producto no encontrado en el menú.");
    }
}

// Función para ver el pedido actual
const verPedido = () => {
    const pedidoDiv = document.getElementById('pedido');
    pedidoDiv.innerHTML = '<h2>Pedido Actual</h2><ul>';

    for(let producto of pedido) {
        pedidoDiv.innerHTML += `<li>${producto.codigo} - ${producto.nombre} - $${producto.costo}</li>`;
    }

    pedidoDiv.innerHTML += '</ul>';
}

// Función para finalizar el pedido
const finalizarPedido = () => {
    if (pedido.length === 0) {
        alert('El pedido está vacío. No se puede finalizar.');
        return;
    }

    calcularCosto();
    document.getElementById('pedido').innerHTML = '<h2>Pedido Actual</h2><p>El pedido ha sido finalizado.</p>';
}

//* Función para pagar el pedido
const pagarPedido = () => {
    if (pedido.length === 0) {
        alert('El pedido está vacío. No se puede pagar.');
        return;
    }

    let total = calcularCosto();

    let montoEntregado = prompt(`El total a pagar es: $${total}. Ingrese el monto entregado:`);
    montoEntregado = parseFloat(montoEntregado);

    if (isNaN(montoEntregado) || montoEntregado < total) {
        alert('Monto inválido. El pago no se ha realizado.');
    } else {
        let cambio = montoEntregado - total;
        alert(`Gracias por su pago. Su cambio es: $${cambio.toFixed(2)}`);
        // Limpiar el pedido y el mensaje
        pedido = [];
        document.getElementById('pedido').innerHTML = '';
    }
}

// Función para calcular el costo total del pedido
const calcularCosto = () => {
    let costo = 0;
    for (let producto of pedido) {
        costo += producto.costo;
    }
    return costo;
}