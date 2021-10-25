import express from "express";
import uniqid from "uniqid";
import createError from "http-errors"
import multer from "multer";
import {readProducts, writeProducts} from "../lib/fs-tools.js"


const productsRouter = express.Router()

// GET all products
productsRouter.get("/", async(req, res, next) => {
        try {
            const products = await readProducts()
            res.status(200).send(products)
        } catch (error) {
            next(error)
        }
})





export default productsRouter