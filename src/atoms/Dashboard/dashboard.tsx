import { atom } from "jotai";
import { getActivities, getbomlist, getConstructionProgress, getCount, getPartList, getProjectList, getTrackers } from "../../service/dashboard/service";
import axiosInstance from "../../utils/axios";

interface DashboardView {
 projectList: any[],
 constructionList: any,
 progressList: any[],
 partList: any[],
 trackerList: any[],
 currentCount: any,
 svgMap: string,
 bomList: any[]
}

const dashboardAtoms = atom<DashboardView>({
    projectList: [],
    constructionList: {},
    progressList: [],
    partList: [],
    trackerList: [],
    currentCount: {},
    svgMap: '',
    bomList: []
  });

export const getProject = atom(null, async (_, set, _args) => {
    const res = await getProjectList()
  if (res) {
    set(dashboardAtoms, (prev) => ({ ...prev, projectList: res.data }));
  }
});

export const getActivity = atom(null, async (_, set, _args) => {
    const res = await getActivities()
  if (res) {
    set(dashboardAtoms, (prev) => ({ ...prev, constructionList: res.data }));
  }
});


export const getConstructionProgressList = atom(null, async (_, set, _args) => {
    const res = await getConstructionProgress();
  if (res) {
    set(dashboardAtoms, (prev) => ({ ...prev, progressList: res.data }));
  }
});

export const fetchPartsAtom = atom(
    null,
    async(get, set, args) => {
        let res = await getPartList()
        if(res) {
            set(dashboardAtoms, (prev) => ({ ...prev, partList: res.data }));
        }
    }
)

export const fetchTrackers = atom(
    null,
    async (get, set, args) => {
        const res = await getTrackers()
        if(res) {
            set(dashboardAtoms, (prev) => ({ ...prev, trackerList: res.data }));
        }
    }
)

export const fetchCount = atom(
    null,
    async (get, set, args) => {
        let res = await getCount(args);
        if(res) {
            set(dashboardAtoms, (prev) => ({ ...prev, currentCount: res.data }));
        }
    }
)

export const fetchMapRender = atom(
    null,
    async (get, set, args) => {
        let res = await axiosInstance.get(`/projects/svg_details`)
        let tempRes = await axiosInstance.get(`/file_upload/download?id=${res.data?.upload_id}`)
        let newRes = await fetch(tempRes.data)
        let text = await newRes.text()
        if(text) {
            set(dashboardAtoms, (prev) => ({ ...prev, svgMap: text }));
        }
    }
)

export const fetchbomdetails = atom(
    null,
    async (get, set, args) => {
        const res = await getbomlist()
        if(res) {
            set(dashboardAtoms, (prev) => ({ ...prev, bomList: res?.data }));
        }
    }
)



export default dashboardAtoms;
