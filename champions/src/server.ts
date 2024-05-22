import createApp from "./app";

const app = createApp();
const port = process.env.PORT;
const address = `http://localhost:${port}`;

app.listen(port, () => {
        console.log(`Server running on: ${address}`)
    }
);
