import * as http from "http";
import { app } from "./app";

const server = http.createServer(app);

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})
