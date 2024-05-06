
async function createProduct(stock, name, price, availableUnits = 10) {
    const product = {
        id: stock.length + 1,
        name,
        price,
        availableUnits,
        updateStock: function(action, value) {
            if(action === "add") {
                this.availableUnits += value;
                return
            }
            if(action === "remove" && this.availableUnits > 0) {
                this.availableUnits -= value;
                if(this.availableUnits < 0) this.availableUnits = 0;
                return
            }
        }
    };
    stock.push(product);
}

export async function searchProductById(stock, id) {
    const index = stock.findIndex(product => product.id === id);
    return stock[index];
}

export async function displayProducts(stock) {
    stock.forEach((item, index) => {
        console.log(`${index + 1}. ${item.name} - R$ ${item.price} | ${item.availableUnits} unit(s) available(s)`);
    });
}

export async function getSample() {
    const products = [];
    await createProduct(products,"Bluetooth headphones",50);
    await createProduct(products,"Organic coffee beans",12);
    await createProduct(products,"Yoga mat",20);
    await createProduct(products,"Smartphone case",15);
    await createProduct(products,"Electric toothbrush",40);
    await createProduct(products,"Resistance bands",18);
    await createProduct(products,"Portable charger",30);
    await createProduct(products,"Non-stick frying pan",25);
    await createProduct(products,"LED desk lamp",35);
    await createProduct(products,"Essential oil diffuser",28);

    return products;
}

