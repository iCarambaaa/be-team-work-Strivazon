import express from 'express';
import listEndpoints from "express-list-endpoints";
import productsRouter from "./services/products.js";
//import reviewsRouter from "./services/posts/index.js";
import cors from "cors";

const server = express();

server.use(cors());
server.use(express.json())


// ************************ ENDPOINTS **********************
server.use("/products", productsRouter)
// server.use("/reviews", reviewsRouter)

// *********************** ERROR MIDDLEWARES ***************************

const port = 3001

console.table(listEndpoints(server))

server.listen(port, () => console.log("listening on port:", port))

server.on('error', (err) => console.log(err))