import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    originalName: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    mimetype: {
        type: String,
        required: true
    },
    imageInfo: {
        type: String,
        required: false
    },
    size: {
        type: Number,
        required: true
    },
    tags: {
        type: [String],
        enum: ['Reddit', 'Twitter', 'GitHub', 'Instagram', 'Facebook', 'LinkedIn', 'TikTok', 'WhatsApp', 'Pinterest', 'Other'],
        default: []
    },
    source: {
        type: String,
        enum: ['Reddit', 'Twitter', 'GitHub', 'Instagram', 'Facebook', 'LinkedIn', 'TikTok', 'WhatsApp', 'Pinterest', 'Other'],
        default: 'Other'
    },
    extractedText: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['processing', 'completed', 'failed'],
        default: 'processing'
    },
    error: {
        type: String,
        default: ''
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    },
    processedAt: {
        type: Date
    }
});

export const Image = mongoose.model("Image", imageSchema);