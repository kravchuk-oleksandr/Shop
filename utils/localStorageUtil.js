document.addEventListener('DOMContentLoaded', () => {
    const storedCatalog = localStorage.getItem('catalog');
    catalog = storedCatalog ? JSON.parse(storedCatalog) : [];
    updateProducts();
});

function updateProducts() {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';

    catalog.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img class="product-img" src="${product.img}" alt="${product.brand} ${product.model}">
            <p>${product.brand} ${product.model}</p>
           <p class="product-price">Ціна: ${product.price}₴</p>

            <button onclick="deleteProduct('${product.id}')">Видалити</button>
            <button onclick="openEditModal('${product.id}')">Редагувати</button>
        `;
        productsContainer.appendChild(productCard);
    });

    localStorage.setItem('catalog', JSON.stringify(catalog));
    calculateTotalPrice();
}