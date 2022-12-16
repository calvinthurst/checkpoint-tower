import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class CommentService {

  async getCommentsById(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`)
    logger.log('comments', res.data)
    AppState.comment = res.data
  }
}

export const commentService = new CommentService()