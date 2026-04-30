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

export type AthleteRankings = {
  shortName: string;
  categoryLabel: string;
  oceanTop: RankingRow[];
  poolTop: RankingRow[];
  totalTop: RankingRow[];
};

export const ranking2025: AthleteRankings[] = [
  {
    shortName: "結月",
    categoryLabel: "U18女子総合",
    oceanTop: [
      { rank: 1, name: "成海 幸波", club: "館山SLSC", points: 65, highlight: "" },
      { rank: 2, name: "槍田 愛", club: "西浜SLSC", points: 41, highlight: "" },
      { rank: 3, name: "藤﨑 笑佳", club: "西浜SLSC", points: 39, highlight: "" },
      { rank: 4, name: "千葉 まひる", club: "館山SLSC", points: 37, highlight: "" },
      { rank: 5, name: "花塚 聖奈", club: "西浜SLSC", points: 36, highlight: "" },
      { rank: 6, name: "佐藤 志帆子", club: "西浜SLSC", points: 34, highlight: "" },
      { rank: 7, name: "富田 優佳子", club: "西浜SLSC", points: 32, highlight: "" },
      { rank: 8, name: "塚根 小夏", club: "湘南GAA", points: 32, highlight: "" },
      { rank: 9, name: "岸 愛姫", club: "日体大荏原", points: 32, highlight: "" },
      { rank: 10, name: "宍戸 晴奏", club: "成城学園", points: 31, highlight: "" },
    ],
    poolTop: [
      { rank: 1, name: "槍田 愛", club: "西浜SLSC", points: 74, highlight: "" },
      { rank: 2, name: "中西 裕愛", club: "K-AQUA", points: 59, highlight: "" },
      { rank: 3, name: "千葉 まひる", club: "館山SLSC", points: 57, highlight: "" },
      { rank: 4, name: "橋本 香蓮", club: "日体大荏原", points: 52, highlight: "" },
      { rank: 5, name: "大橋 絆", club: "日体大荏原", points: 51, highlight: "" },
      { rank: 6, name: "河端 詩央梨", club: "K-AQUA", points: 41, highlight: "" },
      { rank: 7, name: "林 美穂", club: "十文字中高", points: 40, highlight: "" },
      { rank: 8, name: "花塚 聖奈", club: "西浜SLSC", points: 37, highlight: "" },
      { rank: 9, name: "森田 真帆", club: "K-AQUA", points: 32, highlight: "" },
      { rank: 10, name: "飯野 花梨", club: "十文字中高", points: 31, highlight: "" },
    ],
    totalTop: [
      { rank: 1, name: "槍田 愛", club: "西浜SLSC", points: 115, highlight: "" },
      { rank: 2, name: "千葉 まひる", club: "館山SLSC", points: 94, highlight: "館山勢" },
      { rank: 3, name: "中西 裕愛", club: "K-AQUA", points: 77, highlight: "" },
      { rank: 4, name: "花塚 聖奈", club: "西浜SLSC", points: 73, highlight: "" },
      { rank: 5, name: "橋本 香蓮", club: "日体大荏原", points: 68, highlight: "" },
      { rank: 6, name: "大橋 絆", club: "日体大荏原", points: 67, highlight: "" },
      { rank: 7, name: "成海 幸波", club: "館山SLSC", points: 65, highlight: "館山勢" },
      { rank: 8, name: "鴨林 夏花", club: "西浜SLSC", points: 60, highlight: "" },
      { rank: 9, name: "飯野 花梨", club: "十文字中高", points: 58, highlight: "" },
      { rank: 10, name: "藤﨑 笑佳", club: "西浜SLSC", points: 57, highlight: "" },
    ],
  },
  {
    shortName: "陽葉",
    categoryLabel: "U15女子総合",
    oceanTop: [
      { rank: 1, name: "髙田 琉衣", club: "湘南GAA", points: 68, highlight: "" },
      { rank: 2, name: "上野 美月", club: "西浜SLSC", points: 62, highlight: "" },
      { rank: 3, name: "鴨林 夏花", club: "西浜SLSC", points: 56, highlight: "" },
      { rank: 4, name: "矢上 陽葉", club: "館山SLSC", points: 42, highlight: "本人" },
      { rank: 5, name: "塚根 小夏", club: "湘南GAA", points: 37, highlight: "" },
      { rank: 6, name: "丸山 はやか", club: "鎌倉LG", points: 33, highlight: "" },
      { rank: 7, name: "常盤 珠絆", club: "勝浦LSC", points: 29, highlight: "" },
      { rank: 8, name: "谷中 渚瑠", club: "鎌倉LG", points: 27, highlight: "" },
      { rank: 9, name: "河端 詩央梨", club: "K-AQUA", points: 27, highlight: "" },
      { rank: 10, name: "上田 香蓮", club: "湘南GAA", points: 25, highlight: "" },
    ],
    poolTop: [
      { rank: 1, name: "柳 輝於", club: "K-AQUA", points: 62, highlight: "" },
      { rank: 2, name: "藤﨑 笑佳", club: "西浜SLSC", points: 56, highlight: "" },
      { rank: 3, name: "河端 詩央梨", club: "K-AQUA", points: 55, highlight: "" },
      { rank: 4, name: "古賀 夏美", club: "西浜SLSC", points: 39, highlight: "" },
      { rank: 5, name: "髙田 琉衣", club: "湘南GAA", points: 36, highlight: "" },
      { rank: 6, name: "小池 侑依", club: "K-AQUA", points: 35, highlight: "" },
      { rank: 7, name: "鈴木 萌那", club: "K-AQUA", points: 32, highlight: "" },
      { rank: 8, name: "鴨林 夏花", club: "西浜SLSC", points: 32, highlight: "" },
      { rank: 9, name: "髙松 澪", club: "K-AQUA", points: 30, highlight: "" },
      { rank: 10, name: "春日 あかり", club: "十文字中高", points: 29, highlight: "" },
    ],
    totalTop: [
      { rank: 1, name: "髙田 琉衣", club: "湘南GAA", points: 104, highlight: "" },
      { rank: 2, name: "鴨林 夏花", club: "西浜SLSC", points: 88, highlight: "" },
      { rank: 3, name: "柳 輝於", club: "K-AQUA", points: 83, highlight: "" },
      { rank: 4, name: "河端 詩央梨", club: "K-AQUA", points: 82, highlight: "" },
      { rank: 5, name: "藤﨑 笑佳", club: "西浜SLSC", points: 81, highlight: "" },
      { rank: 6, name: "上野 美月", club: "西浜SLSC", points: 71, highlight: "" },
      { rank: 7, name: "塚根 小夏", club: "湘南GAA", points: 60, highlight: "" },
      { rank: 8, name: "古賀 夏美", club: "西浜SLSC", points: 53, highlight: "" },
      { rank: 9, name: "小池 侑依", club: "K-AQUA", points: 46, highlight: "" },
      { rank: 10, name: "矢上 陽葉", club: "館山SLSC", points: 42, highlight: "本人" },
    ],
  },
  {
    shortName: "賢尚",
    categoryLabel: "U8男子総合",
    oceanTop: [
      { rank: 1, name: "矢上 賢尚", club: "館山SLSC", points: 60, highlight: "本人" },
      { rank: 2, name: "山崎 貴大", club: "湯河原LSC", points: 59, highlight: "" },
      { rank: 3, name: "岡本 涼太", club: "館山SLSC", points: 49, highlight: "" },
      { rank: 4, name: "飯田 真凪", club: "西浜SLSC", points: 48, highlight: "" },
      { rank: 5, name: "大塚 理玄", club: "西浜SLSC", points: 45, highlight: "" },
      { rank: 6, name: "河地 遼大", club: "湘南GAA", points: 45, highlight: "" },
      { rank: 7, name: "佐藤 亙", club: "西浜SLSC", points: 42, highlight: "" },
      { rank: 8, name: "高橋 海心", club: "湘南GAA", points: 41, highlight: "" },
      { rank: 9, name: "常盤 琉仁", club: "勝浦LSC", points: 37, highlight: "" },
      { rank: 10, name: "マイヤーエーロン晟", club: "勝浦LSC", points: 18, highlight: "" },
    ],
    poolTop: [
      { rank: 1, name: "外村 爽羽", club: "湘南GAA", points: 32, highlight: "" },
      { rank: 2, name: "矢上 賢尚", club: "館山SLSC", points: 29, highlight: "本人" },
      { rank: 3, name: "荒井 絢仁", club: "西浜SLSC", points: 28, highlight: "" },
      { rank: 4, name: "山崎 貴大", club: "湯河原LSC", points: 27, highlight: "" },
      { rank: 5, name: "河地 遼大", club: "湘南GAA", points: 23, highlight: "" },
      { rank: 6, name: "常盤 琉仁", club: "勝浦LSC", points: 22, highlight: "" },
      { rank: 7, name: "大塚 理玄", club: "西浜SLSC", points: 21, highlight: "" },
      { rank: 8, name: "古藤 大智", club: "西浜SLSC", points: 18, highlight: "" },
      { rank: 9, name: "佐藤 亙", club: "西浜SLSC", points: 15, highlight: "" },
      { rank: 10, name: "森田 千瑛", club: "湘南GAA", points: 15, highlight: "" },
    ],
    totalTop: [
      { rank: 1, name: "矢上 賢尚", club: "館山SLSC", points: 89, highlight: "本人" },
      { rank: 2, name: "山崎 貴大", club: "湯河原LSC", points: 86, highlight: "" },
      { rank: 3, name: "河地 遼大", club: "湘南GAA", points: 68, highlight: "" },
      { rank: 4, name: "大塚 理玄", club: "西浜SLSC", points: 66, highlight: "" },
      { rank: 5, name: "常盤 琉仁", club: "勝浦LSC", points: 59, highlight: "" },
      { rank: 6, name: "佐藤 亙", club: "西浜SLSC", points: 57, highlight: "" },
      { rank: 7, name: "岡本 涼太", club: "館山SLSC", points: 49, highlight: "" },
      { rank: 8, name: "飯田 真凪", club: "西浜SLSC", points: 48, highlight: "" },
      { rank: 9, name: "高橋 海心", club: "湘南GAA", points: 41, highlight: "" },
      { rank: 10, name: "古藤 大智", club: "西浜SLSC", points: 35, highlight: "" },
    ],
  },
];
