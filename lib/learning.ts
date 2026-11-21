export type Role = "Employee" | "Trainer" | "Administrator";
export type Course = {
  id: number;
  title: string;
  category: string;
  art: number;
  trainer: string;
  modules: string[];
  done: number;
  duration: string;
  about: string;
};
export const courses: Course[] = [
  {
    id: 1,
    title: "Strategic Leadership Essentials",
    category: "Leadership",
    art: 0,
    trainer: "Maya Chen",
    modules: [
      "Setting direction",
      "Understanding stakeholders",
      "Defining priorities",
      "Aligning your team",
      "Leading through change",
      "Building influence",
      "Coaching for impact",
      "Leadership action plan",
    ],
    done: 5,
    duration: "3h 20m",
    about:
      "Build a practical toolkit for setting direction, aligning teams, and making confident leadership decisions.",
  },
  {
    id: 2,
    title: "Data-Driven Decision Making",
    category: "Data & analytics",
    art: 1,
    trainer: "Daniel Brooks",
    modules: [
      "Framing a question",
      "Finding reliable data",
      "Reading distributions",
      "Comparing outcomes",
      "Building a recommendation",
    ],
    done: 2,
    duration: "2h 45m",
    about:
      "Translate everyday business questions into evidence-based recommendations using practical analytical frameworks.",
  },
  {
    id: 3,
    title: "Effective Team Communication",
    category: "Communication",
    art: 2,
    trainer: "Nora Patel",
    modules: [
      "Active listening",
      "Clarity and context",
      "Asking better questions",
      "Constructive feedback",
      "Meeting design",
      "Team agreements",
    ],
    done: 1,
    duration: "2h 10m",
    about:
      "Practice the habits that make collaboration clearer, feedback more useful, and team conversations more productive.",
  },
  {
    id: 4,
    title: "Coaching for Growth",
    category: "Leadership",
    art: 0,
    trainer: "Maya Chen",
    modules: [
      "Coaching mindset",
      "Goal setting",
      "Growth conversations",
      "Practice session",
    ],
    done: -1,
    duration: "1h 40m",
    about:
      "Guide better development conversations with a repeatable framework for coaching.",
  },
  {
    id: 5,
    title: "Introduction to Business Analytics",
    category: "Data & analytics",
    art: 1,
    trainer: "Daniel Brooks",
    modules: ["Data literacy", "Measurement", "Reporting", "Business insights"],
    done: 4,
    duration: "2h 30m",
    about:
      "Learn to read business metrics and communicate insights to your stakeholders.",
  },
  {
    id: 6,
    title: "Collaborating Across Teams",
    category: "Communication",
    art: 2,
    trainer: "Nora Patel",
    modules: [
      "Shared goals",
      "Mapping dependencies",
      "Working agreements",
      "Retrospectives",
    ],
    done: 4,
    duration: "1h 55m",
    about:
      "Build working agreements that help cross-functional teams deliver together.",
  },
];
export const events = [
  {
    day: "23",
    month: "NOV",
    title: "Leadership knowledge check",
    type: "Assessment",
    time: "Mon, 10:00 AM",
    detail:
      "Test your understanding of strategic priorities and team alignment.",
    duration: "10 minutes",
  },
  {
    day: "25",
    month: "NOV",
    title: "Data storytelling workshop",
    type: "Live session",
    time: "Wed, 2:00 PM",
    detail:
      "Daniel Brooks leads a guided workshop on turning analysis into a compelling business story.",
    duration: "45 minutes",
  },
  {
    day: "27",
    month: "NOV",
    title: "Team communication",
    type: "Course deadline",
    time: "Fri, 5:00 PM",
    detail:
      "Finish the remaining lessons in Effective Team Communication before the end of the week.",
    duration: "Self-paced",
  },
];
export const people = [
  ["Alex Morgan", "Product", "Employee"],
  ["Maya Chen", "People", "Trainer"],
  ["Daniel Brooks", "Analytics", "Trainer"],
  ["Nora Patel", "Operations", "Trainer"],
  ["Olivia Martin", "Product", "Employee"],
  ["James Wilson", "Engineering", "Employee"],
];
export const pct = (c: Course) =>
  Math.max(0, Math.round((c.done / c.modules.length) * 100));
export function exportCsv(name: string, rows: (string | number)[][]) {
  const u = URL.createObjectURL(
    new Blob(
      [
        rows
          .map((r) =>
            r.map((v) => '"' + String(v).replaceAll('"', '""') + '"').join(","),
          )
          .join("\n"),
      ],
      { type: "text/csv;charset=utf-8" },
    ),
  );
  const a = document.createElement("a");
  a.href = u;
  a.download = name + ".csv";
  a.click();
  setTimeout(() => URL.revokeObjectURL(u), 1000);
}
