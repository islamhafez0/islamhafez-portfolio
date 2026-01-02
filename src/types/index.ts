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