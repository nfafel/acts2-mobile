import mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

export interface ILoginInfo {
    username: string,
    universityId: typeof ObjectId,
    images: string[], //Change to IImage[]
    gender: string,
    qualityRating: number,
    brand: string,
    size: string,
    value?: string,
    publicity: string,
    createdAt: Date
}