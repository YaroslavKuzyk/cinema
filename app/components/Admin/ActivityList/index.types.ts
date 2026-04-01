export type ActivityType =
  | 'published'
  | 'edited'
  | 'deleted'
  | 'blocked'
  | 'created'
  | 'invited'
  | 'updated'

export type ActivityDotColor =
  | 'success'
  | 'info'
  | 'danger'
  | 'purple'
  | 'warning'
  | 'muted'

export interface IActivity {
  id: string
  type: ActivityType
  description: string
  timestamp: string
  dotColor: ActivityDotColor
}
