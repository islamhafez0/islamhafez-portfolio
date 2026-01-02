import { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  TbSum,
  TbFlame,
  TbTrendingUp,
  TbStar,
  TbChartLine,
  TbCalendarEvent,
  TbCalendar,
  TbArrowUpRight,
} from "react-icons/tb";
import Stats from "../../types";
const GITHUB_USERNAME = "islamhafez0";
const API_URL = `https://corsproxy.io/?${encodeURIComponent(
  `https://github-contributions.vercel.app/api/v1/${GITHUB_USERNAME}`
)}`;

interface ContributionData {
  years: Array<{
    year: string;
    total: number;
    range: { start: string; end: string };
  }>;
  contributions: Array<{
    date: string;
    count: number;
    color: string;
    intensity: number | string;
  }>;
}

function isConsecutiveDay(date1: string, date2: string): boolean {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = d2.getTime() - d1.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays === 1;
}

function formatDate(dateString: string | null): string {
  if (!dateString) return "N/A";
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

function formatNumber(num: number): string {
  return num.toLocaleString("en-US");
}

function calculateTotal(years: ContributionData["years"]): number {
  if (!years || years.length === 0) return 0;
  return years.reduce((sum, year) => sum + (year.total || 0), 0);
}

function calculateLongestStreak(
  contributions: ContributionData["contributions"]
): number {
  if (!contributions || contributions.length === 0) return 0;

  const sorted = [...contributions].sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  let longestStreak = 0;
  let currentStreak = 0;
  let previousDate: string | null = null;

  for (const contrib of sorted) {
    const intensity = Number(contrib.intensity) || 0;
    if (contrib.count > 0 || intensity > 0) {
      if (previousDate && isConsecutiveDay(previousDate, contrib.date)) {
        currentStreak++;
      } else {
        currentStreak = 1;
      }
      longestStreak = Math.max(longestStreak, currentStreak);
      previousDate = contrib.date;
    } else {
      currentStreak = 0;
      previousDate = null;
    }
  }

  return longestStreak;
}

function calculateCurrentStreak(
  contributions: ContributionData["contributions"]
): number {
  if (!contributions || contributions.length === 0) return 0;

  const today = new Date().toISOString().split("T")[0];
  let streak = 0;
  let expectedDate = today;

  for (const contrib of contributions) {
    if (contrib.date > today) continue;

    const intensity = Number(contrib.intensity) || 0;
    const hasContribution = contrib.count > 0 || intensity > 0;

    if (contrib.date === expectedDate) {
      if (hasContribution) {
        streak++;
        const d = new Date(expectedDate);
        d.setDate(d.getDate() - 1);
        expectedDate = d.toISOString().split("T")[0];
      } else {
        if (contrib.date === today) {
          const d = new Date(expectedDate);
          d.setDate(d.getDate() - 1);
          expectedDate = d.toISOString().split("T")[0];
          continue;
        }
        break;
      }
    } else if (contrib.date < expectedDate) {
      break;
    }
  }

  return streak;
}

function findBestDay(
  contributions: ContributionData["contributions"]
): Stats["bestDay"] {
  if (!contributions || contributions.length === 0) {
    return { intensity: 0, date: "N/A" };
  }

  const best = contributions.reduce(
    (max, contrib) => {
      const intensity = Number(contrib.intensity) || 0;
      if (intensity > max.intensity) {
        return { intensity, date: contrib.date };
      }
      return max;
    },
    { intensity: 0, date: "" }
  );

  return {
    intensity: best.intensity,
    date: formatDate(best.date),
  };
}

function calculateDailyAverage(
  years: ContributionData["years"],
  contributions: ContributionData["contributions"]
): string {
  if (!contributions || contributions.length === 0) return "0.0";
  if (!years || years.length === 0) return "0.0";

  const total = calculateTotal(years);
  const totalDays = contributions.length;

  if (totalDays === 0) return "0.0";
  return (total / totalDays).toFixed(1);
}

function findBusiestDayOfWeek(
  contributions: ContributionData["contributions"]
): string {
  if (!contributions || contributions.length === 0) return "N/A";

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayCounts = [0, 0, 0, 0, 0, 0, 0];

  for (const contrib of contributions) {
    const dayIndex = new Date(contrib.date).getDay();
    dayCounts[dayIndex] += Number(contrib.intensity) || 0;
  }

  const maxCount = Math.max(...dayCounts);
  if (maxCount === 0) return "N/A";

  const busiestIndex = dayCounts.indexOf(maxCount);
  return dayNames[busiestIndex];
}

function findBusiestMonth(
  contributions: ContributionData["contributions"]
): string {
  if (!contributions || contributions.length === 0) return "N/A";

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthCounts = Array(12).fill(0);

  for (const contrib of contributions) {
    const monthIndex = new Date(contrib.date).getMonth();
    monthCounts[monthIndex] += Number(contrib.intensity) || 0;
  }

  const maxCount = Math.max(...monthCounts);
  if (maxCount === 0) return "N/A";

  const busiestIndex = monthCounts.indexOf(maxCount);
  return monthNames[busiestIndex];
}

function calculateYearOverYear(
  years: ContributionData["years"]
): string | null {
  if (!years || years.length < 2) return null;

  const currentYear = years[0];
  const previousYear = years[1];

  if (!previousYear.total || previousYear.total === 0) return null;

  const change =
    ((currentYear.total - previousYear.total) / previousYear.total) * 100;
  const sign = change >= 0 ? "+" : "";

  return `${sign}${change.toFixed(0)}%`;
}

function calculateStats(data: ContributionData | null): Stats {
  const emptyStats: Stats = {
    total: 0,
    longestStreak: 0,
    currentStreak: 0,
    bestDay: { intensity: 0, date: "N/A" },
    dailyAverage: "0.0",
    busiestDayOfWeek: "N/A",
    busiestMonth: "N/A",
    yearOverYear: null,
  };

  if (!data || !data.contributions || data.contributions.length === 0) {
    return emptyStats;
  }

  const { years, contributions } = data;

  return {
    total: calculateTotal(years),
    longestStreak: calculateLongestStreak(contributions),
    currentStreak: calculateCurrentStreak(contributions),
    bestDay: findBestDay(contributions),
    dailyAverage: calculateDailyAverage(years, contributions),
    busiestDayOfWeek: findBusiestDayOfWeek(contributions),
    busiestMonth: findBusiestMonth(contributions),
    yearOverYear: calculateYearOverYear(years),
  };
}

const StatCard = ({
  icon,
  label,
  value,
  subtext,
  index,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtext?: string;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    className="flex flex-col items-center text-center p-3 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300"
  >
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600/20 text-indigo-400 mb-2">
      {icon}
    </div>
    <div className="text-lg font-bold text-white leading-tight">{value}</div>
    <div className="text-xs text-gray-400 mt-1">{label}</div>
    {subtext && (
      <div className="text-[10px] text-gray-500 mt-0.5">{subtext}</div>
    )}
  </motion.div>
);

const GitHubContributions = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [data, setData] = useState<ContributionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const stats = useMemo(() => calculateStats(data), [data]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((responseData: ContributionData) => {
        setData(responseData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch contributions:", err);
        setError("Failed to load contribution data");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!data || !canvasRef.current) return;

    const drawChart = async () => {
      const { drawContributions } = await import("github-contributions-canvas");
      const canvasData = {
        ...data,
        contributions: data.contributions.map((c) => ({
          ...c,
          intensity: Number(c.intensity) || 0,
        })),
      };
      drawContributions(canvasRef.current!, {
        data: canvasData,
        username: GITHUB_USERNAME,
        themeName: "githubDark",
        footerText: `@${GITHUB_USERNAME}'s GitHub Contributions`,
      });
    };

    drawChart();
  }, [data]);

  const statCards = [
    {
      icon: <TbSum size={20} />,
      label: "Total",
      value: formatNumber(stats.total),
    },
    {
      icon: <TbFlame size={20} />,
      label: "Longest Streak",
      value: `${stats.longestStreak}d`,
    },
    {
      icon: <TbTrendingUp size={20} />,
      label: "Current Streak",
      value: `${stats.currentStreak}d`,
    },
    {
      icon: <TbStar size={20} />,
      label: "Best Day",
      value: `Lvl ${stats.bestDay.intensity}`,
      subtext: stats.bestDay.date,
    },
    {
      icon: <TbChartLine size={20} />,
      label: "Daily Avg",
      value: stats.dailyAverage,
    },
    {
      icon: <TbCalendarEvent size={20} />,
      label: "Busiest Day",
      value: stats.busiestDayOfWeek,
    },
    {
      icon: <TbCalendar size={20} />,
      label: "Busiest Month",
      value: stats.busiestMonth,
    },
    ...(stats.yearOverYear
      ? [
          {
            icon: <TbArrowUpRight size={20} />,
            label: "YoY Growth",
            value: stats.yearOverYear,
          },
        ]
      : []),
  ];

  return (
    <section
      ref={ref}
      className="py-20 bg-gray-900/50 backdrop-blur-sm"
      id="contributions"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6 items-stretch">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3 h-full"
          >
            <div className="bg-[#0d1117] rounded-xl p-4 border border-gray-700/50 overflow-x-auto h-full flex flex-col">
              {loading ? (
                <div className="flex items-center justify-center flex-1 w-full">
                  <div className="flex items-center gap-3 text-gray-400">
                    <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    <span>Loading contributions...</span>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center flex-1 text-red-400 w-full">
                  {error}
                </div>
              ) : (
                <div className="min-w-[500px] lg:min-w-0 w-full h-full flex-1 flex items-center">
                  <canvas ref={canvasRef} className="w-full h-full" />
                </div>
              )}
            </div>
          </motion.div>

          {/* Stats Dashboard */}
          {!loading && !error && data && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-2"
            >
              <div className="bg-gray-800/30 rounded-xl p-5 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <TbTrendingUp className="text-indigo-400" />
                  Statistics
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {statCards.map((stat, index) => (
                    <StatCard
                      key={stat.label}
                      icon={stat.icon}
                      label={stat.label}
                      value={stat.value}
                      subtext={stat.subtext}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GitHubContributions;
