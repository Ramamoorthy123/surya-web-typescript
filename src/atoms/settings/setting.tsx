import { atom } from "jotai";

interface Settings {
  userDetails: any; 
  projectList: any;  
}

const settingsAtoms = atom<Settings>({
    userDetails: {},  
    projectList: null,     
});

export const getUserData = atom(null, async (_, set, args) => {
  set(settingsAtoms, (prev) => ({ ...prev, userDetails: args })); 
});

export default settingsAtoms;
