const Schedules = {
    mappings: {
        regularDay: ["Monday/Tuseday/Thursday/Friday", {
            regularDaySchedule: "Regular Day",
            regularDayMass: "Regular Day Mass",
        }],
        wednesday: ["Wednesday", {
            wednesdayFullMass: "All-School Mass",
            wednesdayClassMass: "Class Mass",
            wednesdayNoMass: "No Mass"
        }]
    },
    schedules: {
        regularDaySchedule: [
            ["BS", 0   , 755 ],
            ["1" , 800 , 915 ],
            ["2" , 920 , 1035],
            ["W" , 1040, 1110],
            ["3A", 1115, 1140],
            ["3B", 1145, 1210],
            ["3C", 1215, 1240],
            ["3D", 1245, 1310],
            ["4" , 1315, 1430],
            ["AS", 1435, 2359]
        ],
        wednesdayClassMass: [
            ["BS", 0   , 755 ],
            ["1" , 800 , 855 ],
            ["2" , 900 , 955 ],
            ["W" , 1010, 1045],
            ["3A", 1050, 1115],
            ["3B", 1120, 1145],
            ["3C", 1150, 1215],
            ["3D", 1220, 1245],
            ["4" , 1250, 1345],
            ["AS", 1350, 2359]
        ],
        wednesdayNoMass: [
            ["BS", 0   , 755 ],
            ["1" , 800 , 900 ],
            ["2" , 905 , 1005],
            ["W" , 1010, 1040],
            ["3A", 1045, 1110],
            ["3B", 1115, 1140],
            ["3C", 1145, 1210],
            ["3D", 1215, 1240],
            ["4" , 1245, 1345],
            ["AS", 1350, 2359]
        ]
    }
};