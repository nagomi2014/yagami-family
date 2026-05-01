// 水泳資格級（日本水泳連盟 2025年度）
// 矢上家3きょうだいの年代に絞ったデータ
// 出典: https://www.aquatics.or.jp/swim/

export type GradeClass = "AA" | "A" | "B";

export type GradeRow = {
  cls: GradeClass;
  num: number;
  time: string;
};

export type DistanceGrade = {
  distance: string;       // "50m自由形" など
  current: string;        // 本人の現在タイム
  currentLevel: string;   // "B5級" など
  comment: string;        // "A6級まで0.92秒" など
  grades: GradeRow[];
};

export type AthleteSwimGrades = {
  shortName: string;
  athleteName: string;
  ageLabel: string;       // "9歳（小4）" など
  categoryLabel: string;  // "男子9歳" など
  distances: DistanceGrade[];
};

// 男子9歳 50m自由形（賢尚）
const grades_male9_50m: GradeRow[] = [
  { cls: "AA", num: 14, time: "29.61" },
  { cls: "AA", num: 13, time: "30.06" },
  { cls: "AA", num: 12, time: "30.50" },
  { cls: "AA", num: 11, time: "30.95" },
  { cls: "A", num: 10, time: "32.37" },
  { cls: "A", num: 9, time: "33.80" },
  { cls: "A", num: 8, time: "35.22" },
  { cls: "A", num: 7, time: "36.65" },
  { cls: "A", num: 6, time: "38.08" },
  { cls: "B", num: 5, time: "39.50" },
  { cls: "B", num: 4, time: "40.93" },
  { cls: "B", num: 3, time: "42.35" },
  { cls: "B", num: 2, time: "43.78" },
  { cls: "B", num: 1, time: "45.21" },
];

// 女子14歳（陽葉）
const grades_female14_50m: GradeRow[] = [
  { cls: "AA", num: 14, time: "25.63" },
  { cls: "AA", num: 13, time: "26.02" },
  { cls: "AA", num: 12, time: "26.40" },
  { cls: "AA", num: 11, time: "26.79" },
  { cls: "A", num: 10, time: "27.64" },
  { cls: "A", num: 9, time: "28.50" },
  { cls: "A", num: 8, time: "29.36" },
  { cls: "A", num: 7, time: "30.22" },
  { cls: "A", num: 6, time: "31.08" },
  { cls: "B", num: 5, time: "31.93" },
  { cls: "B", num: 4, time: "32.79" },
  { cls: "B", num: 3, time: "33.65" },
  { cls: "B", num: 2, time: "34.51" },
  { cls: "B", num: 1, time: "35.37" },
];
const grades_female14_100m: GradeRow[] = [
  { cls: "AA", num: 14, time: "55.70" },
  { cls: "AA", num: 13, time: "56.56" },
  { cls: "AA", num: 12, time: "57.42" },
  { cls: "AA", num: 11, time: "58.28" },
  { cls: "A", num: 10, time: "1:00.15" },
  { cls: "A", num: 9, time: "1:02.02" },
  { cls: "A", num: 8, time: "1:03.89" },
  { cls: "A", num: 7, time: "1:05.76" },
  { cls: "A", num: 6, time: "1:07.63" },
  { cls: "B", num: 5, time: "1:09.50" },
  { cls: "B", num: 4, time: "1:11.37" },
  { cls: "B", num: 3, time: "1:13.24" },
  { cls: "B", num: 2, time: "1:15.11" },
  { cls: "B", num: 1, time: "1:16.98" },
];
const grades_female14_400m: GradeRow[] = [
  { cls: "AA", num: 14, time: "4:13.08" },
  { cls: "AA", num: 13, time: "4:16.40" },
  { cls: "AA", num: 12, time: "4:19.72" },
  { cls: "AA", num: 11, time: "4:23.04" },
  { cls: "A", num: 10, time: "4:32.03" },
  { cls: "A", num: 9, time: "4:41.03" },
  { cls: "A", num: 8, time: "4:50.03" },
  { cls: "A", num: 7, time: "4:59.03" },
  { cls: "A", num: 6, time: "5:08.03" },
  { cls: "B", num: 5, time: "5:17.02" },
  { cls: "B", num: 4, time: "5:26.02" },
  { cls: "B", num: 3, time: "5:35.02" },
  { cls: "B", num: 2, time: "5:44.02" },
  { cls: "B", num: 1, time: "5:53.02" },
];

// 女子17-18歳（結月）
const grades_female17_50m: GradeRow[] = [
  { cls: "AA", num: 14, time: "24.86" },
  { cls: "AA", num: 13, time: "25.31" },
  { cls: "AA", num: 12, time: "25.76" },
  { cls: "AA", num: 11, time: "26.21" },
  { cls: "A", num: 10, time: "27.02" },
  { cls: "A", num: 9, time: "27.84" },
  { cls: "A", num: 8, time: "28.66" },
  { cls: "A", num: 7, time: "29.47" },
  { cls: "A", num: 6, time: "30.29" },
  { cls: "B", num: 5, time: "31.11" },
  { cls: "B", num: 4, time: "31.92" },
  { cls: "B", num: 3, time: "32.74" },
  { cls: "B", num: 2, time: "33.56" },
  { cls: "B", num: 1, time: "34.38" },
];
const grades_female17_100m: GradeRow[] = [
  { cls: "AA", num: 14, time: "54.08" },
  { cls: "AA", num: 13, time: "55.04" },
  { cls: "AA", num: 12, time: "56.00" },
  { cls: "AA", num: 11, time: "56.97" },
  { cls: "A", num: 10, time: "58.75" },
  { cls: "A", num: 9, time: "1:00.53" },
  { cls: "A", num: 8, time: "1:02.32" },
  { cls: "A", num: 7, time: "1:04.10" },
  { cls: "A", num: 6, time: "1:05.89" },
  { cls: "B", num: 5, time: "1:07.67" },
  { cls: "B", num: 4, time: "1:09.45" },
  { cls: "B", num: 3, time: "1:11.24" },
  { cls: "B", num: 2, time: "1:13.02" },
  { cls: "B", num: 1, time: "1:14.81" },
];
const grades_female17_400m: GradeRow[] = [
  { cls: "AA", num: 14, time: "4:07.04" },
  { cls: "AA", num: 13, time: "4:10.49" },
  { cls: "AA", num: 12, time: "4:13.94" },
  { cls: "AA", num: 11, time: "4:17.40" },
  { cls: "A", num: 10, time: "4:25.96" },
  { cls: "A", num: 9, time: "4:34.53" },
  { cls: "A", num: 8, time: "4:43.10" },
  { cls: "A", num: 7, time: "4:51.67" },
  { cls: "A", num: 6, time: "5:00.24" },
  { cls: "B", num: 5, time: "5:08.80" },
  { cls: "B", num: 4, time: "5:17.37" },
  { cls: "B", num: 3, time: "5:25.94" },
  { cls: "B", num: 2, time: "5:34.51" },
  { cls: "B", num: 1, time: "5:43.08" },
];

export const yagamiSwimGrades: AthleteSwimGrades[] = [
  {
    shortName: "賢尚",
    athleteName: "矢上 賢尚",
    ageLabel: "小学3年生",
    categoryLabel: "男子9歳（資格級基準）",
    distances: [
      {
        distance: "50m自由形",
        current: "39.00",
        currentLevel: "B5級",
        comment: "A6級（38.08秒）まで残り 0.92秒",
        grades: grades_male9_50m,
      },
    ],
  },
  {
    shortName: "陽葉",
    athleteName: "矢上 陽葉",
    ageLabel: "14歳（中2）",
    categoryLabel: "女子14歳",
    distances: [
      {
        distance: "50m自由形",
        current: "32.00",
        currentLevel: "B5級",
        comment: "B4級（32.79秒）クリア間近、A6級（31.08秒）まで残り 0.92秒",
        grades: grades_female14_50m,
      },
      {
        distance: "100m自由形",
        current: "1:13.00",
        currentLevel: "B3級",
        comment: "B3級（1:13.24）クリア！次はB2級（1:11.37秒）まで残り 1.63秒",
        grades: grades_female14_100m,
      },
      {
        distance: "400m自由形",
        current: "5:40.00",
        currentLevel: "B2級",
        comment: "B2級（5:44.02）クリア！次はB3級（5:35.02）まで残り 5.0秒",
        grades: grades_female14_400m,
      },
    ],
  },
  {
    shortName: "結月",
    athleteName: "矢上 結月",
    ageLabel: "17歳（高2）",
    categoryLabel: "女子17-18歳",
    distances: [
      {
        distance: "50m自由形",
        current: "37.00",
        currentLevel: "資格級前",
        comment: "B1級（34.38秒）まで残り 2.62秒。まずはB1級突破を目指す",
        grades: grades_female17_50m,
      },
      {
        distance: "100m自由形",
        current: "1:24.00",
        currentLevel: "資格級前",
        comment: "B1級（1:14.81）まで残り 9.19秒。長期目標",
        grades: grades_female17_100m,
      },
      {
        distance: "400m自由形",
        current: "6:28.00",
        currentLevel: "資格級前",
        comment: "B1級（5:43.08）まで残り 44.92秒。距離系は伸びしろが大きい",
        grades: grades_female17_400m,
      },
    ],
  },
];
