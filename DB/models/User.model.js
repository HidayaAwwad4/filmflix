import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,  
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: '',
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    confirmEmail: {
        type: Boolean,
        default: false,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
    },
    status: {
        type: String,
        enum: ['active', 'not_active'],
        default: 'active',
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'super_admin'], 
        default: 'user',
    },
    preferences: {
        type: [String],  
    },
    watchHistory: {
        type: [{ movieId: { type: Schema.Types.ObjectId, ref: 'Movie' }, watchedAt: Date }], 
    },
    ratings: {
        type: [{ movieId: { type: Schema.Types.ObjectId, ref: 'Movie' }, rating: Number }],
    },
}, {
    timestamps: true,  
});

const userModel = mongoose.model('User', userSchema);
export default userModel;
