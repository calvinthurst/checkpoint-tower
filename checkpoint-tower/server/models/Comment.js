import { Schema } from "mongoose";


export const CommentSchema = new Schema({
  // id: { type: String, required: true },
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  eventId: { type: Schema.Types.ObjectId, required: true, ref: 'TowerEvent' },
  body: { type: String, required: true },
  isAttending: { type: Boolean, require: true }
}, { timestamps: true, toJSON: { virtuals: true } })

CommentSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})