"use client";
import { useState } from "react";
import {
  Search,
  Clock3,
  BookOpen,
  Check,
  Play,
  ArrowRight,
  Award,
  ClipboardCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Course, pct } from "@/lib/learning";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
export function Modal({
  title,
  close,
  children,
}: {
  title: string;
  close: () => void;
  children: React.ReactNode;
}) {
  return (
    <Dialog
      open
      onOpenChange={(o) => {
        if (!o) close();
      }}
    >
      <DialogContent className="modal">
        <DialogTitle>{title}</DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
}
export function Intro({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="intro">
      <div className="eyebrow">
        <i />
        WORKSPACE
      </div>
      <h1>{name}</h1>
      <p>{desc}</p>
    </div>
  );
}
export function Library({
  name,
  list,
  open,
}: {
  name: string;
  list: Course[];
  open: (c: Course) => void;
}) {
  const [q, setQ] = useState(""),
    [cat, setCat] = useState("All categories"),
    [tab, setTab] = useState("All courses");
  const mine = name === "My learning";
  const visible = list.filter(
    (c) =>
      (!mine || c.done >= 0) &&
      c.title.toLowerCase().includes(q.toLowerCase()) &&
      (cat === "All categories" || c.category === cat) &&
      (tab === "All courses" ||
        (tab === "Completed" ? pct(c) === 100 : c.done >= 0 && pct(c) < 100)),
  );
  return (
    <>
      <Intro
        name={name}
        desc={
          mine
            ? "Your enrolled courses and learning progress in one place."
            : name === "My courses"
              ? "Review the curriculum and outcomes for your teaching portfolio."
              : "Explore courses designed to build practical, workplace-ready skills."
        }
      />
      <div className="filters">
        <label className="searchfield">
          <Search size={16} />
          <input
            aria-label="Search courses"
            placeholder="Search courses…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </label>
        <select
          aria-label="Course category"
          value={cat}
          onChange={(e) => setCat(e.target.value)}
        >
          {[
            "All categories",
            "Leadership",
            "Data & analytics",
            "Communication",
          ].map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        {mine && (
          <select
            aria-label="Course status"
            value={tab}
            onChange={(e) => setTab(e.target.value)}
          >
            {["All courses", "In progress", "Completed"].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        )}
      </div>
      <div className="catalogue">
        {visible.map((c) => (
          <button
            className="box catalogcard"
            key={c.id}
            onClick={() => open(c)}
          >
            <div className={"cover tint" + c.art}>
              <img src={`/course-${c.art}.webp`} alt="" />
            </div>
            <div className="pad">
              <small className={"tag tint" + c.art}>{c.category}</small>
              <h2>{c.title}</h2>
              <p>{c.about}</p>
              <div className="meta">
                <Clock3 size={14} />
                {c.duration}
                <BookOpen size={14} />
                {c.modules.length} modules
              </div>
              <b className="textlink">
                {c.done < 0
                  ? "View course"
                  : pct(c) === 100
                    ? "Review course"
                    : "Continue learning"}{" "}
                <ArrowRight size={14} />
              </b>
            </div>
          </button>
        ))}
      </div>
      {!visible.length && (
        <p className="box pad">
          No courses match your search. Try another title or category.
        </p>
      )}
    </>
  );
}
export function CourseDetail({
  c,
  update,
  close,
}: {
  c: Course;
  update: (n: number) => void;
  close: () => void;
}) {
  const [lesson, setLesson] = useState<number | null>(null);
  const guidance = [
    "Choose a real project and write down its intended outcome. Identify who needs to be involved and agree on one measurable indicator of success.",
    "Start with the decision you need to make. Check the source and context of each metric, then compare more than one explanation before making a recommendation.",
    "Begin with an open question. Reflect back what you heard and agree on a specific next step, including who owns it and when you will follow up.",
  ][c.art];
  return (
    <Modal title={lesson === null ? c.title : c.modules[lesson]} close={close}>
      <div className="meta">
        <span className={"tag tint" + c.art}>{c.category}</span>
        <Clock3 size={14} />
        {c.duration}
      </div>
      {lesson === null ? (
        <>
          <p>{c.about}</p>
          <p className="secondary">Instructor · {c.trainer}</p>
          <b>Course curriculum</b>
          <div className="modules">
            {c.modules.map((m, i) => (
              <button
                disabled={c.done < 0 || i > c.done}
                key={m}
                onClick={() => setLesson(i)}
              >
                {i < c.done ? (
                  <Check size={16} />
                ) : (
                  <span>{String(i + 1).padStart(2, "0")}</span>
                )}
                {m}
              </button>
            ))}
          </div>
          <Button
            onClick={() =>
              c.done < 0
                ? update(0)
                : setLesson(Math.min(c.done, c.modules.length - 1))
            }
          >
            {c.done < 0
              ? "Enroll in course"
              : pct(c) === 100
                ? "Review last lesson"
                : "Resume current lesson"}
            <Play size={14} />
          </Button>
        </>
      ) : (
        <>
          <span className="eyebrow">
            MODULE {lesson + 1} OF {c.modules.length}
          </span>
          <p>{guidance}</p>
          <div className="callout">
            <b>Apply it to your work</b>
            <p>
              Using “{c.modules[lesson]}” as your focus, describe one change you
              can make this week. Identify a colleague who can give you feedback
              on the result.
            </p>
          </div>
          <Button
            onClick={() => {
              if (lesson === c.done) update(c.done + 1);
              setLesson(null);
            }}
          >
            {lesson < c.done ? "Return to curriculum" : "Mark module complete"}
          </Button>
        </>
      )}
    </Modal>
  );
}
const questions = [
  [
    "What is the best first step when setting a team priority?",
    "Agree on the intended outcome",
    "Assign tasks immediately",
    "Select a reporting tool",
  ],
  [
    "Which measure best demonstrates learning impact?",
    "Number of emails sent",
    "A change in workplace behavior",
    "Length of the training deck",
  ],
  [
    "How should a leader respond to conflicting feedback?",
    "Ignore minority opinions",
    "Delay all decisions",
    "Compare evidence and clarify assumptions",
  ],
];
export function Assessments({
  score,
  setScore,
}: {
  score: number | null;
  setScore: (n: number) => void;
}) {
  const [run, start] = useState(false),
    [answers, set] = useState<number[]>([]);
  return (
    <>
      <Intro
        name="Assessments"
        desc="Put your knowledge into practice and review your results."
      />
      <section className="box pad">
        <div className="meta">
          <ClipboardCheck size={20} />
          <span className="tag tint0">Knowledge check</span>
        </div>
        <h2>Leadership knowledge check</h2>
        <p className="secondary">
          Strategic Leadership Essentials · 3 questions · Due Nov 23
        </p>
        <br />
        {score !== null && (
          <p className="callout">Last result: {score} of 3 correct</p>
        )}
        <Button
          onClick={() => {
            set([]);
            start(true);
          }}
        >
          {score === null ? "Start assessment" : "Retake assessment"}
        </Button>
      </section>
      {run && (
        <Modal title="Leadership knowledge check" close={() => start(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setScore(answers.reduce((n, a, i) => n + Number(a === i), 0));
              start(false);
            }}
          >
            {questions.map(([q, ...a], i) => (
              <fieldset key={q}>
                <legend>
                  {i + 1}. {q}
                </legend>
                {a.map((x, j) => (
                  <label className="radio" key={x}>
                    <input
                      type="radio"
                      name={"q" + i}
                      required
                      onChange={() =>
                        set((old) => {
                          const n = [...old];
                          n[i] = j;
                          return n;
                        })
                      }
                    />
                    {x}
                  </label>
                ))}
              </fieldset>
            ))}
            <Button type="submit">Submit answers</Button>
          </form>
        </Modal>
      )}
    </>
  );
}
export function Certificates({ list }: { list: Course[] }) {
  const [c, show] = useState<Course | null>(null);
  return (
    <>
      <Intro
        name="Certificates"
        desc="A collection of your completed learning milestones."
      />
      <div className="catalogue">
        {list
          .filter((c) => pct(c) === 100)
          .map((c) => (
            <button
              className="box pad credential"
              key={c.id}
              onClick={() => show(c)}
            >
              <Award size={36} />
              <small className="eyebrow">CERTIFICATE OF COMPLETION</small>
              <h2>{c.title}</h2>
              <span className="textlink">
                View certificate <ArrowRight size={14} />
              </span>
            </button>
          ))}
      </div>
      {c && (
        <Modal title="Certificate of completion" close={() => show(null)}>
          <div className="certificate">
            <Award size={50} />
            <small>CAPACITY CONNECT</small>
            <p>This certifies that</p>
            <h2>Alex Morgan</h2>
            <p>has completed {c.title}</p>
            <b>{c.trainer} · Instructor</b>
          </div>
        </Modal>
      )}
    </>
  );
}
