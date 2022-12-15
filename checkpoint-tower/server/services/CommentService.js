import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { towerEventService } from "./TowerEventService.js"


class CommentService {

  async getCommentsForEvent(eventId) {
    const comments = await dbContext.Comment.find(eventId).populate('creator')
    return comments
  }

  async createComment(body) {
    const comment = await dbContext.Comment.create(body)
    await comment.populate('creator')
    return comment
  }
  async deleteComment(commentId, userId) {
    const comment = await dbContext.Comment.findById(commentId).populate('creator event')
    if (!comment) throw new BadRequest(`no comment at ${commentId}`)
    if (comment.creatorId != userId) throw new Forbidden(`nacho commment big boss`)
    await comment.remove()
    return 'comment removed'
  }
}
export const commentService = new CommentService()