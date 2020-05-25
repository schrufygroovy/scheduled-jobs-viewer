import { Job } from "./interfaces/job";
import moment from "moment";
import { JobTimelineItem } from "./interfaces/job-timeline-item";
import CronParser, { CronExpression } from "cron-parser";

let globalItemIdCounter = 100;

function parseCronExpression(cronExpression : string, options : CronParser.ParserOptions) : CronExpression {
  try{
    return CronParser.parseExpression(cronExpression, options);
  } catch (error) {
    console.error(`Could not parse value: '${cronExpression}'.`);
    throw error;
  }
}

function getTimelineItemsForJob(
  job: Job,
  dayBegin: moment.Moment,
  dayEnd: moment.Moment
) : JobTimelineItem[]
{
  const options = {
    currentDate: dayBegin.toDate(),
    endDate: dayEnd.toDate()
  };
  const interval = parseCronExpression(job.CronExpression, options);
  let result = [] as JobTimelineItem[];
  while (true) {
    try {
      const cronDate = interval.next();
      const startDate = moment(cronDate.toDate());
      const endDate = moment(startDate.clone().add(job.DurationInMinutes, 'minute').toDate());
      result.push({
        id: globalItemIdCounter,
        group: job.GroupId,
        title: `${job.Title}`,
        start_time: startDate,
        end_time: endDate,
        job: job
      });;
      globalItemIdCounter++;
    } catch (e) {
      break;
    }
  }
  return result;
}

export function ConvertToItems(
  jobs : Job[],
  dayBegin: moment.Moment,
  dayEnd: moment.Moment) : JobTimelineItem[]
{
  let result = [] as JobTimelineItem[];
  jobs.forEach(function(job)
  {
    result.push(...getTimelineItemsForJob(job, dayBegin, dayEnd));
  })
  return result;
}