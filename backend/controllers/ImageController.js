const ImageModel = require('../models/Image');
const logActivity = require('../utils/logger');

const uploadImage = async (req, res) => {
    try {
        const { name, price, code, imageData } = req.body;
        const newImage = new ImageModel({
            userId: req.user._id,
            name,
            price,
            code,
            imageData
        });
        await newImage.save();

        await logActivity(req.user._id, 'UPLOAD', 'Image', name, `Uploaded new gallery image: ${name} (Code: ${code})`);

        res.status(201).json({
            success: true,
            message: 'Image uploaded successfully',
            image: newImage
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const getMyImages = async (req, res) => {
    try {
        const images = await ImageModel.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(images);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const deleteImage = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await ImageModel.findOneAndDelete({ _id: id, userId: req.user._id });
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Image not found' });
        }

        await logActivity(req.user._id, 'DELETE', 'Image', deleted.name, `Removed gallery image: ${deleted.name} (Code: ${deleted.code})`);

        res.status(200).json({ success: true, message: 'Image deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = {
    uploadImage,
    getMyImages,
    deleteImage
};
