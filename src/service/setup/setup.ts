import axiosInstance from "../../utils/axios"

export const getCpCheckList = async () => {
    let res = await axiosInstance.get(`/tracker/get_tracker_types`,)
    return res
}

export async function getallactivities() {
    let res = await axiosInstance.get(`/projects/fetch/activities/group`)
    return res
}

export const getbomlists = async (value?: any) => {
    let res = await axiosInstance.get(`projects/activitymilestone`)
    return res
}
