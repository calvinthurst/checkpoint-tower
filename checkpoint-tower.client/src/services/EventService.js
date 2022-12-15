import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


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
  }
}
export const eventService = new EventService()