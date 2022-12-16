import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { format, render, cancel, register } from 'timeago.js';



class EventService {
  async getEvents() {
    const res = await api.get('api/events')
    AppState.event = res.data
    // logger.log('[getting events]', AppState.event)
  }
  async getEventById(eventId) {
    const res = await api.get(`api/events/${eventId}`)
    AppState.activeEvent = res.data
    // logger.log('[active event]', AppState.activeEvent)
    // AppState.activeEvent.startDate = format(new Date(AppState.activeEvent.startDate))
  }
  async createEvent(body) {
    const res = await api.post('api/events', body)
    AppState.event.push(res.data)
    logger.log(res.data)
    return res.data
  }
  async editEvent(body, eventId) {
    // logger.log(eventId)
    const res = await api.put(`api/events/${eventId}`, body)
  }
  async cancelEvent(eventId) {
    const res = await api.delete(`api/events/${eventId}`)
    let eventIndex = AppState.event.findIndex(e => e.id == eventId)
    if (eventIndex >= 0) {
      AppState.event.splice(eventIndex, 1)
      AppState.event = event
    }
    return "canceled event"
  }
}
export const eventService = new EventService()