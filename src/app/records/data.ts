// このファイルは自動生成されています。
// 生成元: lifesaver-ranking/_emit_data_ts.py
// 編集する場合は元データ（yagami_all_records.json）を更新してください。

export type Section = "ocean" | "pool";

export type EventRecord = {
  section: Section;
  event: string;
  category: string;
  gender: string;
  rank: number;
  time: string;
};

export type YearRecords = {
  year: string;
  records: EventRecord[];
};

export type AthleteRecords = {
  athlete: string;
  athleteEn: string;
  shortName: string;
  currentCategory: string;
  years: YearRecords[];
};

export const yagamiRecords: AthleteRecords[] = [
  {
    athlete: "矢上 結月",
    athleteEn: "Yuzuki Yagami",
    shortName: "結月",
    currentCategory: "U18女子",
    years: [
      { year: "2025", records: [
        { section: "ocean", event: "ビーチフラッグス", category: "U18", gender: "女子", rank: 13, time: "" },
        { section: "ocean", event: "ボードレース", category: "U18", gender: "女子", rank: 16, time: "" },
        { section: "ocean", event: "ビーチスプリント", category: "U18", gender: "女子", rank: 16, time: "" },
        { section: "ocean", event: "サーフレース", category: "U18", gender: "女子", rank: 26, time: "" },
        { section: "pool", event: "スーパーライフセーバー（200m）", category: "U18", gender: "女子", rank: 22, time: "3:52.41" },
        { section: "pool", event: "マネキンキャリー（50m）", category: "U18", gender: "女子", rank: 24, time: "55.79" },
        { section: "pool", event: "障害物スイム（200m）", category: "U18", gender: "女子", rank: 27, time: "3:19.42" },
        { section: "pool", event: "マネキンキャリー・ウィズフィン（100m）", category: "U18", gender: "女子", rank: 30, time: "1:33.95" },
        { section: "pool", event: "マネキントウ・ウィズフィン（100m）", category: "U18", gender: "女子", rank: 36, time: "1:34.34" },
      ] },
      { year: "2024", records: [
        { section: "pool", event: "マネキントウ", category: "U15", gender: "女子", rank: 15, time: "1:32.10" },
        { section: "pool", event: "マネキンキャリー", category: "U15", gender: "女子", rank: 17, time: "1:03.97" },
        { section: "pool", event: "障害物スイム", category: "U15", gender: "女子", rank: 25, time: "1:33.47" },
      ] },
      { year: "2022", records: [
        { section: "pool", event: "ラインスロー（10m）", category: "中学生", gender: "女子", rank: 1, time: "" },
        { section: "pool", event: "ラインスロー", category: "高校生", gender: "女子", rank: 1, time: "" },
        { section: "pool", event: "マネキンキャリー（50m）", category: "中学生", gender: "女子", rank: 7, time: "1:08.47" },
        { section: "pool", event: "マネキントウ", category: "中学生", gender: "女子", rank: 12, time: "1:40.64" },
        { section: "pool", event: "100m 平泳ぎ", category: "", gender: "女子", rank: 24, time: "1:39.02" },
      ] },
      { year: "2019", records: [
        { section: "ocean", event: "ビーチスプリント", category: "小学3-4年", gender: "女子", rank: 7, time: "" },
      ] },
    ],
  },
  {
    athlete: "矢上 陽葉",
    athleteEn: "Kiyoha Yagami",
    shortName: "陽葉",
    currentCategory: "U15女子",
    years: [
      { year: "2025", records: [
        { section: "ocean", event: "ビーチフラッグス", category: "U15", gender: "女子", rank: 1, time: "" },
        { section: "ocean", event: "ボードレース", category: "U15", gender: "女子", rank: 7, time: "" },
        { section: "ocean", event: "ユースオーシャンウーマン", category: "U15", gender: "女子", rank: 10, time: "" },
        { section: "ocean", event: "サーフレース", category: "U15", gender: "女子", rank: 12, time: "" },
        { section: "ocean", event: "ビーチスプリント", category: "U15", gender: "女子", rank: 13, time: "" },
        { section: "pool", event: "マネキンキャリー（50m）", category: "U15", gender: "女子", rank: 17, time: "48.97" },
        { section: "pool", event: "マネキンキャリー・ウィズフィン（100m）", category: "U15", gender: "女子", rank: 17, time: "1:24.41" },
        { section: "pool", event: "スーパーライフセーバー（200m）", category: "U18", gender: "女子", rank: 19, time: "3:34.41" },
        { section: "pool", event: "マネキントウ・ウィズフィン（100m）", category: "U15", gender: "女子", rank: 20, time: "1:27.72" },
        { section: "pool", event: "障害物スイム（200m）", category: "U18", gender: "女子", rank: 26, time: "2:59.39" },
        { section: "pool", event: "障害物スイム（100m）", category: "U15", gender: "女子", rank: 26, time: "1:19.40" },
      ] },
      { year: "2024", records: [
        { section: "ocean", event: "ビーチフラッグス", category: "U15", gender: "女子", rank: 2, time: "" },
        { section: "ocean", event: "ニッパーボードレース", category: "U15", gender: "女子", rank: 4, time: "" },
        { section: "ocean", event: "ビーチスプリント", category: "U15", gender: "女子", rank: 4, time: "" },
        { section: "ocean", event: "ビーチフラッグス", category: "U18", gender: "女子", rank: 5, time: "" },
        { section: "ocean", event: "ボードレース", category: "U18", gender: "女子", rank: 8, time: "" },
        { section: "pool", event: "ラインスロー", category: "U15", gender: "女子", rank: 2, time: "" },
        { section: "pool", event: "マネキンキャリー", category: "U15", gender: "女子", rank: 16, time: "53.94" },
        { section: "pool", event: "マネキントウ", category: "U15", gender: "女子", rank: 20, time: "1:37.74" },
        { section: "pool", event: "障害物スイム", category: "U15", gender: "女子", rank: 21, time: "1:19.74" },
      ] },
      { year: "2023", records: [
        { section: "ocean", event: "ニッパーボードレース", category: "U12", gender: "女子", rank: 1, time: "" },
        { section: "ocean", event: "ビーチフラッグス", category: "U12", gender: "女子", rank: 3, time: "" },
        { section: "ocean", event: "ビーチスプリント", category: "U12", gender: "女子", rank: 7, time: "" },
        { section: "ocean", event: "ビーチラン", category: "U12", gender: "女子", rank: 7, time: "" },
      ] },
      { year: "2022", records: [
        { section: "ocean", event: "ビーチフラッグス", category: "小学5-6年", gender: "女子", rank: 1, time: "" },
        { section: "ocean", event: "ニッパーボードレース", category: "小学5-6年", gender: "女子", rank: 2, time: "" },
        { section: "ocean", event: "ビーチスプリント", category: "小学5-6年", gender: "女子", rank: 7, time: "" },
        { section: "ocean", event: "ビーチラン", category: "小学5-6年", gender: "女子", rank: 8, time: "" },
        { section: "pool", event: "レスキューチューブトウ（100m）", category: "小学5-6年", gender: "女子", rank: 10, time: "1:34.82" },
        { section: "pool", event: "障害物スイム（50m）", category: "小学5-6年", gender: "女子", rank: 12, time: "39.51" },
      ] },
      { year: "2021", records: [
        { section: "ocean", event: "ニッパーボードレース", category: "小学3-4年", gender: "女子", rank: 1, time: "" },
        { section: "ocean", event: "ウェーディングレース", category: "", gender: "男子", rank: 4, time: "" },
        { section: "ocean", event: "ビーチフラッグス", category: "小学3-4年", gender: "女子", rank: 7, time: "" },
      ] },
      { year: "2019", records: [
        { section: "ocean", event: "ビーチフラッグス", category: "小学1-2年", gender: "女子", rank: 3, time: "" },
        { section: "ocean", event: "ビーチスプリント", category: "小学1-2年", gender: "女子", rank: 4, time: "" },
      ] },
    ],
  },
  {
    athlete: "矢上 賢尚",
    athleteEn: "Kenshow Yagami",
    shortName: "賢尚",
    currentCategory: "U8男子",
    years: [
      { year: "2025", records: [
        { section: "ocean", event: "ビーチフラッグス", category: "U8", gender: "男子", rank: 1, time: "" },
        { section: "ocean", event: "ウェーディングレース", category: "U8", gender: "男子", rank: 2, time: "" },
        { section: "ocean", event: "ニッパーボードレース", category: "U8", gender: "男子", rank: 2, time: "" },
        { section: "ocean", event: "ビーチスプリント", category: "U8", gender: "男子", rank: 3, time: "" },
        { section: "pool", event: "障害物スイム（50m）", category: "U8", gender: "男子", rank: 2, time: "45.54" },
        { section: "pool", event: "ジュニアチューブスイム（50m）", category: "U8", gender: "男子", rank: 3, time: "48.07" },
      ] },
      { year: "2024", records: [
        { section: "ocean", event: "ビーチフラッグス", category: "", gender: "男子", rank: 1, time: "" },
        { section: "ocean", event: "ニッパーボードレース", category: "", gender: "男子", rank: 3, time: "" },
        { section: "ocean", event: "ビーチスプリント", category: "", gender: "男子", rank: 3, time: "" },
        { section: "pool", event: "ジュニアチューブスイム", category: "", gender: "男子", rank: 7, time: "55.90" },
        { section: "pool", event: "障害物スイム", category: "", gender: "男子", rank: 8, time: "54.80" },
      ] },
    ],
  },
];

export type RankingRow = {
  rank: number;
  name: string;
  club: string;
  points: number;
  highlight: string;
};

export type SelfStanding = {
  rank: number;
  points: number;
  events: number;
} | null;

export type AthleteRankings = {
  shortName: string;
  categoryLabel: string;
  oceanTop: RankingRow[];
  poolTop: RankingRow[];
  totalTop: RankingRow[];
  self: {
    total: SelfStanding;
    ocean: SelfStanding;
    pool: SelfStanding;
  };
};

export const ranking2025: AthleteRankings[] = [
  {
    shortName: "結月",
    categoryLabel: "U18女子総合",
    totalTop: [
      { rank: 1, name: "槍田 愛", club: "西浜サーフライフセービングクラブ", points: 115, highlight: "" },
      { rank: 2, name: "千葉 まひる", club: "館山サーフライフセービングクラブ", points: 94, highlight: "館山勢" },
      { rank: 3, name: "中西 裕愛", club: "KITAJIMAQUATICS", points: 77, highlight: "" },
      { rank: 4, name: "花塚 聖奈", club: "西浜サーフライフセービングクラブ", points: 73, highlight: "" },
      { rank: 5, name: "橋本 香蓮", club: "日本体育大学荏原高等学校ライフセービングクラブ", points: 68, highlight: "" },
      { rank: 6, name: "大橋 絆", club: "日本体育大学荏原高等学校ライフセービングクラブ", points: 67, highlight: "" },
      { rank: 7, name: "成海 幸波", club: "館山サーフライフセービングクラブ", points: 65, highlight: "館山勢" },
      { rank: 8, name: "飯野 花梨", club: "十文字中学・高等学校ライフセービングクラブ", points: 58, highlight: "" },
      { rank: 9, name: "林 美穂", club: "十文字中学・高等学校ライフセービングクラブ", points: 54, highlight: "" },
      { rank: 10, name: "岸 愛姫", club: "日本体育大学荏原高等学校ライフセービングクラブ", points: 47, highlight: "" },
    ],
    oceanTop: [
      { rank: 1, name: "成海 幸波", club: "館山サーフライフセービングクラブ", points: 65, highlight: "館山勢" },
      { rank: 2, name: "槍田 愛", club: "西浜サーフライフセービングクラブ", points: 41, highlight: "" },
      { rank: 3, name: "千葉 まひる", club: "館山サーフライフセービングクラブ", points: 37, highlight: "館山勢" },
      { rank: 4, name: "花塚 聖奈", club: "西浜サーフライフセービングクラブ", points: 36, highlight: "" },
      { rank: 5, name: "佐藤 志帆子", club: "西浜サーフライフセービングクラブ", points: 34, highlight: "" },
      { rank: 6, name: "富田 優佳子", club: "西浜サーフライフセービングクラブ", points: 32, highlight: "" },
      { rank: 6, name: "岸 愛姫", club: "日本体育大学荏原高等学校ライフセービングクラブ", points: 32, highlight: "" },
      { rank: 8, name: "宍戸 晴奏", club: "成城学園高等学校ライフセービングクラブ", points: 31, highlight: "" },
      { rank: 9, name: "石黒 未波", club: "館山サーフライフセービングクラブ", points: 30, highlight: "館山勢" },
      { rank: 10, name: "永山 心愛", club: "成城学園高等学校ライフセービングクラブ", points: 28, highlight: "" },
    ],
    poolTop: [
      { rank: 1, name: "槍田 愛", club: "西浜サーフライフセービングクラブ", points: 74, highlight: "" },
      { rank: 2, name: "中西 裕愛", club: "KITAJIMAQUATICS", points: 59, highlight: "" },
      { rank: 3, name: "千葉 まひる", club: "館山サーフライフセービングクラブ", points: 57, highlight: "館山勢" },
      { rank: 4, name: "橋本 香蓮", club: "日本体育大学荏原高等学校ライフセービングクラブ", points: 52, highlight: "" },
      { rank: 5, name: "大橋 絆", club: "日本体育大学荏原高等学校ライフセービングクラブ", points: 51, highlight: "" },
      { rank: 6, name: "林 美穂", club: "十文字中学・高等学校ライフセービングクラブ", points: 40, highlight: "" },
      { rank: 7, name: "花塚 聖奈", club: "西浜サーフライフセービングクラブ", points: 37, highlight: "" },
      { rank: 8, name: "森田 真帆", club: "KITAJIMAQUATICS", points: 32, highlight: "" },
      { rank: 9, name: "飯野 花梨", club: "十文字中学・高等学校ライフセービングクラブ", points: 31, highlight: "" },
      { rank: 10, name: "田中 優那", club: "KITAJIMAQUATICS", points: 30, highlight: "" },
    ],
    self: {
      total: { rank: 53, points: 6, events: 3 },
      ocean: { rank: 43, points: 6, events: 3 },
      pool: null,
    },
  },
  {
    shortName: "陽葉",
    categoryLabel: "U15女子総合",
    totalTop: [
      { rank: 1, name: "髙田 琉衣", club: "湘南GoldenAgeアカデミー", points: 104, highlight: "" },
      { rank: 2, name: "鴨林 夏花", club: "西浜サーフライフセービングクラブ", points: 103, highlight: "" },
      { rank: 3, name: "藤﨑 笑佳", club: "西浜サーフライフセービングクラブ", points: 95, highlight: "" },
      { rank: 4, name: "柳 輝於", club: "KITAJIMAQUATICS", points: 83, highlight: "" },
      { rank: 5, name: "河端 詩央梨", club: "KITAJIMAQUATICS", points: 82, highlight: "" },
      { rank: 6, name: "塚根 小夏", club: "湘南GoldenAgeアカデミー", points: 76, highlight: "" },
      { rank: 7, name: "上野 美月", club: "西浜サーフライフセービングクラブ", points: 71, highlight: "" },
      { rank: 8, name: "古賀 夏美", club: "西浜サーフライフセービングクラブ", points: 62, highlight: "" },
      { rank: 9, name: "小池 侑依", club: "KITAJIMAQUATICS", points: 46, highlight: "" },
      { rank: 10, name: "矢上 陽葉", club: "館山サーフライフセービングクラブ", points: 42, highlight: "本人" },
    ],
    oceanTop: [
      { rank: 1, name: "鴨林 夏花", club: "西浜サーフライフセービングクラブ", points: 71, highlight: "" },
      { rank: 2, name: "髙田 琉衣", club: "湘南GoldenAgeアカデミー", points: 68, highlight: "" },
      { rank: 3, name: "上野 美月", club: "西浜サーフライフセービングクラブ", points: 62, highlight: "" },
      { rank: 4, name: "塚根 小夏", club: "湘南GoldenAgeアカデミー", points: 53, highlight: "" },
      { rank: 5, name: "矢上 陽葉", club: "館山サーフライフセービングクラブ", points: 42, highlight: "本人" },
      { rank: 6, name: "藤﨑 笑佳", club: "西浜サーフライフセービングクラブ", points: 39, highlight: "" },
      { rank: 7, name: "丸山 はやか", club: "鎌倉ライフガード", points: 33, highlight: "" },
      { rank: 8, name: "常盤 珠絆", club: "勝浦ライフセービングクラブ", points: 29, highlight: "" },
      { rank: 9, name: "谷中 渚瑠", club: "鎌倉ライフガード", points: 27, highlight: "" },
      { rank: 9, name: "河端 詩央梨", club: "KITAJIMAQUATICS", points: 27, highlight: "" },
    ],
    poolTop: [
      { rank: 1, name: "柳 輝於", club: "KITAJIMAQUATICS", points: 62, highlight: "" },
      { rank: 2, name: "藤﨑 笑佳", club: "西浜サーフライフセービングクラブ", points: 56, highlight: "" },
      { rank: 3, name: "河端 詩央梨", club: "KITAJIMAQUATICS", points: 55, highlight: "" },
      { rank: 4, name: "古賀 夏美", club: "西浜サーフライフセービングクラブ", points: 39, highlight: "" },
      { rank: 5, name: "髙田 琉衣", club: "湘南GoldenAgeアカデミー", points: 36, highlight: "" },
      { rank: 6, name: "小池 侑依", club: "KITAJIMAQUATICS", points: 35, highlight: "" },
      { rank: 7, name: "鈴木 萌那", club: "KITAJIMAQUATICS", points: 32, highlight: "" },
      { rank: 7, name: "鴨林 夏花", club: "西浜サーフライフセービングクラブ", points: 32, highlight: "" },
      { rank: 9, name: "髙松 澪", club: "K-AQUA", points: 30, highlight: "" },
      { rank: 10, name: "春日 あかり", club: "十文字中高", points: 29, highlight: "" },
    ],
    self: {
      total: { rank: 10, points: 42, events: 5 },
      ocean: { rank: 5, points: 42, events: 5 },
      pool: null,
    },
  },
  {
    shortName: "賢尚",
    categoryLabel: "U8男子総合",
    totalTop: [
      { rank: 1, name: "矢上 賢尚", club: "館山サーフライフセービングクラブ", points: 89, highlight: "本人" },
      { rank: 2, name: "山崎 貴大", club: "湯河原ライフセービングクラブ", points: 86, highlight: "" },
      { rank: 3, name: "河地 遼大", club: "湘南GoldenAgeアカデミー", points: 68, highlight: "" },
      { rank: 4, name: "大塚 理玄", club: "西浜サーフライフセービングクラブ", points: 66, highlight: "" },
      { rank: 5, name: "常盤 琉仁", club: "勝浦ライフセービングクラブ", points: 59, highlight: "" },
      { rank: 6, name: "佐藤 亙", club: "西浜サーフライフセービングクラブ", points: 57, highlight: "" },
      { rank: 7, name: "岡本 涼太", club: "館山サーフライフセービングクラブ", points: 49, highlight: "館山勢" },
      { rank: 8, name: "飯田 真凪", club: "西浜サーフライフセービングクラブ", points: 48, highlight: "" },
      { rank: 9, name: "高橋 海心", club: "湘南GoldenAgeアカデミー", points: 41, highlight: "" },
      { rank: 10, name: "古藤 大智", club: "西浜サーフライフセービングクラブ", points: 35, highlight: "" },
    ],
    oceanTop: [
      { rank: 1, name: "矢上 賢尚", club: "館山サーフライフセービングクラブ", points: 60, highlight: "本人" },
      { rank: 2, name: "山崎 貴大", club: "湯河原ライフセービングクラブ", points: 59, highlight: "" },
      { rank: 3, name: "岡本 涼太", club: "館山サーフライフセービングクラブ", points: 49, highlight: "館山勢" },
      { rank: 4, name: "飯田 真凪", club: "西浜サーフライフセービングクラブ", points: 48, highlight: "" },
      { rank: 5, name: "大塚 理玄", club: "西浜サーフライフセービングクラブ", points: 45, highlight: "" },
      { rank: 5, name: "河地 遼大", club: "湘南GoldenAgeアカデミー", points: 45, highlight: "" },
      { rank: 7, name: "佐藤 亙", club: "西浜サーフライフセービングクラブ", points: 42, highlight: "" },
      { rank: 8, name: "高橋 海心", club: "湘南GoldenAgeアカデミー", points: 41, highlight: "" },
      { rank: 9, name: "常盤 琉仁", club: "勝浦ライフセービングクラブ", points: 37, highlight: "" },
      { rank: 10, name: "マイヤーエーロン晟", club: "勝浦ライフセービングクラブ", points: 18, highlight: "" },
    ],
    poolTop: [
      { rank: 1, name: "外村 爽羽", club: "湘南GAA", points: 32, highlight: "" },
      { rank: 2, name: "矢上 賢尚", club: "館山サーフライフセービングクラブ", points: 29, highlight: "本人" },
      { rank: 3, name: "荒井 絢仁", club: "西浜SLSC", points: 28, highlight: "" },
      { rank: 4, name: "山崎 貴大", club: "湯河原ライフセービングクラブ", points: 27, highlight: "" },
      { rank: 5, name: "河地 遼大", club: "湘南GoldenAgeアカデミー", points: 23, highlight: "" },
      { rank: 6, name: "常盤 琉仁", club: "勝浦ライフセービングクラブ", points: 22, highlight: "" },
      { rank: 7, name: "大塚 理玄", club: "西浜サーフライフセービングクラブ", points: 21, highlight: "" },
      { rank: 8, name: "古藤 大智", club: "西浜サーフライフセービングクラブ", points: 18, highlight: "" },
      { rank: 9, name: "佐藤 亙", club: "西浜サーフライフセービングクラブ", points: 15, highlight: "" },
      { rank: 9, name: "森田 千瑛", club: "湘南GoldenAgeアカデミー", points: 15, highlight: "" },
    ],
    self: {
      total: { rank: 1, points: 89, events: 6 },
      ocean: { rank: 1, points: 60, events: 4 },
      pool: { rank: 2, points: 29, events: 2 },
    },
  },
];

export type CategoryRanking = {
  key: string;
  label: string;
  totalTop: RankingRow[];
  oceanTop: RankingRow[];
  poolTop: RankingRow[];
};

export const allRankings: CategoryRanking[] = [
  {
    key: "honsen_male",
    label: "全日本男子",
    totalTop: [
      { rank: 1, name: "新川 将吾", club: "西浜サーフライフセービングクラブ", points: 46, highlight: "" },
      { rank: 2, name: "園田 俊", club: "西浜サーフライフセービングクラブ", points: 43, highlight: "" },
      { rank: 3, name: "西山 俊", club: "茅ヶ崎サーフライフセービングクラブ", points: 31, highlight: "" },
      { rank: 4, name: "高須 快晴", club: "鹿嶋ライフガードチーム", points: 30, highlight: "" },
      { rank: 4, name: "森下 広大", club: "鴨川ライフセービングクラブ", points: 30, highlight: "" },
      { rank: 6, name: "浜地 櫂依", club: "西浜サーフライフセービングクラブ", points: 29, highlight: "" },
      { rank: 7, name: "小川 慶生", club: "大磯ライフセービングクラブ", points: 25, highlight: "" },
      { rank: 8, name: "和田 賢一", club: "淡路島ライフセービングクラブ", points: 24, highlight: "" },
      { rank: 8, name: "石田 周也", club: "湯河原ライフセービングクラブ", points: 24, highlight: "" },
      { rank: 10, name: "上野 凌", club: "西浜サーフライフセービングクラブ", points: 19, highlight: "" },
    ],
    oceanTop: [
      { rank: 1, name: "新川 将吾", club: "西浜サーフライフセービングクラブ", points: 46, highlight: "" },
      { rank: 2, name: "園田 俊", club: "西浜サーフライフセービングクラブ", points: 43, highlight: "" },
      { rank: 3, name: "西山 俊", club: "茅ヶ崎サーフライフセービングクラブ", points: 31, highlight: "" },
      { rank: 4, name: "高須 快晴", club: "鹿嶋ライフガードチーム", points: 30, highlight: "" },
      { rank: 4, name: "森下 広大", club: "鴨川ライフセービングクラブ", points: 30, highlight: "" },
      { rank: 6, name: "浜地 櫂依", club: "西浜サーフライフセービングクラブ", points: 29, highlight: "" },
      { rank: 7, name: "小川 慶生", club: "大磯ライフセービングクラブ", points: 25, highlight: "" },
      { rank: 8, name: "和田 賢一", club: "淡路島ライフセービングクラブ", points: 24, highlight: "" },
      { rank: 8, name: "石田 周也", club: "湯河原ライフセービングクラブ", points: 24, highlight: "" },
      { rank: 10, name: "上野 凌", club: "西浜サーフライフセービングクラブ", points: 19, highlight: "" },
    ],
    poolTop: [
    ],
  },
  {
    key: "honsen_female",
    label: "全日本女子",
    totalTop: [
      { rank: 1, name: "三井 結里花", club: "館山サーフライフセービングクラブ", points: 57, highlight: "館山勢" },
      { rank: 2, name: "富田 和佳子", club: "西浜サーフライフセービングクラブ", points: 48, highlight: "" },
      { rank: 3, name: "浜地 沙羅", club: "西浜サーフライフセービングクラブ", points: 41, highlight: "" },
      { rank: 4, name: "榎本 由里", club: "勝浦ライフセービングクラブ", points: 36, highlight: "" },
      { rank: 5, name: "石黒 七都", club: "下田ライフセービングクラブ", points: 31, highlight: "" },
      { rank: 6, name: "松島 颯音", club: "下田ライフセービングクラブ", points: 30, highlight: "" },
      { rank: 7, name: "正木 友海", club: "大磯ライフセービングクラブ", points: 28, highlight: "" },
      { rank: 8, name: "名須川 紗綾", club: "茅ヶ崎サーフライフセービングクラブ", points: 26, highlight: "" },
      { rank: 9, name: "塚根 小夏", club: "白浜ライフセービングクラブ", points: 23, highlight: "" },
      { rank: 10, name: "石塚 円香", club: "鴨川ライフセービングクラブ", points: 22, highlight: "" },
    ],
    oceanTop: [
      { rank: 1, name: "三井 結里花", club: "館山サーフライフセービングクラブ", points: 57, highlight: "館山勢" },
      { rank: 2, name: "富田 和佳子", club: "西浜サーフライフセービングクラブ", points: 48, highlight: "" },
      { rank: 3, name: "浜地 沙羅", club: "西浜サーフライフセービングクラブ", points: 41, highlight: "" },
      { rank: 4, name: "榎本 由里", club: "勝浦ライフセービングクラブ", points: 36, highlight: "" },
      { rank: 5, name: "石黒 七都", club: "下田ライフセービングクラブ", points: 31, highlight: "" },
      { rank: 6, name: "松島 颯音", club: "下田ライフセービングクラブ", points: 30, highlight: "" },
      { rank: 7, name: "正木 友海", club: "大磯ライフセービングクラブ", points: 28, highlight: "" },
      { rank: 8, name: "名須川 紗綾", club: "茅ヶ崎サーフライフセービングクラブ", points: 26, highlight: "" },
      { rank: 9, name: "塚根 小夏", club: "白浜ライフセービングクラブ", points: 23, highlight: "" },
      { rank: 10, name: "石塚 円香", club: "鴨川ライフセービングクラブ", points: 22, highlight: "" },
    ],
    poolTop: [
    ],
  },
  {
    key: "u18_male",
    label: "U18男子",
    totalTop: [
      { rank: 1, name: "浜地 櫂依", club: "西浜サーフライフセービングクラブ", points: 158, highlight: "" },
      { rank: 2, name: "高田 理世", club: "西浜サーフライフセービングクラブ", points: 130, highlight: "" },
      { rank: 3, name: "小松 壮", club: "館山サーフライフセービングクラブ", points: 126, highlight: "館山勢" },
      { rank: 4, name: "中村 孔信", club: "日本体育大学荏原高等学校ライフセービングクラブ", points: 111, highlight: "" },
      { rank: 5, name: "横矢 翔", club: "館山サーフライフセービングクラブ", points: 77, highlight: "館山勢" },
      { rank: 6, name: "西川 温人", club: "西浜サーフライフセービングクラブ", points: 70, highlight: "" },
      { rank: 7, name: "百田 梅吉", club: "KITAJIMAQUATICS", points: 66, highlight: "" },
      { rank: 8, name: "井上 大地", club: "西浜サーフライフセービングクラブ", points: 62, highlight: "" },
      { rank: 9, name: "青山 希助", club: "日本体育大学荏原高等学校ライフセービングクラブ", points: 60, highlight: "" },
      { rank: 10, name: "上野 佑太", club: "日本体育大学荏原高等学校ライフセービングクラブ", points: 57, highlight: "" },
    ],
    oceanTop: [
      { rank: 1, name: "高田 理世", club: "西浜サーフライフセービングクラブ", points: 74, highlight: "" },
      { rank: 2, name: "浜地 櫂依", club: "西浜サーフライフセービングクラブ", points: 71, highlight: "" },
      { rank: 3, name: "西川 温人", club: "西浜サーフライフセービングクラブ", points: 67, highlight: "" },
      { rank: 4, name: "井上 大地", club: "西浜サーフライフセービングクラブ", points: 45, highlight: "" },
      { rank: 5, name: "小松 壮", club: "館山サーフライフセービングクラブ", points: 44, highlight: "館山勢" },
      { rank: 6, name: "横矢 翔", club: "館山サーフライフセービングクラブ", points: 40, highlight: "館山勢" },
      { rank: 7, name: "田畑 佑笑", club: "西浜サーフライフセービングクラブ", points: 39, highlight: "" },
      { rank: 8, name: "池戸 真誉", club: "西浜サーフライフセービングクラブ", points: 38, highlight: "" },
      { rank: 9, name: "菅野 滉太", club: "西浜サーフライフセービングクラブ", points: 37, highlight: "" },
      { rank: 10, name: "中村 孔信", club: "日本体育大学荏原高等学校ライフセービングクラブ", points: 33, highlight: "" },
    ],
    poolTop: [
      { rank: 1, name: "浜地 櫂依", club: "西浜サーフライフセービングクラブ", points: 87, highlight: "" },
      { rank: 2, name: "小松 壮", club: "館山サーフライフセービングクラブ", points: 82, highlight: "館山勢" },
      { rank: 3, name: "中村 孔信", club: "日本体育大学荏原高等学校ライフセービングクラブ", points: 78, highlight: "" },
      { rank: 4, name: "高田 理世", club: "西浜サーフライフセービングクラブ", points: 56, highlight: "" },
      { rank: 5, name: "百田 梅吉", club: "KITAJIMAQUATICS", points: 54, highlight: "" },
      { rank: 6, name: "青山 希助", club: "日本体育大学荏原高等学校ライフセービングクラブ", points: 44, highlight: "" },
      { rank: 7, name: "横矢 翔", club: "館山サーフライフセービングクラブ", points: 37, highlight: "館山勢" },
      { rank: 8, name: "上野 佑太", club: "日本体育大学荏原高等学校ライフセービングクラブ", points: 36, highlight: "" },
      { rank: 9, name: "伊藤 一希", club: "日本体育大学荏原高等学校ライフセービングクラブ", points: 30, highlight: "" },
      { rank: 10, name: "井上 瑛太", club: "日本体育大学荏原高等学校ライフセービングクラブ", points: 29, highlight: "" },
    ],
  },
  {
    key: "u18_female",
    label: "U18女子",
    totalTop: [
      { rank: 1, name: "槍田 愛", club: "西浜サーフライフセービングクラブ", points: 115, highlight: "" },
      { rank: 2, name: "千葉 まひる", club: "館山サーフライフセービングクラブ", points: 94, highlight: "館山勢" },
      { rank: 3, name: "中西 裕愛", club: "KITAJIMAQUATICS", points: 77, highlight: "" },
      { rank: 4, name: "花塚 聖奈", club: "西浜サーフライフセービングクラブ", points: 73, highlight: "" },
      { rank: 5, name: "橋本 香蓮", club: "日本体育大学荏原高等学校ライフセービングクラブ", points: 68, highlight: "" },
      { rank: 6, name: "大橋 絆", club: "日本体育大学荏原高等学校ライフセービングクラブ", points: 67, highlight: "" },
      { rank: 7, name: "成海 幸波", club: "館山サーフライフセービングクラブ", points: 65, highlight: "館山勢" },
      { rank: 8, name: "飯野 花梨", club: "十文字中学・高等学校ライフセービングクラブ", points: 58, highlight: "" },
      { rank: 9, name: "林 美穂", club: "十文字中学・高等学校ライフセービングクラブ", points: 54, highlight: "" },
      { rank: 10, name: "岸 愛姫", club: "日本体育大学荏原高等学校ライフセービングクラブ", points: 47, highlight: "" },
    ],
    oceanTop: [
      { rank: 1, name: "成海 幸波", club: "館山サーフライフセービングクラブ", points: 65, highlight: "館山勢" },
      { rank: 2, name: "槍田 愛", club: "西浜サーフライフセービングクラブ", points: 41, highlight: "" },
      { rank: 3, name: "千葉 まひる", club: "館山サーフライフセービングクラブ", points: 37, highlight: "館山勢" },
      { rank: 4, name: "花塚 聖奈", club: "西浜サーフライフセービングクラブ", points: 36, highlight: "" },
      { rank: 5, name: "佐藤 志帆子", club: "西浜サーフライフセービングクラブ", points: 34, highlight: "" },
      { rank: 6, name: "富田 優佳子", club: "西浜サーフライフセービングクラブ", points: 32, highlight: "" },
      { rank: 6, name: "岸 愛姫", club: "日本体育大学荏原高等学校ライフセービングクラブ", points: 32, highlight: "" },
      { rank: 8, name: "宍戸 晴奏", club: "成城学園高等学校ライフセービングクラブ", points: 31, highlight: "" },
      { rank: 9, name: "石黒 未波", club: "館山サーフライフセービングクラブ", points: 30, highlight: "館山勢" },
      { rank: 10, name: "永山 心愛", club: "成城学園高等学校ライフセービングクラブ", points: 28, highlight: "" },
    ],
    poolTop: [
      { rank: 1, name: "槍田 愛", club: "西浜サーフライフセービングクラブ", points: 74, highlight: "" },
      { rank: 2, name: "中西 裕愛", club: "KITAJIMAQUATICS", points: 59, highlight: "" },
      { rank: 3, name: "千葉 まひる", club: "館山サーフライフセービングクラブ", points: 57, highlight: "館山勢" },
      { rank: 4, name: "橋本 香蓮", club: "日本体育大学荏原高等学校ライフセービングクラブ", points: 52, highlight: "" },
      { rank: 5, name: "大橋 絆", club: "日本体育大学荏原高等学校ライフセービングクラブ", points: 51, highlight: "" },
      { rank: 6, name: "林 美穂", club: "十文字中学・高等学校ライフセービングクラブ", points: 40, highlight: "" },
      { rank: 7, name: "花塚 聖奈", club: "西浜サーフライフセービングクラブ", points: 37, highlight: "" },
      { rank: 8, name: "森田 真帆", club: "KITAJIMAQUATICS", points: 32, highlight: "" },
      { rank: 9, name: "飯野 花梨", club: "十文字中学・高等学校ライフセービングクラブ", points: 31, highlight: "" },
      { rank: 10, name: "田中 優那", club: "KITAJIMAQUATICS", points: 30, highlight: "" },
    ],
  },
  {
    key: "u15_male",
    label: "U15男子",
    totalTop: [
      { rank: 1, name: "北川 成", club: "鎌倉ライフガード", points: 82, highlight: "" },
      { rank: 2, name: "寺地 晴之介", club: "湯河原ライフセービングクラブ", points: 78, highlight: "" },
      { rank: 2, name: "菅野 陽仁", club: "西浜サーフライフセービングクラブ", points: 78, highlight: "" },
      { rank: 4, name: "土谷 颯真", club: "西浜サーフライフセービングクラブ", points: 76, highlight: "" },
      { rank: 5, name: "北沢 泰雅", club: "鎌倉ライフガード", points: 72, highlight: "" },
      { rank: 6, name: "高木 秀征", club: "西浜サーフライフセービングクラブ", points: 67, highlight: "" },
      { rank: 7, name: "福田 諒", club: "KITAJIMAQUATICS", points: 61, highlight: "" },
      { rank: 8, name: "髙田 夏都", club: "KITAJIMAQUATICS", points: 59, highlight: "" },
      { rank: 9, name: "槍田 力", club: "西浜SLSC", points: 54, highlight: "" },
      { rank: 10, name: "木村 遼平", club: "K-AQUA", points: 52, highlight: "" },
    ],
    oceanTop: [
      { rank: 1, name: "土谷 颯真", club: "西浜サーフライフセービングクラブ", points: 51, highlight: "" },
      { rank: 2, name: "米林 志", club: "鎌倉ライフガード", points: 46, highlight: "" },
      { rank: 2, name: "谷 陽向", club: "湘南GoldenAgeアカデミー", points: 46, highlight: "" },
      { rank: 4, name: "寺地 晴之介", club: "湯河原ライフセービングクラブ", points: 41, highlight: "" },
      { rank: 4, name: "筒井 遼介", club: "湯河原ライフセービングクラブ", points: 41, highlight: "" },
      { rank: 6, name: "大野 快", club: "鎌倉ライフガード", points: 40, highlight: "" },
      { rank: 7, name: "高木 秀征", club: "西浜サーフライフセービングクラブ", points: 38, highlight: "" },
      { rank: 7, name: "北川 成", club: "鎌倉ライフガード", points: 38, highlight: "" },
      { rank: 9, name: "郷田 純一郎", club: "鎌倉ライフガード", points: 36, highlight: "" },
      { rank: 10, name: "岡田 岳歩", club: "湘南GoldenAgeアカデミー", points: 32, highlight: "" },
    ],
    poolTop: [
      { rank: 1, name: "槍田 力", club: "西浜SLSC", points: 54, highlight: "" },
      { rank: 1, name: "福田 諒", club: "KITAJIMAQUATICS", points: 54, highlight: "" },
      { rank: 3, name: "北沢 泰雅", club: "鎌倉ライフガード", points: 53, highlight: "" },
      { rank: 4, name: "木村 遼平", club: "K-AQUA", points: 52, highlight: "" },
      { rank: 5, name: "菅野 陽仁", club: "西浜サーフライフセービングクラブ", points: 48, highlight: "" },
      { rank: 6, name: "北川 成", club: "鎌倉ライフガード", points: 44, highlight: "" },
      { rank: 7, name: "寺地 晴之介", club: "湯河原ライフセービングクラブ", points: 37, highlight: "" },
      { rank: 8, name: "髙田 夏都", club: "KITAJIMAQUATICS", points: 32, highlight: "" },
      { rank: 9, name: "高木 秀征", club: "西浜サーフライフセービングクラブ", points: 29, highlight: "" },
      { rank: 10, name: "土谷 颯真", club: "西浜サーフライフセービングクラブ", points: 25, highlight: "" },
    ],
  },
  {
    key: "u15_female",
    label: "U15女子",
    totalTop: [
      { rank: 1, name: "髙田 琉衣", club: "湘南GoldenAgeアカデミー", points: 104, highlight: "" },
      { rank: 2, name: "鴨林 夏花", club: "西浜サーフライフセービングクラブ", points: 103, highlight: "" },
      { rank: 3, name: "藤﨑 笑佳", club: "西浜サーフライフセービングクラブ", points: 95, highlight: "" },
      { rank: 4, name: "柳 輝於", club: "KITAJIMAQUATICS", points: 83, highlight: "" },
      { rank: 5, name: "河端 詩央梨", club: "KITAJIMAQUATICS", points: 82, highlight: "" },
      { rank: 6, name: "塚根 小夏", club: "湘南GoldenAgeアカデミー", points: 76, highlight: "" },
      { rank: 7, name: "上野 美月", club: "西浜サーフライフセービングクラブ", points: 71, highlight: "" },
      { rank: 8, name: "古賀 夏美", club: "西浜サーフライフセービングクラブ", points: 62, highlight: "" },
      { rank: 9, name: "小池 侑依", club: "KITAJIMAQUATICS", points: 46, highlight: "" },
      { rank: 10, name: "矢上 陽葉", club: "館山サーフライフセービングクラブ", points: 42, highlight: "本人" },
    ],
    oceanTop: [
      { rank: 1, name: "鴨林 夏花", club: "西浜サーフライフセービングクラブ", points: 71, highlight: "" },
      { rank: 2, name: "髙田 琉衣", club: "湘南GoldenAgeアカデミー", points: 68, highlight: "" },
      { rank: 3, name: "上野 美月", club: "西浜サーフライフセービングクラブ", points: 62, highlight: "" },
      { rank: 4, name: "塚根 小夏", club: "湘南GoldenAgeアカデミー", points: 53, highlight: "" },
      { rank: 5, name: "矢上 陽葉", club: "館山サーフライフセービングクラブ", points: 42, highlight: "本人" },
      { rank: 6, name: "藤﨑 笑佳", club: "西浜サーフライフセービングクラブ", points: 39, highlight: "" },
      { rank: 7, name: "丸山 はやか", club: "鎌倉ライフガード", points: 33, highlight: "" },
      { rank: 8, name: "常盤 珠絆", club: "勝浦ライフセービングクラブ", points: 29, highlight: "" },
      { rank: 9, name: "谷中 渚瑠", club: "鎌倉ライフガード", points: 27, highlight: "" },
      { rank: 9, name: "河端 詩央梨", club: "KITAJIMAQUATICS", points: 27, highlight: "" },
    ],
    poolTop: [
      { rank: 1, name: "柳 輝於", club: "KITAJIMAQUATICS", points: 62, highlight: "" },
      { rank: 2, name: "藤﨑 笑佳", club: "西浜サーフライフセービングクラブ", points: 56, highlight: "" },
      { rank: 3, name: "河端 詩央梨", club: "KITAJIMAQUATICS", points: 55, highlight: "" },
      { rank: 4, name: "古賀 夏美", club: "西浜サーフライフセービングクラブ", points: 39, highlight: "" },
      { rank: 5, name: "髙田 琉衣", club: "湘南GoldenAgeアカデミー", points: 36, highlight: "" },
      { rank: 6, name: "小池 侑依", club: "KITAJIMAQUATICS", points: 35, highlight: "" },
      { rank: 7, name: "鈴木 萌那", club: "KITAJIMAQUATICS", points: 32, highlight: "" },
      { rank: 7, name: "鴨林 夏花", club: "西浜サーフライフセービングクラブ", points: 32, highlight: "" },
      { rank: 9, name: "髙松 澪", club: "K-AQUA", points: 30, highlight: "" },
      { rank: 10, name: "春日 あかり", club: "十文字中高", points: 29, highlight: "" },
    ],
  },
  {
    key: "u12_male",
    label: "U12男子",
    totalTop: [
      { rank: 1, name: "永野 大地", club: "牧之原ライフセービングクラブ", points: 95, highlight: "" },
      { rank: 2, name: "伏黒 泰世", club: "湘南ひらつかライフセービングクラブ", points: 69, highlight: "" },
      { rank: 3, name: "吉田 禮", club: "鎌倉ライフガード", points: 58, highlight: "" },
      { rank: 3, name: "阿部 拓真", club: "湘南GoldenAgeアカデミー", points: 58, highlight: "" },
      { rank: 5, name: "河地 泰典", club: "湘南GoldenAgeアカデミー", points: 57, highlight: "" },
      { rank: 6, name: "小谷 太一", club: "湘南GoldenAgeアカデミー", points: 48, highlight: "" },
      { rank: 7, name: "ミリナー ハリー", club: "湯河原ライフセービングクラブ", points: 43, highlight: "" },
      { rank: 8, name: "岡田 大和", club: "勝浦ライフセービングクラブ", points: 41, highlight: "" },
      { rank: 9, name: "橋本 健三", club: "鎌倉ライフガード", points: 40, highlight: "" },
      { rank: 10, name: "大野 友臣", club: "西浜サーフライフセービングクラブ", points: 38, highlight: "" },
    ],
    oceanTop: [
      { rank: 1, name: "永野 大地", club: "牧之原ライフセービングクラブ", points: 63, highlight: "" },
      { rank: 2, name: "伏黒 泰世", club: "湘南ひらつかライフセービングクラブ", points: 50, highlight: "" },
      { rank: 3, name: "ミリナー ハリー", club: "湯河原ライフセービングクラブ", points: 43, highlight: "" },
      { rank: 4, name: "岡田 大和", club: "勝浦ライフセービングクラブ", points: 41, highlight: "" },
      { rank: 5, name: "橋本 健三", club: "鎌倉ライフガード", points: 40, highlight: "" },
      { rank: 6, name: "小谷 太一", club: "湘南GoldenAgeアカデミー", points: 39, highlight: "" },
      { rank: 7, name: "河地 泰典", club: "湘南GoldenAgeアカデミー", points: 35, highlight: "" },
      { rank: 8, name: "吉田 禮", club: "鎌倉ライフガード", points: 32, highlight: "" },
      { rank: 9, name: "阿部 拓真", club: "湘南GoldenAgeアカデミー", points: 28, highlight: "" },
      { rank: 9, name: "岩本 銀士郎", club: "湯河原ライフセービングクラブ", points: 28, highlight: "" },
    ],
    poolTop: [
      { rank: 1, name: "永野 大地", club: "牧之原ライフセービングクラブ", points: 32, highlight: "" },
      { rank: 2, name: "阿部 拓真", club: "湘南GoldenAgeアカデミー", points: 30, highlight: "" },
      { rank: 3, name: "吉田 禮", club: "鎌倉ライフガード", points: 26, highlight: "" },
      { rank: 4, name: "河地 泰典", club: "湘南GoldenAgeアカデミー", points: 22, highlight: "" },
      { rank: 5, name: "伏黒 泰世", club: "湘南ひらつかライフセービングクラブ", points: 19, highlight: "" },
      { rank: 5, name: "坂本 拓海", club: "湘南ひらつかライフセービングクラブ", points: 19, highlight: "" },
      { rank: 5, name: "浅利 暁彦", club: "SSENSE", points: 19, highlight: "" },
      { rank: 8, name: "谷口 颯汰", club: "湘南GoldenAgeアカデミー", points: 18, highlight: "" },
      { rank: 9, name: "梨本 洸平", club: "下田LSC", points: 14, highlight: "" },
      { rank: 10, name: "大野 友臣", club: "西浜サーフライフセービングクラブ", points: 13, highlight: "" },
    ],
  },
  {
    key: "u12_female",
    label: "U12女子",
    totalTop: [
      { rank: 1, name: "常盤 咲来", club: "勝浦ライフセービングクラブ", points: 84, highlight: "" },
      { rank: 1, name: "草柳 凪咲", club: "湘南GoldenAgeアカデミー", points: 84, highlight: "" },
      { rank: 3, name: "内藤 希乃", club: "鎌倉ライフガード", points: 80, highlight: "" },
      { rank: 4, name: "井上 夏帆", club: "西浜サーフライフセービングクラブ", points: 67, highlight: "" },
      { rank: 4, name: "石原 沙天", club: "牧之原ライフセービングクラブ", points: 67, highlight: "" },
      { rank: 6, name: "木村 海音", club: "湘南GoldenAgeアカデミー", points: 64, highlight: "" },
      { rank: 7, name: "丸塚 心結", club: "西浜サーフライフセービングクラブ", points: 63, highlight: "" },
      { rank: 8, name: "伊藤 彩音", club: "湘南GoldenAgeアカデミー", points: 61, highlight: "" },
      { rank: 9, name: "松田 糸", club: "西浜サーフライフセービングクラブ", points: 53, highlight: "" },
      { rank: 10, name: "水野 真緒", club: "西浜サーフライフセービングクラブ", points: 45, highlight: "" },
    ],
    oceanTop: [
      { rank: 1, name: "常盤 咲来", club: "勝浦ライフセービングクラブ", points: 66, highlight: "" },
      { rank: 2, name: "伊藤 彩音", club: "湘南GoldenAgeアカデミー", points: 55, highlight: "" },
      { rank: 3, name: "丸塚 心結", club: "西浜サーフライフセービングクラブ", points: 52, highlight: "" },
      { rank: 3, name: "草柳 凪咲", club: "湘南GoldenAgeアカデミー", points: 52, highlight: "" },
      { rank: 5, name: "井上 夏帆", club: "西浜サーフライフセービングクラブ", points: 51, highlight: "" },
      { rank: 6, name: "内藤 希乃", club: "鎌倉ライフガード", points: 50, highlight: "" },
      { rank: 7, name: "水野 真緒", club: "西浜サーフライフセービングクラブ", points: 45, highlight: "" },
      { rank: 8, name: "木村 海音", club: "湘南GoldenAgeアカデミー", points: 40, highlight: "" },
      { rank: 8, name: "石原 沙天", club: "牧之原ライフセービングクラブ", points: 40, highlight: "" },
      { rank: 10, name: "清水 里夏", club: "勝浦ライフセービングクラブ", points: 33, highlight: "" },
    ],
    poolTop: [
      { rank: 1, name: "草柳 凪咲", club: "湘南GoldenAgeアカデミー", points: 32, highlight: "" },
      { rank: 2, name: "内藤 希乃", club: "鎌倉ライフガード", points: 30, highlight: "" },
      { rank: 3, name: "石原 沙天", club: "牧之原ライフセービングクラブ", points: 27, highlight: "" },
      { rank: 4, name: "谷口 陽菜", club: "湘南GoldenAgeアカデミー", points: 26, highlight: "" },
      { rank: 5, name: "木村 海音", club: "湘南GoldenAgeアカデミー", points: 24, highlight: "" },
      { rank: 6, name: "松田 糸", club: "西浜サーフライフセービングクラブ", points: 23, highlight: "" },
      { rank: 7, name: "常盤 咲来", club: "勝浦ライフセービングクラブ", points: 18, highlight: "" },
      { rank: 8, name: "秋田 桃花", club: "西浜SLSC", points: 17, highlight: "" },
      { rank: 9, name: "井上 夏帆", club: "西浜サーフライフセービングクラブ", points: 16, highlight: "" },
      { rank: 10, name: "石川 柑菜", club: "西浜SLSC", points: 14, highlight: "" },
    ],
  },
  {
    key: "u10_male",
    label: "U10男子",
    totalTop: [
      { rank: 1, name: "山崎 悠太", club: "湯河原ライフセービングクラブ", points: 64, highlight: "" },
      { rank: 2, name: "細田 海", club: "館山サーフライフセービングクラブ", points: 51, highlight: "館山勢" },
      { rank: 3, name: "村田 洋太郎", club: "KITAJIMAQUATICS", points: 48, highlight: "" },
      { rank: 4, name: "伏黒 粋世", club: "湘南ひらつかライフセービングクラブ", points: 46, highlight: "" },
      { rank: 5, name: "河地 創士", club: "湘南GoldenAgeアカデミー", points: 43, highlight: "" },
      { rank: 6, name: "ハンフリー飯田虎輝", club: "西浜サーフライフセービングクラブ", points: 41, highlight: "" },
      { rank: 7, name: "平山 蓮悟", club: "鎌倉ライフガード", points: 39, highlight: "" },
      { rank: 8, name: "村上 晴", club: "KITAJIMAQUATICS", points: 38, highlight: "" },
      { rank: 9, name: "細野 守浬", club: "湯河原ライフセービングクラブ", points: 36, highlight: "" },
      { rank: 10, name: "青木 櫓生", club: "湯河原ライフセービングクラブ", points: 35, highlight: "" },
    ],
    oceanTop: [
      { rank: 1, name: "細田 海", club: "館山サーフライフセービングクラブ", points: 51, highlight: "館山勢" },
      { rank: 2, name: "ハンフリー飯田虎輝", club: "西浜サーフライフセービングクラブ", points: 41, highlight: "" },
      { rank: 3, name: "平山 蓮悟", club: "鎌倉ライフガード", points: 39, highlight: "" },
      { rank: 4, name: "山崎 悠太", club: "湯河原ライフセービングクラブ", points: 37, highlight: "" },
      { rank: 5, name: "河地 創士", club: "湘南GoldenAgeアカデミー", points: 36, highlight: "" },
      { rank: 6, name: "上村 桜ノ介", club: "鎌倉ライフガード", points: 31, highlight: "" },
      { rank: 7, name: "草柳 昊志", club: "湘南GoldenAgeアカデミー", points: 30, highlight: "" },
      { rank: 8, name: "伏黒 粋世", club: "湘南ひらつかライフセービングクラブ", points: 29, highlight: "" },
      { rank: 9, name: "細野 守浬", club: "湯河原ライフセービングクラブ", points: 27, highlight: "" },
      { rank: 9, name: "谷 碧人", club: "湘南GoldenAgeアカデミー", points: 27, highlight: "" },
    ],
    poolTop: [
      { rank: 1, name: "村田 洋太郎", club: "KITAJIMAQUATICS", points: 32, highlight: "" },
      { rank: 2, name: "荒井 佑真", club: "西浜SLSC", points: 30, highlight: "" },
      { rank: 3, name: "山崎 悠太", club: "湯河原ライフセービングクラブ", points: 27, highlight: "" },
      { rank: 3, name: "村上 晴", club: "KITAJIMAQUATICS", points: 27, highlight: "" },
      { rank: 5, name: "坂本 悠真", club: "湘南ひらつかライフセービングクラブ", points: 20, highlight: "" },
      { rank: 6, name: "梅木 孝太郎", club: "盛岡LSC", points: 19, highlight: "" },
      { rank: 7, name: "伏黒 粋世", club: "湘南ひらつかライフセービングクラブ", points: 17, highlight: "" },
      { rank: 8, name: "青木 櫓生", club: "湯河原ライフセービングクラブ", points: 16, highlight: "" },
      { rank: 9, name: "橋本 青瑚", club: "西浜SLSC", points: 13, highlight: "" },
      { rank: 10, name: "宮上 稜正", club: "湘南GoldenAgeアカデミー", points: 12, highlight: "" },
    ],
  },
  {
    key: "u10_female",
    label: "U10女子",
    totalTop: [
      { rank: 1, name: "高野 紗莉", club: "湘南GoldenAgeアカデミー", points: 75, highlight: "" },
      { rank: 2, name: "塚根 春", club: "湘南GoldenAgeアカデミー", points: 68, highlight: "" },
      { rank: 3, name: "篠 瑠夏", club: "西浜サーフライフセービングクラブ", points: 67, highlight: "" },
      { rank: 4, name: "関澤 柚希", club: "湘南GoldenAgeアカデミー", points: 66, highlight: "" },
      { rank: 5, name: "石川 夏芽", club: "西浜サーフライフセービングクラブ", points: 65, highlight: "" },
      { rank: 6, name: "古藤 歌菜", club: "西浜サーフライフセービングクラブ", points: 61, highlight: "" },
      { rank: 7, name: "山中 風佳", club: "勝浦ライフセービングクラブ", points: 58, highlight: "" },
      { rank: 8, name: "富樫 いちの", club: "湯河原ライフセービングクラブ", points: 37, highlight: "" },
      { rank: 9, name: "高橋 衣央", club: "西浜SLSC", points: 31, highlight: "" },
      { rank: 10, name: "浅利 有紀", club: "SSENSE", points: 29, highlight: "" },
    ],
    oceanTop: [
      { rank: 1, name: "篠 瑠夏", club: "西浜サーフライフセービングクラブ", points: 60, highlight: "" },
      { rank: 2, name: "高野 紗莉", club: "湘南GoldenAgeアカデミー", points: 56, highlight: "" },
      { rank: 3, name: "塚根 春", club: "湘南GoldenAgeアカデミー", points: 52, highlight: "" },
      { rank: 4, name: "関澤 柚希", club: "湘南GoldenAgeアカデミー", points: 48, highlight: "" },
      { rank: 5, name: "石川 夏芽", club: "西浜サーフライフセービングクラブ", points: 41, highlight: "" },
      { rank: 6, name: "古藤 歌菜", club: "西浜サーフライフセービングクラブ", points: 37, highlight: "" },
      { rank: 6, name: "富樫 いちの", club: "湯河原ライフセービングクラブ", points: 37, highlight: "" },
      { rank: 8, name: "山中 風佳", club: "勝浦ライフセービングクラブ", points: 31, highlight: "" },
      { rank: 9, name: "マイヤー 千桜", club: "勝浦ライフセービングクラブ", points: 24, highlight: "" },
      { rank: 10, name: "篠 咲蘭", club: "西浜サーフライフセービングクラブ", points: 22, highlight: "" },
    ],
    poolTop: [
      { rank: 1, name: "高橋 衣央", club: "西浜SLSC", points: 31, highlight: "" },
      { rank: 2, name: "浅利 有紀", club: "SSENSE", points: 29, highlight: "" },
      { rank: 3, name: "山中 風佳", club: "勝浦ライフセービングクラブ", points: 27, highlight: "" },
      { rank: 4, name: "古藤 歌菜", club: "西浜サーフライフセービングクラブ", points: 24, highlight: "" },
      { rank: 4, name: "石川 夏芽", club: "西浜サーフライフセービングクラブ", points: 24, highlight: "" },
      { rank: 6, name: "山崎 なな", club: "柏崎ライフセービングクラブ", points: 20, highlight: "" },
      { rank: 7, name: "高野 紗莉", club: "湘南GoldenAgeアカデミー", points: 19, highlight: "" },
      { rank: 8, name: "関澤 柚希", club: "湘南GoldenAgeアカデミー", points: 18, highlight: "" },
      { rank: 9, name: "塚根 春", club: "湘南GoldenAgeアカデミー", points: 16, highlight: "" },
      { rank: 10, name: "尾内 奏波", club: "西浜サーフライフセービングクラブ", points: 13, highlight: "" },
    ],
  },
  {
    key: "u8_male",
    label: "U8男子",
    totalTop: [
      { rank: 1, name: "矢上 賢尚", club: "館山サーフライフセービングクラブ", points: 89, highlight: "本人" },
      { rank: 2, name: "山崎 貴大", club: "湯河原ライフセービングクラブ", points: 86, highlight: "" },
      { rank: 3, name: "河地 遼大", club: "湘南GoldenAgeアカデミー", points: 68, highlight: "" },
      { rank: 4, name: "大塚 理玄", club: "西浜サーフライフセービングクラブ", points: 66, highlight: "" },
      { rank: 5, name: "常盤 琉仁", club: "勝浦ライフセービングクラブ", points: 59, highlight: "" },
      { rank: 6, name: "佐藤 亙", club: "西浜サーフライフセービングクラブ", points: 57, highlight: "" },
      { rank: 7, name: "岡本 涼太", club: "館山サーフライフセービングクラブ", points: 49, highlight: "館山勢" },
      { rank: 8, name: "飯田 真凪", club: "西浜サーフライフセービングクラブ", points: 48, highlight: "" },
      { rank: 9, name: "高橋 海心", club: "湘南GoldenAgeアカデミー", points: 41, highlight: "" },
      { rank: 10, name: "古藤 大智", club: "西浜サーフライフセービングクラブ", points: 35, highlight: "" },
    ],
    oceanTop: [
      { rank: 1, name: "矢上 賢尚", club: "館山サーフライフセービングクラブ", points: 60, highlight: "本人" },
      { rank: 2, name: "山崎 貴大", club: "湯河原ライフセービングクラブ", points: 59, highlight: "" },
      { rank: 3, name: "岡本 涼太", club: "館山サーフライフセービングクラブ", points: 49, highlight: "館山勢" },
      { rank: 4, name: "飯田 真凪", club: "西浜サーフライフセービングクラブ", points: 48, highlight: "" },
      { rank: 5, name: "大塚 理玄", club: "西浜サーフライフセービングクラブ", points: 45, highlight: "" },
      { rank: 5, name: "河地 遼大", club: "湘南GoldenAgeアカデミー", points: 45, highlight: "" },
      { rank: 7, name: "佐藤 亙", club: "西浜サーフライフセービングクラブ", points: 42, highlight: "" },
      { rank: 8, name: "高橋 海心", club: "湘南GoldenAgeアカデミー", points: 41, highlight: "" },
      { rank: 9, name: "常盤 琉仁", club: "勝浦ライフセービングクラブ", points: 37, highlight: "" },
      { rank: 10, name: "マイヤーエーロン晟", club: "勝浦ライフセービングクラブ", points: 18, highlight: "" },
    ],
    poolTop: [
      { rank: 1, name: "外村 爽羽", club: "湘南GAA", points: 32, highlight: "" },
      { rank: 2, name: "矢上 賢尚", club: "館山サーフライフセービングクラブ", points: 29, highlight: "本人" },
      { rank: 3, name: "荒井 絢仁", club: "西浜SLSC", points: 28, highlight: "" },
      { rank: 4, name: "山崎 貴大", club: "湯河原ライフセービングクラブ", points: 27, highlight: "" },
      { rank: 5, name: "河地 遼大", club: "湘南GoldenAgeアカデミー", points: 23, highlight: "" },
      { rank: 6, name: "常盤 琉仁", club: "勝浦ライフセービングクラブ", points: 22, highlight: "" },
      { rank: 7, name: "大塚 理玄", club: "西浜サーフライフセービングクラブ", points: 21, highlight: "" },
      { rank: 8, name: "古藤 大智", club: "西浜サーフライフセービングクラブ", points: 18, highlight: "" },
      { rank: 9, name: "佐藤 亙", club: "西浜サーフライフセービングクラブ", points: 15, highlight: "" },
      { rank: 9, name: "森田 千瑛", club: "湘南GoldenAgeアカデミー", points: 15, highlight: "" },
    ],
  },
  {
    key: "u8_female",
    label: "U8女子",
    totalTop: [
      { rank: 1, name: "下総 葵花", club: "湘南GoldenAgeアカデミー", points: 89, highlight: "" },
      { rank: 2, name: "尾内 凪波", club: "西浜サーフライフセービングクラブ", points: 80, highlight: "" },
      { rank: 3, name: "斉藤 咲来", club: "湘南GoldenAgeアカデミー", points: 76, highlight: "" },
      { rank: 4, name: "桑原 瑠奈", club: "西浜サーフライフセービングクラブ", points: 72, highlight: "" },
      { rank: 5, name: "伊藤 彩恵", club: "湘南GoldenAgeアカデミー", points: 69, highlight: "" },
      { rank: 6, name: "石原 碧惟", club: "牧之原ライフセービングクラブ", points: 56, highlight: "" },
      { rank: 7, name: "中川 結麻", club: "館山サーフライフセービングクラブ", points: 38, highlight: "館山勢" },
      { rank: 8, name: "富樫 にか", club: "湯河原ライフセービングクラブ", points: 37, highlight: "" },
      { rank: 9, name: "村山 心咲", club: "西浜サーフライフセービングクラブ", points: 36, highlight: "" },
      { rank: 10, name: "佐藤 美和", club: "銚子LC", points: 32, highlight: "" },
    ],
    oceanTop: [
      { rank: 1, name: "桑原 瑠奈", club: "西浜サーフライフセービングクラブ", points: 60, highlight: "" },
      { rank: 2, name: "下総 葵花", club: "湘南GoldenAgeアカデミー", points: 59, highlight: "" },
      { rank: 3, name: "斉藤 咲来", club: "湘南GoldenAgeアカデミー", points: 54, highlight: "" },
      { rank: 4, name: "尾内 凪波", club: "西浜サーフライフセービングクラブ", points: 52, highlight: "" },
      { rank: 5, name: "伊藤 彩恵", club: "湘南GoldenAgeアカデミー", points: 47, highlight: "" },
      { rank: 6, name: "中川 結麻", club: "館山サーフライフセービングクラブ", points: 38, highlight: "館山勢" },
      { rank: 7, name: "富樫 にか", club: "湯河原ライフセービングクラブ", points: 37, highlight: "" },
      { rank: 8, name: "村山 心咲", club: "西浜サーフライフセービングクラブ", points: 36, highlight: "" },
      { rank: 9, name: "石原 碧惟", club: "牧之原ライフセービングクラブ", points: 30, highlight: "" },
      { rank: 10, name: "齋藤 瑛菜", club: "勝浦ライフセービングクラブ", points: 29, highlight: "" },
    ],
    poolTop: [
      { rank: 1, name: "佐藤 美和", club: "銚子LC", points: 32, highlight: "" },
      { rank: 2, name: "下総 葵花", club: "湘南GoldenAgeアカデミー", points: 30, highlight: "" },
      { rank: 3, name: "尾内 凪波", club: "西浜サーフライフセービングクラブ", points: 28, highlight: "" },
      { rank: 4, name: "石原 碧惟", club: "牧之原ライフセービングクラブ", points: 26, highlight: "" },
      { rank: 5, name: "伊藤 彩恵", club: "湘南GoldenAgeアカデミー", points: 22, highlight: "" },
      { rank: 5, name: "斉藤 咲来", club: "湘南GoldenAgeアカデミー", points: 22, highlight: "" },
      { rank: 7, name: "桑原 瑠奈", club: "西浜サーフライフセービングクラブ", points: 12, highlight: "" },
    ],
  },
];

export type BenchmarkRow = {
  rank: string;
  name: string;
  club: string;
  time: string;
};

export type BenchmarkEvent = {
  event: string;
  rows: BenchmarkRow[];
};

export type AthleteBenchmark = {
  shortName: string;
  athleteName: string;
  category: string;
  comment: string;
  events: BenchmarkEvent[];
};

export const benchmarks: AthleteBenchmark[] = [
  {
    shortName: "賢尚",
    athleteName: "矢上 賢尚",
    category: "2026年度はU10",
    comment: "U8で頂点に立った賢尚が、ひとつ上の階段へ。まずは入賞圏（16位以内）を確実に。",
    events: [
      { event: "障害物スイム（50m）", rows: [
        { rank: "1位", name: "村田 洋太郎", club: "K-AQUA", time: "30.89" },
        { rank: "3位", name: "村上 晴", club: "茅ヶ崎SLSC", time: "39.13" },
        { rank: "5位", name: "宮上 稜正", club: "湘南GAA", time: "41.44" },
        { rank: "8位", name: "橋本 青瑚", club: "西浜SLSC", time: "45.68" },
      ] },
      { event: "レスキューチューブトウ（100m）", rows: [
        { rank: "1位", name: "村田 洋太郎", club: "K-AQUA", time: "1:18.96" },
        { rank: "3位", name: "山崎 悠太", club: "湯河原LSC", time: "1:34.20" },
        { rank: "5位", name: "坂本 悠真", club: "湘南ひらつかLSC", time: "1:47.75" },
        { rank: "8位", name: "梅木 孝太郎", club: "盛岡LSC", time: "1:55.47" },
        { rank: "16位", name: "木村 岳", club: "西浜SLSC", time: "2:13.31" },
      ] },
    ],
  },
  {
    shortName: "陽葉",
    athleteName: "矢上 陽葉",
    category: "2026年度もU15",
    comment: "オーシャンでは全国5位（U15女子）。プールでも入賞圏（16位以内）に届けば、総合順位で大きく前進。",
    events: [
      { event: "障害物スイム（100m）", rows: [
        { rank: "1位", name: "河端 詩央梨", club: "K-AQUA", time: "1:06.76" },
        { rank: "3位", name: "小池 侑依", club: "K-AQUA", time: "1:08.81" },
        { rank: "5位", name: "鴨林 夏花", club: "西浜SLSC", time: "1:10.18" },
        { rank: "8位", name: "小関 友香理", club: "十文字中高", time: "1:12.07" },
        { rank: "16位", name: "古木 柚", club: "K-AQUA", time: "1:15.90" },
      ] },
      { event: "マネキンキャリー（50m）", rows: [
        { rank: "1位", name: "柳 輝於", club: "K-AQUA", time: "39.43" },
        { rank: "3位", name: "塚根 小夏", club: "湘南GAA", time: "40.27" },
        { rank: "5位", name: "髙松 澪", club: "K-AQUA", time: "42.16" },
        { rank: "8位", name: "鹿取 彩葉", club: "西浜SLSC", time: "43.81" },
        { rank: "16位", name: "古木 柚", club: "K-AQUA", time: "47.79" },
      ] },
      { event: "マネキンキャリー・ウィズフィン（100m）", rows: [
        { rank: "1位", name: "柳 輝於", club: "K-AQUA", time: "1:00.47" },
        { rank: "5位", name: "髙田 琉衣", club: "湘南GAA", time: "1:08.29" },
        { rank: "8位", name: "兼田 笑那", club: "西浜SLSC", time: "1:13.80" },
        { rank: "16位", name: "常盤 珠絆", club: "勝浦LSC", time: "1:21.76" },
      ] },
      { event: "マネキントウ・ウィズフィン（100m）", rows: [
        { rank: "3位", name: "春日 あかり", club: "十文字中高", time: "1:12.45" },
        { rank: "5位", name: "古賀 夏美", club: "西浜SLSC", time: "1:15.10" },
        { rank: "8位", name: "塚根 小夏", club: "湘南GAA", time: "1:17.09" },
      ] },
    ],
  },
  {
    shortName: "結月",
    athleteName: "矢上 結月",
    category: "2026年度もU18",
    comment: "U18女子の超激戦区。今期の200m障害物は2:59、16位の壁（2:44）まで15秒。一歩ずつ削っていく。",
    events: [
      { event: "障害物スイム（200m）", rows: [
        { rank: "1位", name: "橋本 香蓮", club: "日体大荏原LSC", time: "2:20.34" },
        { rank: "3位", name: "林 美穂", club: "十文字中高", time: "2:25.67" },
        { rank: "5位", name: "鹿取 彩葉", club: "西浜SLSC", time: "2:29.60" },
        { rank: "8位", name: "千葉 まひる", club: "館山SLSC", time: "2:34.75" },
        { rank: "16位", name: "佐藤 志帆子", club: "西浜SLSC", time: "2:44.91" },
      ] },
      { event: "マネキンキャリー（50m）", rows: [
        { rank: "1位", name: "大橋 絆", club: "日体大荏原LSC", time: "38.29" },
        { rank: "3位", name: "橋本 香蓮", club: "日体大荏原LSC", time: "40.91" },
        { rank: "5位", name: "中西 裕愛", club: "K-AQUA", time: "41.96" },
        { rank: "8位", name: "千葉 まひる", club: "館山SLSC", time: "44.53" },
        { rank: "16位", name: "大﨑 真央", club: "日体大荏原LSC", time: "48.07" },
      ] },
      { event: "マネキンキャリー・ウィズフィン（100m）", rows: [
        { rank: "1位", name: "槍田 愛", club: "西浜SLSC", time: "1:01.69" },
        { rank: "3位", name: "森田 真帆", club: "K-AQUA", time: "1:07.11" },
        { rank: "5位", name: "田中 優那", club: "K-AQUA", time: "1:09.22" },
        { rank: "8位", name: "山崎 さくら", club: "柏崎LSC", time: "1:14.35" },
        { rank: "16位", name: "鶴巻 小夏", club: "K-AQUA", time: "1:18.72" },
      ] },
      { event: "レスキューメドレー（100m）", rows: [
        { rank: "1位", name: "一関 ひより", club: "銚子LC", time: "1:16.68" },
        { rank: "3位", name: "橋本 香蓮", club: "日体大荏原LSC", time: "1:23.85" },
        { rank: "5位", name: "槍田 愛", club: "西浜SLSC", time: "1:26.12" },
        { rank: "8位", name: "中西 裕愛", club: "K-AQUA", time: "1:31.55" },
      ] },
      { event: "スーパーライフセーバー（200m）", rows: [
        { rank: "1位", name: "柳 輝於", club: "K-AQUA", time: "2:43.44" },
        { rank: "3位", name: "塚根 小夏", club: "湘南GAA", time: "2:52.83" },
        { rank: "5位", name: "鴨林 夏花", club: "西浜SLSC", time: "2:56.93" },
        { rank: "8位", name: "鈴木 萌那", club: "K-AQUA", time: "3:02.25" },
        { rank: "16位", name: "大﨑 真央", club: "日体大荏原LSC", time: "3:19.14" },
      ] },
      { event: "マネキントウ・ウィズフィン（100m）", rows: [
        { rank: "1位", name: "槍田 愛", club: "西浜SLSC", time: "1:07.85" },
        { rank: "3位", name: "森田 真帆", club: "K-AQUA", time: "1:14.25" },
        { rank: "5位", name: "田中 優那", club: "K-AQUA", time: "1:16.28" },
        { rank: "8位", name: "飯野 花梨", club: "十文字中高", time: "1:17.92" },
        { rank: "16位", name: "山崎 さくら", club: "柏崎LSC", time: "1:20.33" },
      ] },
    ],
  },
];
