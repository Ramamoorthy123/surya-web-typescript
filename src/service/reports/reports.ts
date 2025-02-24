import axiosInstance from "../../utils/axios"

export const getSummaryData = async (value: any) => {
    let res = await axiosInstance.post(`progress/test`, value)
    return res
}