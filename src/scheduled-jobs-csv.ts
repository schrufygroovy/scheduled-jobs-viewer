import { CsvRow } from "./interfaces/csvrow";
import { Group } from "./interfaces/group";
import { Job } from "./interfaces/job";

function ReadRows(csvString : string) : CsvRow[] {
  let result = [] as CsvRow[];
  const rows = csvString.split('\n');
  rows.slice(1,rows.length).forEach(function(row){
    const values = row.split(';');
    if(values.length !== 4)
    {
      console.error(`Could not parse csv row with value: '${row}'.`);
      return;
    }
    result.push({
      GroupName: values[0],
      Title: values[1],
      CronExpression: values[2],
      DurationInMinutes: values[3]
    })
  });
  return result;
}

function GetGroups(rows : CsvRow[]) : Group[]
{
  let result = [] as Group[];
  let i = 1;
  rows.forEach(function(row){
    const groupName = row.GroupName;
    if(!(result.map(group => group.title).includes(groupName)))
    {
      result.push({
        id: i++,
        title: groupName
      });
    }
  });
  return result;
}

function ParseJobsFromRows(rows : CsvRow[]) : { jobs: Job[], groups: Group[]}
{
  const groups = GetGroups(rows);
  const jobs = rows.map(row => {
    const groupOfJob = groups.find(group => group.title === row.GroupName);
    if(!groupOfJob)
    {
      throw new Error(`Could not find ${row.GroupName}!`);
    }
    return {
      GroupId: groupOfJob.id,
      Title: row.Title,
      CronExpression: row.CronExpression,
      DurationInMinutes: parseInt(row.DurationInMinutes)
    } as Job;
  });

  return {
    jobs: jobs,
    groups: groups
  };
}

export function ParseJobs(csvString : string) : { jobs: Job[], groups: Group[]}
{
  return ParseJobsFromRows(ReadRows(csvString));
}