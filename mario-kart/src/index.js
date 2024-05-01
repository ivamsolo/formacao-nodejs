const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

let userInput;
let player1;
let player2;
const characters = [
    { name: "Mario", speed: 4, agility: 3, power: 3, score: 0, },
    { name: "Luigi", speed: 3, agility: 4, power: 3, score: 0, },
    { name: "Peach", speed: 3, agility: 5, power: 2, score: 0, },
    { name: "Bowser", speed: 4, agility: 2, power: 5, score: 0, },
]

let welcome = "Let's play Mario Kart 🏁\n\nChoose your character to start:\n\n";

characters.forEach(character => {
    welcome += `${character.name} (speed: ${character.speed}, agility: ${character.agility}, power: ${character.power})\n`
})

function selectCharacter(input) {
    for(let id = 0; id <= characters.length - 1;id++) {
        let validCharacterName = characters[id].name.toLowerCase();
        if (input == validCharacterName) {
            player1 = characters[id];
            characters.splice(id, 1);
            return 0
        }
    }
    return true
}

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random();

    let result;

    switch (true) {
        case random < 0.33:
            result = "STRAIGHT"
            break;
        case random < 0.66:
            result = "TURN"
            break;
        default:
            result = "BATTLE"
    }
    return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolled a dice in ${block}: ${diceResult} + ${attribute} = ${diceResult + attribute}`)
}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Round ${round}\n`);

        let block = await getRandomBlock();
        console.log(`Block: ${block}`)        

        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if(block == "STRAIGHT") {
            totalTestSkill1 = diceResult1 + character1.speed;
            totalTestSkill2 = diceResult2 + character2.speed;

            await logRollResult(character1.name, "speed", diceResult1, character1.speed);    
            await logRollResult(character2.name, "speed", diceResult2, character2.speed);    
        };
        if(block == "TURN") {
            totalTestSkill1 = diceResult1 + character1.agility;
            totalTestSkill2 = diceResult2 + character2.agility;

            await logRollResult(character1.name, "agility", diceResult1, character1.agility);    
            await logRollResult(character2.name, "agility", diceResult2, character2.agility);   
        };
        if(block == "BATTLE") {
            totalTestSkill1 = diceResult1 + character1.power;
            totalTestSkill2 = diceResult2 + character2.power;

            console.log(`${character1.name} confronts ${character2.name}!`)

            await logRollResult(character1.name, "power", diceResult1, character1.power);    
            await logRollResult(character2.name, "power", diceResult2, character2.power);

            if(totalTestSkill1 > totalTestSkill2) {
                let message = `${character1.name} won the confront! `;
                if(character2.score) {
                    character2.score--;
                    message += `${character2.name} lost 1 point.`;
                }
                console.log(message);
            }

            if(totalTestSkill1 < totalTestSkill2) {
                let message = `${character2.name} won the confront! `;
                if(character1.score) {
                    character1.score--;
                    message += `${character1.name} lost 1 point.`;
                }
                console.log(message);
            }

            console.log(totalTestSkill1 === totalTestSkill2 ? "Drawn match! No points were lost.\n" : "");
        };

        if(totalTestSkill1 > totalTestSkill2) {
            console.log(`${character1.name} scored 1 point!\n`);
            character1.score++;
        } else if(totalTestSkill1 < totalTestSkill2) {
            console.log(`${character2.name} scored 1 point!\n`);
            character2.score++;
        } else {
            console.log(`Nobody scores.\n`);
        };

        try {
            userInput = await prompt("Press Enter to continue...");        
        } catch (e) {
            console.error("Unable to prompt", e);
        }
        console.log("-----------------------------");
    }
}

async function declareWinner(character1, character2) {
    console.log("Final result:")
    console.log(`${character1.name}: ${character1.score} point(s).`);
    console.log(`${character2.name}: ${character2.score} point(s).`);

    if(character1.score > character2.score)
        console.log(`\n${character1.name} won the race! Congrats! 🏆`)
    else if(character1.score < character2.score)
        console.log(`\n${character2.name} won the race! Congrats! 🏆`)
    else
        console.log(`\nThe race ended in a draw`)
}

console.log(welcome);

// Usage inside aync function do not need closure demo only
(async() => {
    try {
        do {
            userInput = await prompt(">> ");
            userInput = userInput.trim().toLowerCase();
        } while (selectCharacter(userInput));
    } catch (e) {
        console.error("Unable to prompt", e);
    }

    let randomCharacterID = Math.floor(Math.random() * characters.length);
    player2 = characters[randomCharacterID];

    console.log(`🏁🚨 ${player1.name} VS ${player2.name}`);

    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);

    rl.close();    
})();

// When done reading prompt, exit program 
rl.on('close', () => process.exit(0));