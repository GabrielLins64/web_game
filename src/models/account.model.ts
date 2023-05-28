import mongoose, { Schema, Document } from "mongoose";

export interface IAccount extends Document {
    email: String;
    fullName: String;
    username: String;
    password: String;
    admin?: Boolean;
}

const AccountSchema: Schema = new Schema({
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true,
    },
    fullName: {
        type: Schema.Types.String,
        required: true,
    },
    username: {
        type: Schema.Types.String,
        required: true,
        unique: true,
    },
    password: {
        type: Schema.Types.String,
        required: true,
    },
    admin: {
        type: Schema.Types.Boolean,
        immutable: true,
        default: false,
    }
});

AccountSchema.methods.toJSON = function () {
    let accountObject = this.toObject();
    delete accountObject.password;
    delete accountObject.__v;
    return accountObject;
};

export default mongoose.model<IAccount>("Account", AccountSchema);