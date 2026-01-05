
export interface ZodiacSign {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  time: string;
  readTime: string;
  imageUrl: string;
  accentColor: string;
}

export interface DailyInsight {
  luckyNumbers: string;
  luckyColor: string;
  colorHex: string;
  fengShui: {
    direction: string;
    advice: string;
  };
}
