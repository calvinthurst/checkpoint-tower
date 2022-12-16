import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class TicketService {
  async getTicketsById(eventId) {
    const res = await api.get('api/events/' + eventId + '/tickets')
    AppState.ticket = res.data
    logger.log('[Tickets for active event]', AppState.ticket)
  }

  async getTicket(eventId) {
    const res = await api.post('api/tickets', eventId)
    logger.log(res.data)
  }
}

export const ticketService = new TicketService()