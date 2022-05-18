import { getJobs } from "../../../components/apis/jobs";

export const getJobsMap = async () => {
  const jobs = await getJobs();
  let jobsMap = {};
  jobs.forEach((jobs) => {
    jobsMap[jobs._id] = jobs;
  });
  return jobsMap;
};
