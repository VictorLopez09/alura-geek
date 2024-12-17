// Selección del formulario y la lista de productos
const form = document.getElementById('addproduct-form');
const productList = document.getElementById('product-list');

// Función para cargar productos desde el LocalStorage
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.forEach(product => renderProduct(product.name, product.price, product.imageUrl));
}

// Función para guardar productos en el LocalStorage
function saveProductsToLocalStorage(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// Función para renderizar un producto en el DOM
function renderProduct(name, price, imageUrl) {
    const newProduct = document.createElement('div');
    newProduct.classList.add('product__card');
    newProduct.innerHTML = `
        <img src="${imageUrl}" alt="${name}" class="product__card--img">
        <div class="product__card-data">
            <h3 class="product__name">${name}</h3>
            <div class="product__card-details">
                <p class="product__card-price">$${parseFloat(price).toFixed(2)}</p>
                <button class="product__card-delete">
                    <img src="img/trash.svg" alt="Eliminar producto">
                </button>
            </div>
        </div>
    `;

    // Agregar evento para borrar el producto
    newProduct.querySelector('.product__card-delete').addEventListener('click', () => {
        deleteProduct(name);
        newProduct.remove(); // Eliminar del DOM
    });

    // Agregar el producto a la lista
    productList.appendChild(newProduct);
}

// Función para eliminar un producto del LocalStorage
function deleteProduct(nameToDelete) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const updatedProducts = products.filter(product => product.name !== nameToDelete);
    saveProductsToLocalStorage(updatedProducts); // Actualizar LocalStorage
}

// Escuchar el evento de envío del formulario
form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Obtener los valores del formulario
    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;
    const imageUrl = document.getElementById('product-image-url').value;

    // Validación simple
    if (!name || !price || !imageUrl) {
        alert('Por favor, completa todos los campos');
        return;
    }

    // Guardar en LocalStorage
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.push({ name, price, imageUrl });
    saveProductsToLocalStorage(products);

    // Renderizar en la lista de productos
    renderProduct(name, price, imageUrl);

    // Resetear el formulario
    form.reset();
});

// Cargar productos guardados al cargar la página
document.addEventListener('DOMContentLoaded', loadProducts);
