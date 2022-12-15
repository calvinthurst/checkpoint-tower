import { Schema } from "mongoose";


export const TowerEventSchema = new Schema({
  // id: { type: String, required: true },
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  name: { type: String, required: true },
  description: { type: String, required: true },
  coverImg: { type: String, },
  location: { type: String, },
  capacity: { type: Number, required: true },
  startDate: { type: Date, },
  isCanceled: { type: Boolean, default: false },
  type: { type: String, default: 'sport', enum: ['concert', 'convention', 'sport', 'digital'], lowercase: true }
}, { timestamps: true, toJSON: { virtuals: true } })

TowerEventSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})