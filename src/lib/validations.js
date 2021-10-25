import { body } from "express-validator"

export const productValidationMiddlewares = [
  body("name").exists().withMessage("Name is a mandatory field!"),
  body("description").exists().withMessage("Description is a mandatory field!"),
  body("price").exists().withMessage("Price is a mandatory field!"),
  body("category").exists().withMessage("Category is a mandatory field!"),
  body("brand").exists().withMessage("Brand is a mandatory field!"),
]

export const reviewsValidationMiddlewares = [
    body("comment").exists().withMessage("Comment is a mandatory field!"),
    body("rate").exists().withMessage("Rate is a mandatory field!"),
    body("productId").exists().withMessage("productId is a mandatory field!"),
  ]













// import { checkSchema, validationResult } from "express-validator";

// const schema = {
//   name: {
//     in: ["body"],
//     isString: {
//       errorMessage: "name validation failed , type must be string  ",
//     },
//   },
//   description: {
//     in: ["body"],
//     isString: {
//       errorMessage: "category validation failed , type must be  string ",
//     },
//   },
//   brand: {
//     in: ["body"],
//     isString: {
//       errorMessage: "content validation failed , type must be string ",
//     },
//   },
//   "price": {
//     in: ["body"],
//     isString: {
//       errorMessage: "author.name validation failed , type must be string",
//     },
//   },
//   "category": {
//     in: ["body"],
//     isString: {
//       errorMessage: "author.avatar validation failed , type must be string",
//     },
//   },

// };

// const searchSchema = {
//   category: {
//     in: ["query"],
//     isString: {
//       errorMessage:
//         "category must be in query and type must be string to search!",
//     },
//   },
// };

// const commentSchema = {
//   text: {
//     isString: {
//       errorMessage: "Text field is required for comment",
//     },
//   },
//   userName: {
//     isString: {
//       errorMessage: "User name is required for comment",
//     },
//   },
// };

// export const checkCommentSchema = checkSchema(commentSchema);

// export const checkSearchSchema = checkSchema(searchSchema);

// export const checkProductSchema = checkSchema(schema);

// export const checkValidationResult = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     const error = new Error("Blog post validation is failed");
//     error.status = 400;
//     error.errors = errors.array();
//     next(error);
//   }
//   next();
// };