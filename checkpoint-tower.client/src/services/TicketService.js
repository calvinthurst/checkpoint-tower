import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class TicketService {
  async getTicketsById(eventId) {
    const res = await api.get('api/events/' + eventId + '/tickets')
    AppState.ticket = res.data
    // logger.log('[Tickets for active event]', AppState.ticket)
  }

  async createTicket(eventId) {
    const res = await api.post('api/tickets', eventId)
    AppState.ticket.unshift(res.data)
  }
  async deleteTicket(ticketId) {
    const res = await api.delete('api/tickets/' + ticketId.id)
    AppState.ticket.filter(t => t.id == ticketId.id)
    AppState.myTickets = AppState.myTickets.filter(t => t.id == ticketId.id)
  }
}

export const ticketService = new TicketService()