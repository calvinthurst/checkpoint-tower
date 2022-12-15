import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"


class TowerEventService {


  async getAll(query) {
    const events = await dbContext.TowerEvent.find().populate('creator')
    return events
  }

  async getOne(eventId) {
    const event = await dbContext.TowerEvent.findById(eventId).populate('creator')
    if (!event) throw new BadRequest(`No event at that id ${eventId}`)
    return event
  }
  async createEvent(body) {
    const event = await dbContext.TowerEvent.create(body)
    await event.populate('creator')
    return event
  }
  async editEvent(eventId, body, userId) {
    const event = await this.getOne(eventId)
    if (event.creatorId != userId) throw new Forbidden('You arent allowed to edit this event nacho event')
    if (event.isCanceled == true) throw new BadRequest(`${event.name} is already canceled`)
    event.name = body.name
    event.description = body.description
    event.isCanceled = !body.isCanceled
    event.type = body.type
    await event.save()
    return event
  }

  async removeEvent(eventId, userId) {
    const event = await this.getOne(eventId)
    if (event.creatorId != userId) throw new Forbidden('nacho event big dawg')
    event.isCanceled = !event.isCanceled
    await event.save()
    return `${event.name} has been canceled`
  }

}

export const towerEventService = new TowerEventService()