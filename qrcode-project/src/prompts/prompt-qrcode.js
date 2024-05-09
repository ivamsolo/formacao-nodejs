import chalk from "chalk";

const promptQRCode = [
    {
        name: "link",
        description: chalk.yellow("Digite o link para gerar o qr code."),
    },
    {
        name: "type",
        description: chalk.yellow("Escolha entre o tipo 1 - Normal ou 2 - Terminal."),
        pattern: /^[1-2]+$/,
        message: chalk.red.italic("Escolha apenas entre 1 e 2."),
        required: true,
    }
];

export default promptQRCode;