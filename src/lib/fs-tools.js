import fs from 'fs-extra';
import {fileURLToPath} from "url";
import {join, dirname} from "path";

const {readJSON, writeJSON} = fs

//const productsJSONPath = join(process.cwd(), "/src/data/products.json")
//console.log(productsJSONPath)

const productsJSONPath = join(dirname(fileURLToPath(import.meta.url)), "../data/products.json")

const reviewsJSONPath = join(dirname(fileURLToPath(import.meta.url)), "../data/reviews.json")


export const readProducts = () => readJSON(productsJSONPath)
export const writeProducts = content => writeJSON(productsJSONPath, content)

export const readReviews = () => readJSON(reviewsJSONPath)
export const writeReviews = content => writeJSON(reviewsJSONPath, content)