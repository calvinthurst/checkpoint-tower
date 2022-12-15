import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { towerEventService } from "./TowerEventService.js"


class TicketService {

  async getTicketsByEventId(eventId) {
    const eventTickets = await dbContext.Ticket.find({ eventId }).populate('profile event')
    return eventTickets
  }
  async getMyTickets(accountId) {
    const myTicket = await dbContext.Ticket.find({ accountId }).populate('profile event')
    return myTicket
  }
  async createTicket(body) {
    const event = await towerEventService.getOne(body.eventId)
    if (event.isCanceled) throw new BadRequest('that event has been canceled')
    if (event.capacity == 0) throw new BadRequest('this is sold out')
    const ticket = await dbContext.Ticket.create(body)
    await ticket.populate('event profile')
    // @ts-ignore
    event.capacity--
    await event.save()
    return ticket
  }

  async deleteTicket(ticketId, userId) {
    const ticket = await dbContext.Ticket.findById(ticketId).populate('profile event')
    if (!ticket) throw new BadRequest(`no tickets at the id: ${ticketId}`)
    if (ticket.accountId != userId) throw new Forbidden('nacho ticket')
    const event = await towerEventService.getOne(ticket.eventId)
    if (event.isCanceled) throw new Forbidden('too late that event has been canceled')
    // @ts-ignore
    event.capacity++
    await event.save()
    await ticket.remove()
    return `ticket has been deleted`
  }
}

export const ticketService = new TicketService()