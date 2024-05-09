import chalk from "chalk";
import handler from "./handler.js";

async function createPassword() {
    const password = await handler();
    console.log(chalk.green("password: ", password))
};

export default createPassword;