import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentService } from "../services/CommentService.js";
import { ticketService } from "../services/TicketService.js";
import { towerEventService } from "../services/TowerEventService.js";
import BaseController from "../utils/BaseController.js";


export class TowerEventController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAll)
      .get('/:eventId', this.getOne)
      .get('/:eventId/tickets', this.getTicketsByEventId)
      .get('/:eventId/comments', this.getCommentsForEvent)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      .put('/:eventId', this.editEvent)
      .delete('/:eventId', this.removeEvent)
  }

  async getAll(req, res, next) {
    try {
      const events = await towerEventService.getAll(req.query)
      return res.send(events)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      const event = await towerEventService.getOne(req.params.eventId)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }
  async getTicketsByEventId(req, res, next) {
    try {
      const ticket = await ticketService.getTicketsByEventId(req.params.eventId)
      return res.send(ticket)
    } catch (error) {
      next(error)
    }
  }
  async getCommentsForEvent(req, res, next) {
    try {
      const comments = await commentService.getCommentsForEvent({ eventId: req.params.eventId })
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async createEvent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const event = await towerEventService.createEvent(req.body)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }
  async editEvent(req, res, next) {
    try {
      const event = await towerEventService.editEvent(req.params.eventId, req.body, req.userInfo.id)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async removeEvent(req, res, next) {
    try {
      const message = await towerEventService.removeEvent(req.params.eventId, req.userInfo.id)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}