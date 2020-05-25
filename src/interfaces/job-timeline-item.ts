import { TimelineItemBase } from "react-calendar-timeline";
import { Job } from "./job";

export interface JobTimelineItem extends TimelineItemBase<moment.Moment>
{
  job : Job
}
