import axiosInstance from "../../utils/axios";

export const getProjectList = async () => {
    const res = await axiosInstance.get(`/project/get_projects`);
    return res;
  };

  export async function getActivities() {
    let res = await axiosInstance.get(`/projects/fetch/activities/group`)
    return res
}

export async function getConstructionProgress() {
    let responseData = await axiosInstance.post(`/progress/get_progress_activity_wise?activity_type=construction`)
    return responseData
}

export const getPartList = async () => {
    let responseData = await axiosInstance.get(`/part/get_parts`)
    return responseData
}

export const getTrackers = async () => {
    let res = await axiosInstance.get(`/tracker_row/get_count_tracker_type_wise_row_for_project`)
    return res
}

export const getCount = async (value: any) => {
    let res = await axiosInstance.post(`/progress/get_deployed_part_for_activity_in_block?activity_id=${value?.id}&part_id=${value?.part_id}`)
    return res
}

export const getbomlist = async (value?: any) => {
    let res = await axiosInstance.post(`/projects/bom-status/activitymilestone/`, {})
    return res
}
