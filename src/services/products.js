import express from "express";
import uniqid from "uniqid";
import createError from "http-errors"
import multer from "multer";
import {readProducts, writeProducts, saveProductPicture,readReviews} from "../lib/fs-tools.js"


const productsRouter = express.Router()

// Get all reviews of specific product
productsRouter.get("/:id/reviews", async(req, res, next)=>{
    try {
        const products = await readProducts()
        const singleProduct = products.find(product => product.id === req.params.id)

        if(singleProduct){
            
            const reviews = await readReviews()
            const specificRevies = reviews.filter(r => r.productId === req.params.id)
            
            if (reviews) {
                res.send(specificRevies)

            } else {
                res.send("nada")
            }
             
        }else{
            next(createError(404, `This product id: ${req.params.id} was not find`))
        }

    } catch (error) {
        next(error)
    }
})

// GET all products
productsRouter.get("/", async(req, res, next) => {
        try {
            const products = await readProducts()
            res.status(200).send(products)
        } catch (error) {
            next(error)
        }
})

// GET individual product
productsRouter.get("/:id", async(req, res, next) => {
    try {
        const products = await readProducts()

        const singleProduct = products.find(product => product.id === req.params.id)

        if (singleProduct) {
            res.status(200).send(singleProduct)
        } else {
            next(createError(404, `product with id ${req.params.id} not found`))
        }

    } catch (error) {
        next(error)
    }
})


// POST product

productsRouter.post("/", async(req, res, next) => {
    try {
        const products = await readProducts()

        const newProduct = {...req.body, id: uniqid(), createdAt: new Date()}

        products.push(newProduct)

        await writeProducts(products)
      
        res.status(201).send(newProduct.id)

    } catch (error) {
        next(error)
    }
})

// DELETE 

productsRouter.delete("/:id", async(req, res, next) => {

 try {
        const products = await readProducts()

        const remainingProducts = products.filter(product => product.id !== req.params.id)

        writeProducts(remainingProducts)

        res.status(200).send(`product with id ${req.params.id} deleted successfully`)

    } catch (error) {
        next(error)
    }

})

//PUT

productsRouter.put("/:id", async(req, res, next)=> {
    try {
        const products = await readProducts()

        const singleProductIndex = products.findIndex(index => index.id === req.params.id)

        const singleProduct = products[singleProductIndex] 

        const updatedProduct = {...singleProduct, ...req.body, updatedAt: new Date()} 

        products[singleProductIndex] = updatedProduct

        writeProducts(products)

        res.status(200).send(`product with id ${req.params.id} updated successfully`)

    } catch (error) {
        next(error)
    }

})


// POST Picture

productsRouter.post("/:id/uploadSingle", multer().single("productPicture") , async(req, res, next)=> {

    try {

        const fileName = req.file.originalname 
        console.log(fileName)
        await saveProductPicture(fileName, req.file.buffer)

        res.send("ok")

    } catch (error) {
        next(error)
    }
})

//get category
productsRouter.get("/?category", async(req, res, next) => { 
    try {
        
        const content = await readProducts()
        const category = req.query
        console.log(category)
            const filteredproduct = content.filter(element => element.category === req.query)
            res.send(filteredproduct)

    } catch (error) {    
        next(error)    
    }

})



export default productsRouter