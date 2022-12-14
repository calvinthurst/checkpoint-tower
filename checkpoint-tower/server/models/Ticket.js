import { Schema } from "mongoose";


export const TicketSchema = new Schema({
  // id: { type: String, required: true },
  eventId: { type: Schema.Types.ObjectId, required: true, ref: 'TowerEvent' },
  accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
}, { timestamps: true, toJSON: { virtuals: true } })

TicketSchema.virtual('account', {
  localField: 'accountId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

TicketSchema.virtual('towerEvent', {
  localField: 'eventId',
  ref: 'TowerEvent',
  foreignField: 'id',
  justOne: true
})