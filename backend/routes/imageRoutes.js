import express from "express"
import { uploadImages, searchImages, getImageById, getAllImages } from "../controllers/imageController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.post("/upload_images", authMiddleware, uploadImages)
router.get("/images/search", authMiddleware, searchImages)
router.get("/images/:id", authMiddleware, getImageById)
router.get("/getall_images", authMiddleware, getAllImages)


export default router;