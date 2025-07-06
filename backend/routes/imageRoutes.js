import express from "express"
import { uploadImages, searchImages, getImageById, getAllImages } from "../controllers/imageController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"

const router = express.Router()

// Protected routes (require authentication)
router.post("/upload_images", authMiddleware, uploadImages)

// Public routes
router.get("/images/search", searchImages)
router.get("/images/:id", getImageById)
router.get("/getall_images", getAllImages)

export default router;