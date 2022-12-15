import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketService } from "../services/TicketService.js";
import BaseController from "../utils/BaseController.js";



export class TicketController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)
      .delete('/:ticketId', this.deleteTicket)
  }
  async createTicket(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const ticket = await ticketService.createTicket(req.body)
      return res.send(ticket)
    } catch (error) {
      next(error)
    }
  }
  async deleteTicket(req, res, next) {
    try {
      const ticket = await ticketService.deleteTicket(req.params.ticketId, req.userInfo.id)
      return res.send('deleted ticket')
    } catch (error) {
      next(error)
    }
  }
}
