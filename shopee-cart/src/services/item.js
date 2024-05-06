async function createItem(product) {
    return {
        name: product.name,
        price: product.price,
        productId: product.id,
        quantity: 1,
        subtotal: function() {return this.price * this.quantity},
    }
}

export default createItem;