import { atom } from "jotai";
import { getActivities, getConstructionProgress } from "../../service/dashboard/service";
import { getSummaryData } from "../../service/reports/reports";

interface Setup {
  constructionList: any;
  progressList: any[];
  summaryData: any[] 
}

const reportsAtoms = atom<Setup>({
    constructionList: {},
    progressList: [],
    summaryData: []     
});

export const getActivity = atom(null, async (_, set, _args) => {
    const res = await getActivities()
    if (res) {
    set(reportsAtoms, (prev) => ({ ...prev, constructionList: res.data }));
    }
});


export const getConstructionProgressList = atom(null, async (_, set, _args) => {
    const res = await getConstructionProgress();
    if (res) {
    set(reportsAtoms, (prev) => ({ ...prev, progressList: res.data }));
    }
});


export const fetchSummaryList = atom(null, async (_, set, args) => {
    const res = await getSummaryData(args);
    if (res) {
    set(reportsAtoms, (prev) => ({ ...prev, summaryData: res.data }));
    }
});

export default reportsAtoms;
