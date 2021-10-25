import express from "express";
import uniqid from "uniqid";
import createError from "http-errors"
import {readReviews, writeReviews} from "../lib/fs-tools.js"
<<<<<<< Updated upstream
import productsRouter from "./products.js";
=======
>>>>>>> Stashed changes


const reviewsRouter = express.Router()

<<<<<<< Updated upstream
// GET all reviews
=======
// GET all products
>>>>>>> Stashed changes
reviewsRouter.get("/", async(req, res, next) => {
        try {
            const reviews = await readReviews()
            res.status(200).send(reviews)
        } catch (error) {
            next(error)
        }
})

<<<<<<< Updated upstream
// GET individual review
=======
// GET individual product
>>>>>>> Stashed changes
reviewsRouter.get("/:id", async(req, res, next) => {
    try {
        const reviews = await readReviews()

        const singlereview = reviews.find(review => review.id === req.params.id)

        if (singlereview) {
            res.status(200).send(singlereview)
        } else {
<<<<<<< Updated upstream
            next(createError(404, `review with id ${req.params.id} not found`))
=======
            next(createError(404, `product with id ${req.params.id} not found`))
>>>>>>> Stashed changes
        }

    } catch (error) {
        next(error)
    }
})


<<<<<<< Updated upstream
// POST review
=======
// POST product
>>>>>>> Stashed changes

reviewsRouter.post("/", async(req, res, next) => {
    try {
        const reviews = await readReviews()

<<<<<<< Updated upstream
        const newReview = {...req.body, 
            id: uniqid(), createdAt: new Date()}
=======
        const newReview = {...req.body, id: uniqid(), createdAt: new Date()}
>>>>>>> Stashed changes

        reviews.push(newReview)

        await writeReviews(reviews)
      
        res.status(201).send(newReview.id)

    } catch (error) {
        next(error)
    }
})

// DELETE 

<<<<<<< Updated upstream
previewsRouter.delete("/:id", async(req, res, next) => {
=======
reviewsRouter.delete("/:id", async(req, res, next) => {
>>>>>>> Stashed changes

 try {
        const reviews = await readReviews()

        const remainingReviews = reviews.filter(review => review.id !== req.params.id)

        writeReviews(remainingReviews)

<<<<<<< Updated upstream
        res.status(200).send(`review with id ${req.params.id} deleted successfully`)
=======
        res.status(200).send(`product with id ${req.params.id} deleted successfully`)
>>>>>>> Stashed changes

    } catch (error) {
        next(error)
    }

})

//PUT

reviewsRouter.put("/:id", async(req, res, next)=> {
    try {
        const reviews = await readReviews()

        const singleReviewIndex = reviews.findIndex(index => index.id === req.params.id)

        const singleReview = reviews[singleReviewIndex]

        const updatedReview = {...singleReview, ...req.body, updatedAt: new Date()} 

        reviews[singleReviewIndex] = updatedReview
        writeReviews(reviews)

        res.status(200).send(`review with id ${req.params.id} updated successfully`)

    } catch (error) {
        next(error)
    }

})


export default reviewsRouter