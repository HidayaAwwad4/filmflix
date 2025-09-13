import adminModel from '../../../DB/models/Admin.model.js';
import bcrypt from "bcryptjs";
import { AppError } from '../../../AppError.js';

export const createAdmin = async (req, res, next) => {
    const { userName, email, password, role, status } = req.body;

    const existingAdmin = await adminModel.findOne({ email });
    if (existingAdmin) {
        return next(new AppError("Email already exists", 409));
    }

    const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALROUND));
    const newAdmin = await adminModel.create({
        userName,
        email,
        password: hashPassword,
        status,
        role
    });

    return res.status(201).json({ message: "Admin created successfully", admin: newAdmin });
};

export const updateAdmin = async (req, res, next) => {
    const { id } = req.params;
    const updateData = req.body;

    const admin = await adminModel.findById(id);
    if (!admin) {
        return next(new AppError("Admin not found", 404));
    }

    const updatedAdmin = await adminModel.findByIdAndUpdate(id, updateData, { new: true });
    
    return res.status(200).json({ message: "Admin updated successfully", admin: updatedAdmin });
};

export const deleteAdmin = async (req, res, next) => {
    const { id } = req.params;

    const admin = await adminModel.findByIdAndDelete(id);
    if (!admin) {
        return next(new AppError("Admin not found", 404));
    }
    
    return res.status(200).json({ message: "Admin deleted successfully" });
};

export const getAdmin = async (req, res, next) => {
    const { id } = req.params;
    const admin = await adminModel.findById(id).select("userName email role status");
    if (!admin) {
        return next(new AppError("Admin not found", 404));
    }
    return res.status(200).json({ message: "Admin details", admin });
};

export const getAllAdmins = async (req, res, next) => {
    const admins = await adminModel.find();
    return res.status(200).json({ message: "Admins details", admins });
};

