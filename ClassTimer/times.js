const Schedules = {
    endOfSchool: "2025-05-22",
    mappings: {
        regularDay: ["Monday/Tuseday/Thursday/Friday", {
            regularDaySchedule: "Regular Day",
            regularDayAllMass: "Regular Day Mass",
        }],
        wednesday: ["Wednesday", {
            wednesdayClassMass: "Class Mass",
            wednesdayNoMass: "No Mass"
        }],
        weekend: ["Weekend", {
            saturday: "Saturday",
            sunday: "Sunday"
        }],
        /*
        debug: ["Debug (Not for Users)", {
            bugger: "Debugger"
        }]
        /*
        finalExams: ["S2 Final Exams", {
            mondayExam: "Monday",
            tusedayExam: "Tuseday",
            wednesdayExam: "Wednesday",
            thursdayExam: "Thursday"
        }]
            */
    },
    schedules: {
        regularDaySchedule: [
            ["BS", 0   , 755 ],
            ["1" , 800 , 920 ],
            ["2" , 925 , 1045],
            ["W" , 1050, 1120],
            ["3A", 1125, 1150],
            ["3B", 1155, 1220],
            ["3C", 1225, 1250],
            ["3D", 1255, 1320],
            ["4" , 1325, 1445],
            ["AS", 1445, 2359]
        ],
        wednesdayClassMass: [
            ["BS", 0   , 755 ],
            ["1" , 800 , 855 ],
            ["2" , 900 , 955 ],
            ["M|W" , 1000, 1045],
            ["3A", 1050, 1115],
            ["3B", 1120, 1145],
            ["3C", 1150, 1215],
            ["3D", 1220, 1245],
            ["4" , 1250, 1345],
            ["AS", 1350, 2359]
        ],
        regularDayAllMass: [
            ["BS", 0   , 755 ],
            ["1" , 800 , 905 ],
            ["2" , 910 , 1015 ],
            ["M" , 1020, 1130],
            ["3A", 1135, 1200],
            ["3B", 1205, 1230],
            ["3C", 1235, 1300],
            ["3D", 1305, 1330],
            ["4" , 1335, 1445],
            ["AS", 1450, 2359]
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
        ],
        saturday: [
            ["No School", 0, 2359],
        ],
        sunday: [
            ["No School", 0, 2359],
        ],
        bugger: [
            ["1", 0, 100],
            ["2", 1300, 2359]
        ]
        /*
        mondayExam: [
            ["BS"      , 0   , 755 ],
            ["G1 Prep" , 800 , 820 ],
            ["Break"   , 820 , 825 ],
            ["G1 Final", 825 , 945 ],
            ["Break"   , 945 , 950 ],
            ["G2 Prep" , 950 , 1010],
            ["Break"   , 1010, 1015],
            ["G2 Final", 1015, 1135],
            ["Break"   , 1135, 1140],
            ["R3 Prep" , 1140, 1200],
            ["AS"      , 1200, 2359]
        ],
        tusedayExam: [
            ["BS"      , 0   , 755 ],
            ["R1 Prep" , 800 , 820 ],
            ["Break"   , 820 , 825 ],
            ["R1 Final", 825 , 945 ],
            ["Break"   , 945 , 950 ],
            ["R2 Prep" , 950 , 1010],
            ["Break"   , 1010, 1015],
            ["R2 Final", 1015, 1135],
            ["Break"   , 1135, 1140],
            ["R4 Prep" , 1140, 1200],
            ["AS"      , 1200, 2359]
        ],
        wednesdayExam: [
            ["BS"       , 0   , 755 ],
            ["R3 Final" , 800 , 925 ],
            ["Break"    , 925 , 930 ],
            ["R4 Final" , 930 , 1050],
            ["Break"    , 1050, 1055],
            ["G3 Prep A", 1055, 1120],
            ["G3 Prep B", 1120, 1145],
            ["G3 Prep C", 1145, 1210],
            ["Break"    , 1210, 1215],
            ["G4 Prep"  , 1215, 1240],
            ["Sr. Walk" , 1245, 1310],
            ["Awards"   , 1310, 1420],
            ["AS"       , 1420, 2359]
        ],
        thursdayExam: [
            ["BS"      , 0   , 755 ],
            ["G3 Final", 800 , 920 ],
            ["Passing" , 920 , 925 ],
            ["G4 Final", 925 , 1045],
            ["Cleanout", 1050, 1130],
            ["AS"      , 1130, 2359]
        ]
            */
    }
};