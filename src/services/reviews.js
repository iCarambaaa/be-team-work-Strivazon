import express from "express";
import uniqid from "uniqid";
import createError from "http-errors"
import {readReviews, writeReviews} from "../lib/fs-tools.js"
import productsRouter from "./products.js";


const reviewsRouter = express.Router()

// GET all reviews
reviewsRouter.get("/", async(req, res, next) => {
        try {
            const reviews = await readReviews()
            res.status(200).send(reviews)
        } catch (error) {
            next(error)
        }
})

// GET individual review
reviewsRouter.get("/:id", async(req, res, next) => {
    try {
        const reviews = await readReviews()

        const singlereview = reviews.find(review => review.id === req.params.id)

        if (singlereview) {
            res.status(200).send(singlereview)
        } else {
            next(createError(404, `review with id ${req.params.id} not found`))
        }

    } catch (error) {
        next(error)
    }
})


// POST review

reviewsRouter.post("/", async(req, res, next) => {
    try {
        const reviews = await readReviews()

        const newReview = {...req.body, 
            id: uniqid(), createdAt: new Date()}

        reviews.push(newReview)

        await writeReviews(reviews)
      
        res.status(201).send(newReview.id)

    } catch (error) {
        next(error)
    }
})

// DELETE 

previewsRouter.delete("/:id", async(req, res, next) => {

 try {
        const reviews = await readReviews()

        const remainingReviews = reviews.filter(review => review.id !== req.params.id)

        writeReviews(remainingReviews)

        res.status(200).send(`review with id ${req.params.id} deleted successfully`)

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