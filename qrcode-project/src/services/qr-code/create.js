import prompt from "prompt";
import promptQRCode from "../../prompts/prompt-qrcode.js"
import handler from "./handler.js";

export async function createQRCode() {
    prompt.get(promptQRCode, handler);

    prompt.start();
}