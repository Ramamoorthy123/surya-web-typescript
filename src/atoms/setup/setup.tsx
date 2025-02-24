import { atom } from "jotai";
import { getallactivities, getbomlists, getCpCheckList } from "../../service/setup/setup";
import { getActivities, getConstructionProgress } from "../../service/dashboard/service";

interface Setup {
  cpChecklist: any[]; 
  qcChecklist: any[]; 
  bomList: any[];
  activityList: any;
  constructionList: any;
  progressList: any[]; 
}

const setupAtoms = atom<Setup>({
    cpChecklist: [],  
    qcChecklist: [],
    bomList: [],
    activityList: {},
    constructionList: {},
    progressList: []     
});

export const getcpChecklist = atom(null, async (_, set, _args) => {
    const res = await getCpCheckList()
  set(setupAtoms, (prev) => ({ ...prev, cpChecklist: res?.data })); 
});


export const fetchActivityList = atom(null, async (_, set, _args) => {
  const res = await getallactivities()
set(setupAtoms, (prev) => ({ ...prev, activityList: res?.data })); 
});


export const fetchbomdetails = atom(
  null,
  async (get, set, args) => {
      const res = await getbomlists();
      if(res) {
          set(setupAtoms, (prev) => ({ ...prev, bomList: res?.data }));
      }
  }
)

export const getActivity = atom(null, async (_, set, _args) => {
  const res = await getActivities()
if (res) {
  set(setupAtoms, (prev) => ({ ...prev, constructionList: res.data }));
}
});


export const getConstructionProgressList = atom(null, async (_, set, _args) => {
  const res = await getConstructionProgress();
if (res) {
  set(setupAtoms, (prev) => ({ ...prev, progressList: res.data }));
}
});

export default setupAtoms;
