import { model, Schema, SchemaTypes } from "mongoose";

const userSchema = new Schema({
    username: {
        type: SchemaTypes.String,
        require: true
    },
    email: {
        type: SchemaTypes.String,
        required: true,
        unique: true
    },
    password: {
        type: SchemaTypes.String,
        required: true,
    }
})

const User = model('User', userSchema)
export default User;