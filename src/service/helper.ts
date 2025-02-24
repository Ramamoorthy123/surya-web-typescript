interface Activity {
  id: number;
  checklist_id: number;
  name: string;
  part_id: number;
  weight: number;
  weight_decimal: number;
  parent_activity_id: number | null;
  project_id: number;
}

interface ParentActivity {
  label: string;
  value: string;
  id: number;
  weight: number;
  part_id: number;
  children: { label: string; value: string, id: number, weight: number, part_id: number }[];
}

interface TrackerData {
  tracker_type: string;
  tracker_type_id: number;
  count: number;
}

interface GroupedTrackerData {
  tracker_type: string;
  count: number;
  children: TrackerData[];
}


 export function getRandomHexColor() {
    const hex = Math.floor(Math.random() * 16777215).toString(16);
    return `#${hex.padStart(6, '0')}`;
  }

  export const activityList = (data: Record<string, Activity>): ParentActivity[] => {
    const parentMap: Record<number, ParentActivity> = {};
    const result: ParentActivity[] = [];
  
    Object.values(data).forEach((item) => {
      if (item.parent_activity_id === null) {
        parentMap[item.id] = {
          label: item?.name,
          value: item?.name,
          weight: item?.weight,
          id: item?.id,
          part_id: item?.part_id,
          children: [],
        };
        result.push(parentMap[item.id]);
      } else {
        const parent = parentMap[item.parent_activity_id];
        if (parent) {
          parent.children.push({
            label: item.name,
            value: item.name, 
            id: item?.id,
            weight: item?.weight,
            part_id: item?.part_id
          });
        }
      }
    });
  
    return result;
  };

  
  export const addProgressToActivities = (activities: any[], progressData: any[]) => {
    return activities.map(activity => {
      const progressMatch = progressData.find(p => p.activity_id === activity.id);
  
      const updatedActivity = {
        ...activity,
        progress: progressMatch ? progressMatch.progress : null
      };
  
      if (updatedActivity.children && updatedActivity.children.length > 0) {
        updatedActivity.children = updatedActivity.children.map((child: any)=> {
          const childProgressMatch = progressData.find(p => p.activity_id === child.id);
          return {
            ...child,
            progress: childProgressMatch ? childProgressMatch.progress : null
          };
        });
      }
  
      return updatedActivity;
    });
  };
  
  export const getChildrenOnly = (data: any[]) => {
    return data.flatMap((parent) => {
      return parent.children && parent.children.length > 0 ? parent.children : [];
    });
  };

 export const calculateWeightedAverageProgress = (data: { weight: number; progress: number; }[]) => {
    const totalWeightedProgress = data.reduce((acc, item) => acc + item.weight * item.progress, 0);
    const totalWeight = data.reduce((acc, item) => acc + item.weight, 0);

    return totalWeight > 0 ? (totalWeightedProgress / totalWeight) : 0;
};


export const groupByTrackerPrefix = (data: TrackerData[]): GroupedTrackerData[] => {
  const grouped: { [key: string]: GroupedTrackerData } = {};

  data.forEach(item => {
      const prefix = item.tracker_type.split('_').slice(0, 2).join('_');

      if (!grouped[prefix]) {
          grouped[prefix] = {
              tracker_type: prefix,  
              count: 0,              
              children: []           
          };
      }

      grouped[prefix].children.push(item);

      grouped[prefix].count += item.count;
  });

  return Object.values(grouped);
};

export const addConstructionName = (firstArr: any[], constructionObj: any) => {
  return firstArr.map(item => {
    const distributionMatch = constructionObj?.[item?.distribution];
    const installationMatch = constructionObj?.[item?.installed];

    let updatedItem = { ...item };

    if (distributionMatch) {
      updatedItem.distribution_name = distributionMatch.name;
    }

    if (installationMatch) {
      updatedItem.installed_name = installationMatch.name;
    }

    return updatedItem; 
  });
};



         