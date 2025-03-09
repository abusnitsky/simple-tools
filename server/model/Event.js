import mongoose from "mongoose";
const { Schema, model } = mongoose;

const eventSchema = new Schema({
    text: { type: String, required: true },
    important: { type: Boolean, required: true },
    date: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Event = model('Event', eventSchema);
export default Event;