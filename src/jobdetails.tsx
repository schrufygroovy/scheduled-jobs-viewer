import * as React from "react";
import { Job } from "./interfaces/job";

interface JobDetailsProps {
  job : Job
}

export const JobDetails: React.FunctionComponent<JobDetailsProps> = (props) => {
  const job = props.job;
  return (
    <div>
      <div>Job: {job.Title}</div>
      <div>Schedule: {job.CronExpression}</div>
      <div>Duration in Minutes: {job.DurationInMinutes}</div>
    </div>
  )
}

