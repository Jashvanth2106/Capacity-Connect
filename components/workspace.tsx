"use client";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  BookOpen,
  LibraryBig,
  ClipboardList,
  ChartNoAxesCombined,
  Award,
  CalendarDays,
  Users,
  ChartColumn,
  GraduationCap,
  ChevronsUpDown,
  Search,
  Bell,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Target,
  Building2,
  ArrowRight,
  Layers,
  Clock3,
  Command,
  Check,
  PanelLeft,
} from "lucide-react";
import {
  courses,
  events,
  pct,
  people,
  type Role,
  type Course,
} from "@/lib/learning";
import { Overview, ActivityChart, CourseRow } from "./overview";
import {
  Library,
  Intro,
  Modal,
  CourseDetail,
  Assessments,
  Certificates,
} from "./learning";
import { Employees, Reports, Account } from "./organization";
import { Button } from "@/components/ui/button";
const icons = {
  Dashboard: LayoutDashboard,
  "My learning": BookOpen,
  "Course catalogue": LibraryBig,
  Assessments: ClipboardList,
  "My progress": ChartNoAxesCombined,
  Certificates: Award,
  Schedule: CalendarDays,
  Employees: Users,
  "Analytics & reports": ChartColumn,
  "My courses": Layers,
};
type PageName = keyof typeof icons;
export default function Workspace() {
  const [page, pageTo] = useState("Dashboard"),
    [role, roleTo] = useState<Role>("Employee"),
    [mobile, setMobile] = useState(false),
    [modal, setModal] = useState(""),
    [q, query] = useState(""),
    [list, update] = useState(courses),
    [selected, select] = useState(0),
    [eventId, setEvent] = useState(0),
    [rows, setRows] = useState(people),
    [score, setScore] = useState<number | null>(null),
    [saved, setSaved] = useState<number[]>([]),
    [seen, markSeen] = useState(false);
  const go = (s: string) => {
    pageTo(s);
    setModal("");
    setMobile(false);
    window.scrollTo(0, 0);
  };
  const course = (c: Course) => {
      select(c.id);
      setModal("course");
    },
    event = (i: number) => {
      setEvent(i);
      setModal("event");
    };
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setModal("search");
        query("");
      }
      if (e.key === "Escape") setMobile(false);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);
  const active = list.find((c) => c.id === selected),
    current = events[eventId];
  const primary: PageName[] =
    role === "Employee"
      ? ["Dashboard", "My learning", "Course catalogue", "Assessments"]
      : role === "Trainer"
        ? ["Dashboard", "My courses", "Assessments", "Schedule"]
        : ["Dashboard", "Employees", "Course catalogue", "Analytics & reports"];
  const secondary: PageName[] =
    role === "Employee"
      ? ["My progress", "Certificates", "Schedule"]
      : role === "Trainer"
        ? ["Analytics & reports", "Course catalogue"]
        : ["Schedule", "Assessments"];
  function nav(items: PageName[]) {
    return items.map((s) => {
      const Icon = icons[s];
      return (
        <button
          className={"navitem " + (page === s ? "on" : "")}
          aria-current={page === s ? "page" : undefined}
          onClick={() => go(s)}
          key={s}
        >
          <Icon size={18} />
          {s}
          {s === "My learning" && (
            <span className="navcount">
              {list.filter((c) => c.done >= 0 && pct(c) < 100).length}
            </span>
          )}
        </button>
      );
    });
  }
  if (page === "Account") return <Account back={() => go("Dashboard")} />;
  return (
    <div className="appframe">
      {mobile && (
        <button
          aria-label="Close navigation"
          className="scrim"
          onClick={() => setMobile(false)}
        />
      )}
      <aside className={mobile ? "sidebar expanded" : "sidebar"}>
        <div className="brand">
          <img src="/brand.svg" alt="" />
          <span>
            CAPACITY<b>CONNECT</b>
          </span>
          <button
            className="mobilehide"
            aria-label="Close navigation"
            onClick={() => setMobile(false)}
          >
            <X />
          </button>
        </div>
        <div className="rolebox">
          <span className="roleicon">
            <GraduationCap size={19} />
          </span>
          <div>
            <small>Workspace</small>
            <b>{role}</b>
          </div>
          <ChevronsUpDown size={14} />
          <select
            aria-label="Switch workspace"
            value={role}
            onChange={(e) => {
              roleTo(e.target.value as Role);
              go("Dashboard");
            }}
          >
            {["Employee", "Trainer", "Administrator"].map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>
        <nav>
          <small className="navlabel">WORKSPACE</small>
          {nav(primary)}
          <small className="navlabel">
            {role === "Employee" ? "PERSONAL INSIGHTS" : "MORE TOOLS"}
          </small>
          {nav(secondary)}
        </nav>
        <div className="sidebottom">
          <div className="goal">
            <strong>
              <Target size={16} /> Weekly goal
            </strong>
            <p>
              <b>3.5</b> / 5 learning hours
            </p>
            <div className="track">
              <i style={{ width: "70%" }} />
            </div>
            <small>70% of your weekly target</small>
          </div>
          <div className="org">
            <span>
              <Building2 size={19} />
            </span>
            <div>
              <b>Acme Industries</b>
              <small>Enterprise workspace</small>
            </div>
          </div>
        </div>
      </aside>
      <div className="maincol">
        <header className="topbar">
          <button
            className="mobiletoggle"
            aria-label="Open navigation"
            onClick={() => setMobile(true)}
          >
            <Menu size={20} />
          </button>
          <div className="crumb">
            <PanelLeft size={16} />
            <i />
            Workspace <ChevronRight size={13} />
            <b>{page}</b>
          </div>
          <div className="tools">
            <button
              className="globalfind"
              aria-label="Search workspace"
              onClick={() => {
                query("");
                setModal("search");
              }}
            >
              <Search size={15} />
              <span>Search anything...</span>
              <kbd>
                <Command size={10} /> K
              </kbd>
            </button>
            <button
              className="bell"
              aria-label="Notifications"
              onClick={() => {
                setModal("notices");
                markSeen(true);
              }}
            >
              <Bell size={18} />
              {!seen && <i />}
            </button>
            <button
              className="profile"
              aria-label="Account menu"
              onClick={() => setModal("profile")}
            >
              <span className="avatar">AM</span>
              <span>
                <b>Alex Morgan</b>
                <small>{role}</small>
              </span>
              <ChevronDown size={13} />
            </button>
          </div>
        </header>
        <main className="canvas" key={page + "-" + role}>
          {page === "Dashboard" ? (
            <Overview
              role={role}
              list={list}
              go={go}
              course={course}
              event={event}
            />
          ) : ["My learning", "My courses", "Course catalogue"].includes(
              page,
            ) ? (
            <Library
              name={page}
              list={page === "My courses" ? list.slice(0, 3) : list}
              open={course}
            />
          ) : page === "Assessments" ? (
            <Assessments score={score} setScore={setScore} />
          ) : page === "Certificates" ? (
            <Certificates list={list} />
          ) : page === "Employees" ? (
            <Employees rows={rows} setRows={setRows} />
          ) : page === "Analytics & reports" ? (
            <Reports />
          ) : page === "My progress" ? (
            <>
              <Intro
                name="My progress"
                desc="Track your learning activity and progress towards completion."
              />
              <ActivityChart />
              <section className="box">
                <div className="panelhead">
                  <h2>Course progress</h2>
                </div>
                {list
                  .filter((c) => c.done >= 0)
                  .map((c) => (
                    <CourseRow c={c} key={c.id} open={() => course(c)} />
                  ))}
              </section>
            </>
          ) : (
            <>
              <Intro
                name="Schedule"
                desc="Upcoming sessions, learning deadlines and assessments."
              />
              <section className="box agenda">
                {events.map((e, i) => (
                  <button key={e.day} onClick={() => event(i)}>
                    <span className={"dateblock tint" + i}>
                      <small>{e.month}</small>
                      <b>{e.day}</b>
                    </span>
                    <span>
                      <small className="eventtype">{e.type}</small>
                      <strong>{e.title}</strong>
                      <span className="secondary">
                        {e.time} · {e.duration}
                      </span>
                    </span>
                    <ChevronRight size={16} />
                  </button>
                ))}
              </section>
            </>
          )}
        </main>
      </div>
      {modal === "course" && active && (
        <CourseDetail
          c={active}
          close={() => setModal("")}
          update={(done) =>
            update(list.map((c) => (c.id === selected ? { ...c, done } : c)))
          }
        />
      )}{" "}
      {modal === "event" && (
        <Modal title={current.title} close={() => setModal("")}>
          <span className={"tag tint" + eventId}>{current.type}</span>
          <p>{current.detail}</p>
          <p className="meta">
            <CalendarDays size={16} />
            Nov {current.day}, 2026 · {current.time} · {current.duration}
          </p>
          <Button
            onClick={() =>
              eventId === 0
                ? go("Assessments")
                : eventId === 2
                  ? course(list[2])
                  : setSaved(saved.includes(1) ? [] : [1])
            }
          >
            {eventId === 0
              ? "Open assessment"
              : eventId === 2
                ? "View course"
                : saved.includes(1)
                  ? "Cancel reservation"
                  : "Reserve a seat"}
          </Button>
          {eventId === 1 && saved.includes(1) && (
            <p role="status" className="meta">
              <Check size={15} />
              Seat reserved in this demo session.
            </p>
          )}
        </Modal>
      )}
      {modal === "search" && (
        <Modal title="Search workspace" close={() => setModal("")}>
          <label className="searchfield">
            <Search size={16} />
            <input
              autoFocus
              placeholder="Search courses and pages…"
              aria-label="Search workspace"
              value={q}
              onChange={(e) => query(e.target.value)}
            />
          </label>
          <div className="resultlist">
            {[...primary, ...secondary]
              .filter((s) => s.toLowerCase().includes(q.toLowerCase()))
              .map((s) => (
                <button key={s} onClick={() => go(s)}>
                  <LayoutDashboard size={15} />
                  {s}
                  <ChevronRight size={14} />
                </button>
              ))}
            {list
              .filter((c) => c.title.toLowerCase().includes(q.toLowerCase()))
              .map((c) => (
                <button key={c.id} onClick={() => course(c)}>
                  <BookOpen size={15} />
                  {c.title}
                  <ChevronRight size={14} />
                </button>
              ))}
            {![...primary, ...secondary, ...list.map((c) => c.title)].some(
              (s) => s.toLowerCase().includes(q.toLowerCase()),
            ) && <p>No matches found.</p>}
          </div>
        </Modal>
      )}
      {modal === "notices" && (
        <Modal title="Notifications" close={() => setModal("")}>
          <p className="secondary">Recent workspace updates</p>
          <div className="resultlist">
            <button onClick={() => event(0)}>
              <Clock3 />
              Assessment due November 23
              <ChevronRight />
            </button>
            <button onClick={() => go("Certificates")}>
              <Award />
              Your certificates are ready to view
              <ChevronRight />
            </button>
          </div>
        </Modal>
      )}
      {modal === "profile" && (
        <Modal title="Your account" close={() => setModal("")}>
          <div className="meta">
            <span className="avatar">AM</span>
            <div>
              <b>Alex Morgan</b>
              <p className="secondary">{role} · Acme Industries</p>
            </div>
          </div>
          <p>
            Explore the sign-in and registration screens without connecting an
            account.
          </p>
          <Button onClick={() => go("Account")}>
            Open account screens <ArrowRight />
          </Button>
        </Modal>
      )}
    </div>
  );
}
