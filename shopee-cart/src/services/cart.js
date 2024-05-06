async function addItem(userCart, item) {
    // Check if the item is already in the cart
    const indexFound = userCart.findIndex(function (i) {return i.name === item.name});

    // If the item was found..
    if(indexFound > -1) {
        // ... do nothing
        increaseItem(userCart, indexFound)
        return 0;
    } else {
        userCart.push(item); // If not, add it to cart
        return item.productId;
    }
};

async function deleteItem(userCart, index) {    
    if(index >= 0 && index < userCart.length) {
        const item_name = userCart[index].name;
        userCart.splice(index, 1);

        console.log(`[${item_name}] deleted from the cart.`)
    } else {
        console.log("Item out of range.")
    }
};

async function increaseItem(userCart, index) {
    userCart[index].quantity += 1;
}

async function decreaseItem(userCart, index) {    
    if(index >= 0 && index < userCart.length) {
        const item_name = userCart[index].name;
        userCart[index].quantity -= 1;
        if(userCart[index].quantity <= 0) {
            await deleteItem(userCart, index);
            return;
        };
        console.log(`1 unit of [${item_name}] removed from the cart.`)
    } else {
        console.log("Item out of range.")
    }
};

async function displayCart(userCart) {
    userCart.forEach((item, index) => {
        console.log(`${index + 1}. ${item.name} - $ ${item.price} | ${item.quantity}x | Subtotal: $ ${item.subtotal().toFixed(2)}`);
    });
}

async function calculateTotal(userCart) {
    const result = userCart.reduce((total, item) => {
        return total + item.subtotal();
    }, 0)

    console.log(`\nTOTAL: $ ${result.toFixed(2)}`);
};

export {
    addItem,
    deleteItem,
    increaseItem,
    decreaseItem,
    calculateTotal,
    displayCart,
}
