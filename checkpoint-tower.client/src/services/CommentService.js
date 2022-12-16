import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class CommentService {

  async getCommentsById(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`)
    logger.log('comments', res.data)
    AppState.comment = res.data
  }
  async createComment(body) {
    const res = await api.post('api/comments', body)
    // logger.log(res.data)
    AppState.comment.push(res.data)
  }
  async removeComment(commentId) {
    const res = await api.delete('api/comments/' + commentId)
    AppState.comment = AppState.comment.filter(c => c.id == commentId)
  }
}

export const commentService = new CommentService()