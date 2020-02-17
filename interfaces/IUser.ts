import mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

export interface IUser {
    username: string,
    password: string,
    universityId: typeof ObjectId | null
}