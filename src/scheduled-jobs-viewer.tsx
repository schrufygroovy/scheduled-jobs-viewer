import { Job } from "./interfaces/job";
import { useState } from 'react';
import { ParseJobs } from "./scheduled-jobs-csv";
import React from "react";
import { ConvertToItems } from "./scheduled-jobs-timeline";
import { Help } from "./help";
import { JobDetails } from "./jobdetails";
import Timeline from 'react-calendar-timeline';

// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css';
import './scheduled-jobs-viewer.css'

interface ScheduledJobsViewerProps {
  csvInput : string,
  dayBegin: moment.Moment,
  dayEnd: moment.Moment
}

const emptyJob = {
  Title: 'Select any job in the timeline to see details about it.',
  DurationInMinutes: 0,
  CronExpression: ''
} as Job;

export const ScheduledJobsViewer: React.FunctionComponent<ScheduledJobsViewerProps> = (props) => {

  const [rawCsvString, setRawCsvString] = useState(props.csvInput);
  const [selectedJob, setSelectedJob] = useState(emptyJob);
  const parsed = ParseJobs(rawCsvString);
  const [groups, setGroups] = React.useState(parsed.groups);
  const [items, setItems] = React.useState(ConvertToItems(parsed.jobs, props.dayBegin, props.dayEnd));

  const handleTextAreaChange = function(event : React.ChangeEvent<HTMLTextAreaElement>){
    const newValue = event.target.value;
    setRawCsvString(newValue);
    const parsed = ParseJobs(newValue);
    setGroups(parsed.groups);
    setItems(ConvertToItems(parsed.jobs, props.dayBegin, props.dayEnd));
  }

  const handleOnItemSelect = function(itemId : number, e : unknown, time : unknown) {
    const item = items.find(item => item.id === itemId);
    if(!item){
      return;
    }
    setSelectedJob(item.job);
  }

  const handleOnItemDeselect = function(e : unknown) {
    setSelectedJob(emptyJob);
  }

  return (
    <div>
      <div className="column">
        <Help/>
      </div>
      <div className="column">
        <textarea
          value={rawCsvString}
          onChange={handleTextAreaChange}
          style={{width: 900, height: 350}}/>
      </div>
      <JobDetails job={selectedJob} />
      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={props.dayBegin}
        defaultTimeEnd={props.dayEnd}
        stackItems
        canMove={false}
        canResize={false}
        onItemSelect={handleOnItemSelect}
        onItemDeselect={handleOnItemDeselect}/>
    </div>
  );
}