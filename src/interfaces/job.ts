export interface Job {
  GroupId: number,
  Title: string,
  CronExpression: string,
  DurationInMinutes: number
}