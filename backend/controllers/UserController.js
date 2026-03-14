const UserModel = require("../models/User");
const bcrypt = require('bcrypt');

const getProfile = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user._id).select('-password');
        res.status(200).json({ success: true, user });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { name, businessName, pan, address } = req.body;
        const user = await UserModel.findByIdAndUpdate(
            req.user._id,
            { name, businessName, pan, address },
            { new: true }
        ).select('-password');

        res.status(200).json({
            message: "Profile updated successfully",
            success: true,
            user
        });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

const updatePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = await UserModel.findById(req.user._id);

        const isPassEqual = await bcrypt.compare(oldPassword, user.password);
        if (!isPassEqual) {
            return res.status(403).json({ message: "Old password is incorrect", success: false });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.status(200).json({ message: "Password updated successfully", success: true });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

module.exports = {
    getProfile,
    updateProfile,
    updatePassword
};
