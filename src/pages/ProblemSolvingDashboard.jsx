import React from "react";
import { useNavigate } from "react-router-dom";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const topicData = [
  {
    topic: "Top Like Array",
    completed: 8,
    total: 10,
    score: 80,
  },
  {
    topic: "Binary Search",
    completed: 6,
    total: 10,
    score: 60,
  },
];

const progressData = [
  { day: "Mon", score: 35 },
  { day: "Tue", score: 42 },
  { day: "Wed", score: 50 },
  { day: "Thu", score: 58 },
  { day: "Fri", score: 68 },
  { day: "Sat", score: 72 },
  { day: "Sun", score: 78 },
];

const pieData = [
  { name: "Completed", value: 14 },
  { name: "Remaining", value: 6 },
];

const COLORS = ["#ffffff", "#333333"];

export default function ProblemSolvingDashboard() {
  const navigate = useNavigate();

  const totalCompleted = topicData.reduce(
    (sum, topic) => sum + topic.completed,
    0
  );

  const totalProblems = topicData.reduce(
    (sum, topic) => sum + topic.total,
    0
  );

  const overallProgress = Math.round(
    (totalCompleted / totalProblems) * 100
  );

  const problemSolvingAbility = Math.round(
    topicData.reduce((sum, topic) => sum + topic.score, 0) /
      topicData.length
  );

  return (
    <div className="min-h-screen bg-black text-white p-6 overflow-y-auto">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div>
            <h1 className="text-3xl font-bold">
              Problem Solving Dashboard
            </h1>

            <p className="text-gray-400 mt-2">
              Track your DSA progress and problem-solving ability.
            </p>
          </div>

          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2.5 rounded-lg border border-gray-700
            bg-white text-black font-medium
            hover:bg-gray-200 transition"
          >
            ← Back to Chat
          </button>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

          <StatCard
            title="Problems Completed"
            value={`${totalCompleted}/${totalProblems}`}
            subtitle={`${overallProgress}% overall progress`}
          />

          <StatCard
            title="Problem Solving Ability"
            value={`${problemSolvingAbility}%`}
            subtitle="Based on completed topics"
          />

          <StatCard
            title="Topics Completed"
            value={topicData.length}
            subtitle="Array + Binary Search"
          />

        </div>

        {/* Main Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Progress Chart */}
          <div className="bg-[#111111] border border-gray-800 rounded-2xl p-6">

            <div className="mb-5">
              <h2 className="text-xl font-semibold">
                Problem Solving Progress
              </h2>

              <p className="text-sm text-gray-500">
                Your ability over time
              </p>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={progressData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#333333"
                />

                <XAxis
                  dataKey="day"
                  stroke="#888888"
                />

                <YAxis
                  domain={[0, 100]}
                  stroke="#888888"
                />

                <Tooltip
                  contentStyle={{
                    background: "#000000",
                    border: "1px solid #444444",
                    borderRadius: "10px",
                    color: "#ffffff",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#ffffff"
                  strokeWidth={3}
                  dot={{
                    r: 5,
                    fill: "#ffffff",
                  }}
                />

              </LineChart>
            </ResponsiveContainer>

          </div>

          {/* Topic Progress */}
          <div className="bg-[#111111] border border-gray-800 rounded-2xl p-6">

            <div className="mb-5">
              <h2 className="text-xl font-semibold">
                Topic Progress
              </h2>

              <p className="text-sm text-gray-500">
                Problems completed by topic
              </p>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topicData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#333333"
                />

                <XAxis
                  dataKey="topic"
                  stroke="#888888"
                />

                <YAxis
                  stroke="#888888"
                />

                <Tooltip
                  contentStyle={{
                    background: "#000000",
                    border: "1px solid #444444",
                    borderRadius: "10px",
                    color: "#ffffff",
                  }}
                />

                <Legend />

                <Bar
                  dataKey="completed"
                  name="Completed"
                  fill="#ffffff"
                  radius={[6, 6, 0, 0]}
                />

                <Bar
                  dataKey="total"
                  name="Total"
                  fill="#333333"
                  radius={[6, 6, 0, 0]}
                />

              </BarChart>
            </ResponsiveContainer>

          </div>

        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

          {/* Overall Completion */}
          <div className="bg-[#111111] border border-gray-800 rounded-2xl p-6">

            <h2 className="text-xl font-semibold">
              Overall Completion
            </h2>

            <p className="text-sm text-gray-500 mb-4">
              How much of your current roadmap is complete
            </p>

            <div className="relative flex items-center justify-center">

              <ResponsiveContainer width="100%" height={250}>
                <PieChart>

                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                  >

                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index]}
                      />
                    ))}

                  </Pie>

                  <Tooltip
                    contentStyle={{
                      background: "#000000",
                      border: "1px solid #444444",
                      color: "#ffffff",
                    }}
                  />

                </PieChart>
              </ResponsiveContainer>

              <div className="absolute text-center pointer-events-none">

                <p className="text-3xl font-bold">
                  {overallProgress}%
                </p>

                <p className="text-sm text-gray-500">
                  Complete
                </p>

              </div>

            </div>

          </div>

          {/* Topic Cards */}
          <div className="bg-[#111111] border border-gray-800 rounded-2xl p-6">

            <h2 className="text-xl font-semibold mb-5">
              Topic Performance
            </h2>

            <div className="space-y-5">

              {topicData.map((topic) => (
                <div key={topic.topic}>

                  <div className="flex justify-between mb-2">

                    <span className="font-medium">
                      {topic.topic}
                    </span>

                    <span className="text-gray-500">
                      {topic.completed}/{topic.total}
                    </span>

                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-800 rounded-full h-3">

                    <div
                      className="bg-white h-3 rounded-full transition-all"
                      style={{
                        width: `${topic.score}%`,
                      }}
                    />

                  </div>

                  <div className="flex justify-between mt-2">

                    <span className="text-xs text-gray-600">
                      Progress
                    </span>

                    <span className="text-xs text-gray-300">
                      {topic.score}%
                    </span>

                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle }) {
  return (
    <div className="bg-[#111111] border border-gray-800 rounded-2xl p-6">

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>

      <p className="text-sm text-gray-600 mt-2">
        {subtitle}
      </p>

    </div>
  );
}