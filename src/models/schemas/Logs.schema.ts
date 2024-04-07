import { ObjectId } from 'mongodb'
import { LogAction, LogDocument } from '~/enum/Logs.enum'

interface LogType {
  _id?: ObjectId
  document: LogDocument
  enity: ObjectId
  action: LogAction
  description: string
  action_by: ObjectId
  action_at: Date
}

export default class Logs {
  _id?: ObjectId
  document: LogDocument
  enity: ObjectId
  action: LogAction
  description: string
  action_by: ObjectId
  action_at: Date
  constructor(log: LogType) {
    ;(this.document = log.document),
      (this.enity = log.enity),
      (this.action = log.action),
      (this.description = log.description),
      (this.action_at = log.action_at),
      (this.action_by = log.action_by)
  }
}
