export default interface Stats {
  total: number;
  longestStreak: number;
  currentStreak: number;
  bestDay: { intensity: number; date: string };
  dailyAverage: string;
  busiestDayOfWeek: string;
  busiestMonth: string;
  yearOverYear: string | null;
}

export interface Project {
    id: number;
    title: string;
    description: string;
    tech: string[];
    image: string;
    github: string;
    demo: string;
    category?: string;
    color?: string;
}