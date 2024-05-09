import getCharacters from "./utilities/characters.js";

async function handler() {
    const characters = await getCharacters();
    const passwordLength = process.env.PASSWORD_LENGTH;
    let password = "";

    for (let i = 0; i < passwordLength; i++) {
        const index = Math.floor(Math.random() * characters.length);
        password += characters[index];
    }
    
    return password;
};

export default handler;