import { GoogleGenAI } from "@google/genai";
import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

export const analyzeImage = async (imagePath) => {
    try {
        // Read image file
        const imageData = await fs.readFile(imagePath);
        const base64Data = imageData.toString("base64");

        // Determine MIME type from file extension
        const mimeType = getMimeType(imagePath);

        // Construct prompt
        const prompt = `Analyze this screenshot and identify:
        1. Source platform ('Reddit', 'Twitter', 'GitHub', 
        'Instagram', 'Facebook', 'LinkedIn', 'TikTok', 
        'WhatsApp', 'Pinterest', 'Other')
        2. Key tags/categories that describe the content
        3. Extract significant text content
        4. Give some information about the image
        
        Format your response as JSON with these keys:
        - "source": (only one of: Reddit/Twitter/GitHub/Other)
        - "tags": (array of relevant tags)
        - "extractedText": (concatenated important text)
        - "imageInfo": (some information about the image)`;

        const contents = [
            {
                inlineData: {
                    mimeType: mimeType,
                    data: base64Data,
                }
            },
            { text: prompt }
        ];

        const response = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: contents,
        });

        const text = response.text;

        // Parse JSON from response
        const jsonStart = text.indexOf('{');
        const jsonEnd = text.lastIndexOf('}') + 1;
        const jsonString = text.substring(jsonStart, jsonEnd);

        const analysis = JSON.parse(jsonString);

        // Validate and format response
        return {
            source: ['Reddit', 'Twitter', 'GitHub'].includes(analysis.source)
                ? analysis.source
                : 'Other',
            tags: Array.isArray(analysis.tags)
                ? analysis.tags.slice(0, 5) // Limit to 5 tags
                : [],
            extractedText: analysis.extractedText || '',
            imageInfo: analysis.imageInfo || ''
        };

    } catch (error) {
        console.error("Gemini analysis error:", error);
        throw new Error("Image analysis failed");
    }
};

function getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    switch (ext) {
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.png':
            return 'image/png';
        case '.gif':
            return 'image/gif';
        case '.webp':
            return 'image/webp';
        default:
            return 'image/jpeg'; // Default fallback
    }
}