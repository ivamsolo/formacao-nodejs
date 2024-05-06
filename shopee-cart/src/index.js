import createItem from "./services/item.js";
import * as cartService from "./services/cart.js";
import * as p from "./services/product.js";
import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));
let userInput;

const products = await p.getSample();
const myCart = [];
const myWishlist = [];

let page = "home";
let pagePrevious = "";

async function getCommands() {
    let commands = "\n";
    if (page === "cart") {
        commands += "Type _increase {item number} to increase an item in cart.\n" +
            "Type _decrease {item number} to decrease an item in cart.\n";
    }
    if (page === "wishlist" || page == "store") {
        commands += "Type _add {item number} to add to cart.\n";
    }
    if (page === "cart" || page === "store") {
        commands += "Type _save {item number} to save to wishlist.\n";
    }
    if (page === "cart" || page === "wishlist") {
        commands += `Type _delete {item number} to delete from ${page}.\n`;
    }
    return commands;
}

async function getCart() {
    if (page === "cart") {
        return myCart;
    }
    if (page === "wishlist") {
        return myWishlist;
    }
    if (page === "store") {
        return products;
    }
}

(async () => {
    let currentCart = ""
    let running = true;
    let message = ""
    try {
        do {
            currentCart = await getCart();
            process.stdout.write('\x1Bc');
            console.clear();
            //console.log("PAGE: ", page, "\nPrevious: ", pagePrevious);
            console.log(page.toUpperCase());
            console.log("-----------------------");
            if (page === "home") {
                console.log("Welcome to Shopee\n");
                console.log(`You have ${myCart.length} item(s) in your cart.`);
                console.log("Type /cart to access it. \n");
                console.log(`You have ${myWishlist.length} item(s) in your wishlist.`);
                console.log("Type /wishlist to access it. \n");
                console.log("Type /store to see the products available. \n");
                console.log("At anytime type /quit to exit. \n");
            } else if (page === "cart") {
                if (myCart.length > 0) {
                    console.log("\nThese are the products in your cart.\n");
                    await cartService.displayCart(myCart);
                    await cartService.calculateTotal(myCart);
                    if (!message) {
                        console.log("\nType /help if you don't know what to do.");
                    }
                } else {
                    console.log("\nYour cart is empty.\nType /store to see the products available.\n");
                }
            } else if (page === "wishlist") {
                if (myCart.length > 0) {
                    console.log("\nThese are the products in your wishlist.\n");
                    cartService.displayCart(myWishlist);
                    if (!message) {
                        console.log("\nType /help if you don't know what to do.");
                    }
                } else {
                    console.log("\nYour wishlist is empty.\nType /store to see the products available.\n");
                }
            } else if (page === "store") {
                console.log("\nThese are the products available.\n");
                await p.displayProducts(products);
                if (!message) {
                    console.log("\nType /help if you don't know what to do.");
                }
            }

            if (message) console.log(message);
            message = ""

            userInput = await prompt(">> ");
            userInput = userInput.trim().toLowerCase();

            if (userInput[0] === "/") {
                switch (userInput) {
                    case "/home":
                    case "/h":
                        pagePrevious = page;
                        page = "home";
                        break;
                    case "/cart":
                    case "/c":
                        pagePrevious = page;
                        page = "cart";
                        break;
                    case "/wishlist":
                    case "/w":
                        pagePrevious = page;
                        page = "wishlist";
                        break;
                    case "/store":
                    case "/s":
                        pagePrevious = page;
                        page = "store";
                        break;
                    case "/back":
                    case "/b":
                        page = pagePrevious;
                        break;
                    case "/help":
                    case "/?":
                        message = await getCommands();
                        break;
                    case "/quit":
                    case "/q":
                        running = false;
                        break;
                    default:
                        break;
                }
            } else if (userInput[0] === "_") {
                try {
                    const command = userInput.split(" ");
                    const index = command[1] - 1;
                    let item = ""
                    if(index < currentCart.length) {
                        item = currentCart[index];
                    } else {
                        message = "\nItem not found.\n"
                    }
                    switch (command[0]) {
                        case "_add":
                            if (page === "wishlist") {
                                // Here 'item' means a item from myWishlist[]
                                if (cartService.addItem(myCart, item)) {
                                    products[item.productId - 1].updateStock("remove", 1);
                                    message = `\n[${item.name}] added to cart.\n`
                                } else {
                                    message = "\nItem already in cart.\n"
                                }

                            }
                            if (page === "store") {
                                // Here 'item' means a item from products[]
                                if (item.availableUnits > 0) {
                                    await cartService.addItem(myCart, await createItem(item));
                                    item.updateStock("remove", 1);
                                    message = `\n[${item.name}] added to cart.\n`
                                } else {
                                    message = "\nThere is no available units for this product.\n"
                                }
                            }
                            break;
                        case "_increase":
                        case "_inc":
                            if (page === "cart") {
                                let product = await p.searchProductById(products, myCart[index].productId);
                                if (product.availableUnits > 0) {
                                    cartService.increaseItem(myCart, index);
                                    product.updateStock("remove", 1);
                                } else {
                                    message = "\nYou’ve reached the maximum units allowed for purchase of this item\n";
                                }
                            }
                            break;
                        case "_decrease":
                        case "_dec":
                            if (page === "cart") {
                                let product = await p.searchProductById(products, myCart[index].productId);
                                product.updateStock("add", 1);
                                cartService.decreaseItem(myCart, index);
                            }
                            break;
                        case "_delete":
                        case "_del":
                            cartService.deleteItem(currentCart, index);
                            message = `${item.name} deleted from ${currentCart}.`
                            break;
                        case "_save":
                        case "_sv":
                            if (page === "cart") {
                                // Here 'item' means a item from myCart[]
                                cartService.addItem(myWishlist, item);
                                message = `\n[${item.name}] saved to wishlist.\n`
                            }
                            if (page === "store") {
                                // Here 'item' means a item from products[]
                                cartService.addItem(myWishlist, await createItem(item));
                                message = "\nProduct saved to wishlist.\n"
                            }
                            break;
                        case "_quit":
                            running = false;
                            break;
                        default:
                            message = "\nCommand invalid.\nType /help if you don't know what to do."
                            break;
                    }
                } catch(err) {
                    console.log(err);
                    //break;
                    if(!message) {
                        message = "\nCommand dd invalid.\nType /help if you don't know what to do."
                    }
                }            
            } else if (userInput[0]) {
                message = "\nCommand invalid.\nType /help if you don't know what to do."
            }

        } while (running);
    } catch (e) {
        console.error("Unable to prompt", e);
    }
    rl.close();
})();