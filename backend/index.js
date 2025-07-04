import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import mongoose from "mongoose";
import { Image } from "./Model/imageSchema.js";
import { analyzeImage } from "./utils/imageAnalysis.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));


//connect to mongodb
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("✅ Connected to MongoDB");
    }).catch((err) => {
        console.log("❌ Error connecting to MongoDB", err);
    });

// Basic health check route
app.get("/", (req, res) => {
    res.json({ status: "Server is running" });
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, './images/'))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Only JPEG, JPG, and PNG formats allowed!'));
        }
    }
}).array('uploadedImages', 10); // Allow up to 10 images



//Post Images
app.post("/upload_images", async (req, res) => {

    upload(req, res, async function (err) {

        if (err instanceof multer.MulterError) {
            return res.status(500).json({ error: { message: `Multer error: ${err.message}` } });
        }
        else if (err) {
            return res.status(413).json({ error: { message: err.message } });
        }


        try {
            const userId = req.body.userId;
            if (!userId) {
                return res.status(400).json({ error: "userId is required" });
            }

            const uploadResults = [];

            // Save image metadata to DB and start background processing
            for (const file of req.files) {
                const newImage = new Image({
                    userId,
                    filename: file.filename,
                    originalName: file.originalname,
                    path: file.path,
                    mimetype: file.mimetype,
                    size: file.size,
                    status: 'processing'
                });

                const savedImage = await newImage.save();
                uploadResults.push(savedImage);

                // Start background processing
                processImageAsync(savedImage._id, file.path);
            }

            return res.status(200).json({
                message: "Images uploaded successfully. Processing in background.",
                images: uploadResults
            });
        } catch (error) {
            console.error('Upload error:', error);
            return res.status(500).json({ error: "Internal server error" });
        }
    });
});

// Background image processing
async function processImageAsync(imageId, imagePath) {
    try {
        const analysisResult = await analyzeImage(imagePath);

        await Image.findByIdAndUpdate(imageId, {
            tags: analysisResult.tags,
            source: analysisResult.source,
            extractedText: analysisResult.extractedText,
            imageInfo: analysisResult.imageInfo,
            status: 'completed',
            processedAt: new Date()
        });

        console.log(`Processed image ${imageId}`);
    } catch (error) {
        console.error(`Error processing image ${imageId}:`, error);
        await Image.findByIdAndUpdate(imageId, {
            status: 'failed',
            error: error.message
        });
    }
}

// // Search images
// app.get("/images/search", async (req, res) => {
//     try {
//         const userId = req.query.userId;
//         const query = req.query.q;

//         if (!userId || !query) {
//             return res.status(400).json({ error: "userId and query are required" });
//         }

//         const images = await Image.find({
//             userId,
//             $or: [
//                 { tags: { $regex: query, $options: 'i' } },
//                 { extractedText: { $regex: query, $options: 'i' } },
//                 { source: { $regex: query, $options: 'i' } }
//             ]
//         });

//         res.json(images);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// // Get image by ID
// app.get("/images/:id", async (req, res) => {
//     try {
//         const image = await Image.findById(req.params.id);
//         if (!image) {
//             return res.status(404).json({ error: "Image not found" });
//         }
//         res.json(image);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });


app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
