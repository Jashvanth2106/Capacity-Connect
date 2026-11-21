"use client";
import { useState } from "react";
import {
  BookOpen,
  Clock3,
  Award,
  GraduationCap,
  ArrowRight,
  Play,
  ChevronRight,
  Target,
  CalendarDays,
  TrendingUp,
  Activity,
  CalendarClock,
  Compass,
  Users,
  Layers,
  FileCheck2,
} from "lucide-react";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { events, pct, type Course, type Role } from "@/lib/learning";
export function CourseRow({ c, open }: { c: Course; open: () => void }) {
  return (
    <button className="course-row" onClick={open}>
      <img src={`/course-${c.art}.webp`} alt="" />
      <span className="course-text">
        <small className={"tag tint" + c.art}>{c.category}</small>
        <strong>{c.title}</strong>
        <span className="secondary">
          {c.done} of {c.modules.length} modules completed
        </span>
        <span className="barline">
          <span className="track">
            <i style={{ width: pct(c) + "%" }} />
          </span>
          <b>{pct(c)}%</b>
        </span>
      </span>
      <span className="arrowbox">
        <ChevronRight size={15} />
      </span>
    </button>
  );
}
export function ActivityChart({ team = false }: { team?: boolean }) {
  const [period, set] = useState("This week");
  const data = (
    period === "This month"
      ? ["Week 1", "Week 2", "Week 3", "Week 4"]
      : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  ).map((day, i) => ({
    day,
    hours:
      ([2, 3.5, 2.8, 4.5, 3.8, 5, 4.2][i] +
        (period === "Last week" ? -0.8 : 0)) *
      (team ? 8 : 1) *
      (period === "This month" ? 4 : 1),
  }));
  return (
    <section className="box chartbox">
      <div className="panelhead">
        <h2>
          <Activity />
          Learning activity
        </h2>
        <select
          aria-label="Activity period"
          value={period}
          onChange={(e) => set(e.target.value)}
        >
          <option>This week</option>
          <option>Last week</option>
          <option>This month</option>
        </select>
      </div>
      <p className="secondary">
        {team ? "Team learning hours" : "Time spent learning"} by{" "}
        {period === "This month" ? "week" : "day"}
      </p>
      <ChartContainer
        className="h-48 w-full"
        config={{ hours: { label: "Learning hours", color: "var(--chart-1)" } }}
      >
        <AreaChart
          data={data}
          margin={{ top: 15, left: -24, right: 12, bottom: 0 }}
        >
          <defs>
            <linearGradient id="fillHours" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#4781fb" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#4781fb" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} strokeDasharray="3 4" />
          <XAxis dataKey="day" tickLine={false} axisLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            dataKey="hours"
            type="monotone"
            stroke="var(--color-hours)"
            strokeWidth={2.5}
            fill="url(#fillHours)"
          />
        </AreaChart>
      </ChartContainer>
    </section>
  );
}
const lines = [
  "0,29 10,26 17,31 26,17 34,19 42,12 49,18 60,9 68,12 78,5",
  "0,31 10,30 19,24 28,27 37,17 47,21 56,12 65,16 78,4",
  "0,30 10,24 20,27 30,16 38,20 49,11 58,15 69,7 78,5",
  "0,30 10,30 17,22 27,22 35,15 45,15 55,10 65,10 78,3",
];
export function Overview({
  role,
  list,
  go,
  course,
  event,
}: {
  role: Role;
  list: Course[];
  go: (s: string) => void;
  course: (c: Course) => void;
  event: (i: number) => void;
}) {
  const personal = role === "Employee",
    trainer = role === "Trainer",
    active = list.filter((c) => c.done >= 0 && pct(c) < 100);
  const stats = personal
    ? [
        [
          BookOpen,
          "Enrolled courses",
          list.filter((c) => c.done >= 0).length,
          "Across 3 skill areas",
        ],
        [
          GraduationCap,
          "Completed courses",
          list.filter((c) => pct(c) === 100).length,
          "Career milestones",
        ],
        [Clock3, "Learning hours", "24.5", "+3.5h this week"],
        [
          Award,
          "Certificates earned",
          list.filter((c) => pct(c) === 100).length,
          "Verified achievements",
        ],
      ]
    : [
        [
          Users,
          trainer ? "Active learners" : "Total employees",
          trainer ? "48" : "128",
          "Across all teams",
        ],
        [
          Layers,
          trainer ? "Courses taught" : "Active courses",
          trainer ? "3" : "18",
          "Current catalogue",
        ],
        [Target, "Completion rate", trainer ? "86%" : "82%", "+6% this month"],
        [FileCheck2, "Assessments", trainer ? "12" : "36", "This quarter"],
      ];
  return (
    <>
      <div className="page-title">
        <div>
          <div className="eyebrow">
            <i />
            {personal ? "PERSONAL" : trainer ? "TRAINER" : "ORGANIZATION"}{" "}
            WORKSPACE
          </div>
          <h1>
            {personal
              ? "Learning dashboard"
              : trainer
                ? "Trainer dashboard"
                : "Administrator dashboard"}
          </h1>
        </div>
        <span className="date">
          <CalendarDays size={15} />
          Saturday, Nov 21, 2026
        </span>
      </div>
      <section className="hero">
        <span className="herolabel">
          <Compass size={13} />{" "}
          {personal ? "LEARNING JOURNEY" : "WORKSPACE OVERVIEW"}
        </span>
        <h2>
          {personal
            ? "Welcome back, Alex."
            : trainer
              ? "Your teaching workspace."
              : "Organization at a glance."}
        </h2>
        <p>
          {personal
            ? "Build your skills, track your progress, and keep moving forward."
            : trainer
              ? "Guide your learners and track course performance."
              : "Monitor learning outcomes and develop your people."}
        </p>
        <button
          className="herocta"
          onClick={() =>
            personal && active.length
              ? course(active[0])
              : go(
                  personal
                    ? "Course catalogue"
                    : trainer
                      ? "My courses"
                      : "Employees",
                )
          }
        >
          {personal ? (
            <Play size={13} fill="currentColor" />
          ) : (
            <Users size={14} />
          )}{" "}
          {personal
            ? active.length
              ? "Resume learning"
              : "Explore courses"
            : trainer
              ? "View my courses"
              : "Manage employees"}
          <ArrowRight size={14} />
        </button>
        <span className="herocoord">
          FIG. 01 &nbsp; / &nbsp; GROWTH TERRAIN
        </span>
      </section>
      <div className="statgrid">
        {stats.map(([Icon, label, note, sub], i) => {
          const I = Icon as typeof BookOpen;
          return (
            <div className={"stat box s" + i} key={i}>
              <div className="statlabel">
                <span className="iconchip">
                  <I size={17} />
                </span>
                {String(label)}
              </div>
              <div className="statnum">
                {String(note)}
                <svg className="spark" viewBox="0 0 80 38" aria-hidden="true">
                  <polygon
                    points={"0,38 " + lines[i] + " 78,38"}
                    fill="currentColor"
                    opacity=".09"
                  />
                  <polyline
                    points={lines[i]}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <small>
                {String(sub).startsWith("+") && <TrendingUp size={12} />}{" "}
                {String(sub)}
              </small>
            </div>
          );
        })}
      </div>
      {personal ? (
        <div className="dashboardgrid">
          <section className="box">
            <div className="panelhead">
              <h2>
                <BookOpen />
                Continue learning
              </h2>
              <button className="textlink" onClick={() => go("My learning")}>
                View all <ArrowRight />
              </button>
            </div>
            <div className="courselist">
              {active.length ? (
                active
                  .slice(0, 3)
                  .map((c) => (
                    <CourseRow key={c.id} c={c} open={() => course(c)} />
                  ))
              ) : (
                <p className="pad">
                  All caught up! Explore the catalogue for your next course.
                </p>
              )}
            </div>
          </section>
          <section className="box">
            <div className="panelhead">
              <h2>
                <CalendarClock />
                Upcoming
              </h2>
              <span className="count">3</span>
            </div>
            <div className="agenda">
              {events.map((e, i) => (
                <button key={e.day} onClick={() => event(i)}>
                  <span className={"dateblock tint" + i}>
                    <small>{e.month}</small>
                    <b>{e.day}</b>
                  </span>
                  <span>
                    <small className={"eventtype et" + i}>{e.type}</small>
                    <strong>{e.title}</strong>
                    <span className="secondary">
                      <Clock3 size={12} />
                      {e.time}
                    </span>
                  </span>
                </button>
              ))}
            </div>
            <button className="agendafooter" onClick={() => go("Schedule")}>
              View full schedule <ArrowRight size={14} />
            </button>
          </section>
        </div>
      ) : null}
      <ActivityChart team={!personal} />
    </>
  );
}
