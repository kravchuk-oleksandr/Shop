function sortProducts(order) {
    if (order === 'asc') {
        catalog.sort((a, b) => a.price - b.price);
    } else if (order === 'desc') {
        catalog.sort((a, b) => b.price - a.price);
    }
    updateProducts();
}