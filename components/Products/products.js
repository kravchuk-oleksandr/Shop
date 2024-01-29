let editingProductId = null;
let catalog = [];

function convertImageToBase64(file, callback) {
    const reader = new FileReader();
    reader.onload = function (e) {
        callback(e.target.result);
    };
    reader.readAsDataURL(file);
}

function addProduct() {
    const brand = document.getElementById('brandInput').value;
    const model = document.getElementById('modelInput').value;
    const imgInput = document.getElementById('imgInput');
    const price = parseInt(document.getElementById('priceInput').value);

    if (brand && model && !isNaN(price)) {
        let img;
        if (imgInput.files.length > 0) {
            const file = imgInput.files[0];
            convertImageToBase64(file, (base64) => {
                img = base64;
                if (editingProductId) {
                    const editedProductIndex = catalog.findIndex(product => product.id === editingProductId);
                    if (editedProductIndex !== -1) {
                        catalog[editedProductIndex] = {
                            id: editingProductId,
                            brand,
                            model,
                            img,
                            price,
                        };
                    }
                    closeFormModal();
                    editingProductId = null;
                } else {
                    const newProduct = {
                        id: `id${catalog.length + 1}`,
                        brand,
                        model,
                        img,
                        price,
                    };
                    catalog.push(newProduct);
                    closeFormModal();
                }
                updateProducts();
            });
        } else {
            img = window.location.origin + "/img/default.png";
            if (editingProductId) {
                const editedProductIndex = catalog.findIndex(product => product.id === editingProductId);
                if (editedProductIndex !== -1) {
                    catalog[editedProductIndex] = {
                        id: editingProductId,
                        brand,
                        model,
                        img: catalog[editedProductIndex].img,
                        price,
                    };
                }
                closeFormModal();
                editingProductId = null;
            } else {
                const newProduct = {
                    id: `id${catalog.length + 1}`,
                    brand,
                    model,
                    img,
                    price,
                };
                catalog.push(newProduct);
                closeFormModal();
            }
            updateProducts();
        }
    } else {
        alert('Будь ласка, заповніть всі поля правильними значеннями.');
    }
}

function deleteProduct(productId) {
    catalog = catalog.filter(product => product.id !== productId);
    updateProducts();
}

function openEditModal(productId) {
    editingProductId = productId;
    const productToEdit = catalog.find(product => product.id === productId);
    if (productToEdit) {
        document.getElementById('form-title').innerText = 'Редагувати товар';

        document.getElementById('brandInput').value = productToEdit.brand;
        document.getElementById('modelInput').value = productToEdit.model;
        document.getElementById('imgInput').value = '';
        document.getElementById('priceInput').value = productToEdit.price;
        
        document.getElementById('saveChangesBtn').innerText = 'Зберегти зміни';
        document.getElementById('form-modal').style.display = 'flex';
    }
}

function openFormModal() {
    editingProductId = null;
    document.getElementById('form-title').innerText = 'Додати новий товар';

    document.getElementById('brandInput').value = '';
    document.getElementById('modelInput').value = '';
    document.getElementById('imgInput').value = '';
    document.getElementById('priceInput').value = '';

    document.getElementById('saveChangesBtn').innerText = 'Додати товар';
    document.getElementById('form-modal').style.display = 'flex';
}

function closeFormModal() {
    document.getElementById('form-modal').style.display = 'none';
}

function calculateTotalPrice() {
    const totalPriceElement = document.getElementById('total-price');
    const totalPrice = catalog.reduce((total, product) => total + product.price, 0);
    totalPriceElement.innerText = totalPrice.toFixed(2);
}
