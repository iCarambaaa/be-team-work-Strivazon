import express from 'express';
import listEndpoints from "express-list-endpoints";
import productsRouter from "./services/products.js";
<<<<<<< Updated upstream
import reviewsRouter from "./services/posts/index.js";
import { genericErrorHandler, badRequestHandler, unauthorizedHandler, notFoundHandler } from "./errorHandlers.js"
=======
import reviewsRouter from "./services/reviews.js";
>>>>>>> Stashed changes
import cors from "cors";

const server = express();

server.use(cors());
server.use(express.json())


// ************************ ENDPOINTS **********************
server.use("/products", productsRouter)
<<<<<<< Updated upstream
server.use("/reviews", reviewsRouter)
=======
 server.use("/reviews", reviewsRouter)
>>>>>>> Stashed changes

// *********************** ERROR MIDDLEWARES ***************************


server.use(badRequestHandler)
server.use(unauthorizedHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)

const port = 3001

console.table(listEndpoints(server))

server.listen(port, () => console.log("listening on port:", port))

server.on('error', (err) => console.log(err))