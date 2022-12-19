import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class TicketService {
  async getTicketsById(eventId) {
    const res = await api.get('api/events/' + eventId + '/tickets')
    AppState.ticket = res.data
    AppState.myTickets = res.data.filter(t => t.accountId == AppState.account.id)
    logger.log('[Tickets for active event]', AppState.myTickets)
  }

  async getMyTickets(accountId) {
    const res = await api.get('account/tickets', accountId)
    AppState.myTickets = res.data
  }
  async createTicket(eventId) {
    const res = await api.post('api/tickets', eventId)
    AppState.ticket.push(res.data)
  }
  async deleteTicket(ticketId) {
    logger.log(ticketId)
    const res = await api.delete(`api/tickets/${ticketId}`)
    AppState.ticket = AppState.ticket.filter(t => t.id !== ticketId)
    AppState.myTickets = AppState.myTickets.filter(t => t.id !== ticketId)
  }
}

export const ticketService = new TicketService()