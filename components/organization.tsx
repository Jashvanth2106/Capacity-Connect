"use client";
import { useState } from "react";
import { Download, Search, UserPlus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Intro, Modal } from "./learning";
import { ActivityChart } from "./overview";
import { exportCsv } from "@/lib/learning";
export function Employees({
  rows,
  setRows,
}: {
  rows: string[][];
  setRows: (rows: string[][]) => void;
}) {
  const [q, query] = useState(""),
    [dept, filter] = useState("All departments"),
    [edit, setEdit] = useState<number | null>(null);
  return (
    <>
      <Intro
        name="Employees"
        desc="Manage the people and teams in your learning workspace."
      />
      <div className="filters">
        <label className="searchfield">
          <Search size={16} />
          <input
            aria-label="Search employees"
            placeholder="Search employees…"
            value={q}
            onChange={(e) => query(e.target.value)}
          />
        </label>
        <select
          aria-label="Department filter"
          value={dept}
          onChange={(e) => filter(e.target.value)}
        >
          {["All departments", ...new Set(rows.map((r) => r[1]))].map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
        <Button onClick={() => setEdit(-1)}>
          <UserPlus />
          Add employee
        </Button>
      </div>
      <div className="box tablewrap">
        <table>
          <thead>
            <tr>
              {["Employee", "Department", "Role", ""].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(
              ([name, d, r], i) =>
                (dept === "All departments" || d === dept) &&
                name.toLowerCase().includes(q.toLowerCase()) && (
                  <tr key={i}>
                    <td>
                      <b>{name}</b>
                    </td>
                    <td>{d}</td>
                    <td>
                      <span className="tag tint2">{r}</span>
                    </td>
                    <td>
                      <button className="textlink" onClick={() => setEdit(i)}>
                        Edit
                      </button>
                    </td>
                  </tr>
                ),
            )}
          </tbody>
        </table>
        {!rows.some(
          (r) =>
            (dept === "All departments" || r[1] === dept) &&
            r[0].toLowerCase().includes(q.toLowerCase()),
        ) && <p className="pad">No employees match these filters.</p>}
      </div>
      {edit !== null && (
        <Modal
          title={edit === -1 ? "Add employee" : "Edit employee"}
          close={() => setEdit(null)}
        >
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget);
              const row = ["name", "department", "role"].map((k) =>
                String(f.get(k)).trim(),
              );
              if (row.some((x) => !x)) return;
              setRows(
                edit === -1
                  ? [...rows, row]
                  : rows.map((r, i) => (i === edit ? row : r)),
              );
              setEdit(null);
            }}
          >
            <label>
              Full name
              <input required name="name" defaultValue={rows[edit]?.[0]} />
            </label>
            <label>
              Department
              <input
                required
                name="department"
                defaultValue={rows[edit]?.[1]}
              />
            </label>
            <label>
              Role
              <select name="role" defaultValue={rows[edit]?.[2]}>
                <option>Employee</option>
                <option>Trainer</option>
                <option>Administrator</option>
              </select>
            </label>
            <Button type="submit">Save employee</Button>
          </form>
        </Modal>
      )}
    </>
  );
}
export function Reports() {
  const rows = [
    ["Leadership", "48", "86%"],
    ["Data & analytics", "42", "79%"],
    ["Communication", "38", "81%"],
  ];
  return (
    <>
      <Intro
        name="Analytics & reports"
        desc="Explore participation and learning outcomes across your organization."
      />
      <ActivityChart team />
      <section className="box">
        <div className="panelhead">
          <h2>Learning outcomes by skill area</h2>
          <button
            className="textlink"
            onClick={() =>
              exportCsv("learning-outcomes", [
                ["Skill area", "Learners", "Completion rate"],
                ...rows,
              ])
            }
          >
            <Download />
            Export CSV
          </button>
        </div>
        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>Skill area</th>
                <th>Learners</th>
                <th>Completion rate</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r[0]}>
                  {r.map((v) => (
                    <td key={v}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
export function Account({ back }: { back: () => void }) {
  const [reg, toggle] = useState(false),
    [message, set] = useState("");
  return (
    <div className="auth">
      <div className="authbrand">
        <img src="/brand.svg" alt="" />
        CAPACITY CONNECT
      </div>
      <div className="box pad">
        <span className="eyebrow">ACCOUNT PREVIEW</span>
        <h1>{reg ? "Create an account" : "Welcome back"}</h1>
        <p>
          {reg
            ? "Join your organization’s learning workspace."
            : "Sign in to your learning workspace."}
        </p>
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            e.currentTarget.reset();
            set(
              "This is a frontend preview. No credentials were sent or stored.",
            );
          }}
        >
          {reg && (
            <label>
              Full name
              <input required autoComplete="name" />
            </label>
          )}
          <label>
            Work email
            <input type="email" required autoComplete="email" />
          </label>
          <label>
            Password
            <input
              type="password"
              minLength={8}
              required
              autoComplete={reg ? "new-password" : "current-password"}
            />
          </label>
          <Button type="submit">{reg ? "Register" : "Sign in"}</Button>
        </form>
        {message && (
          <p role="status" className="callout">
            {message}
          </p>
        )}
        <button
          className="textlink"
          onClick={() => {
            toggle(!reg);
            set("");
          }}
        >
          {reg
            ? "Already registered? Sign in"
            : "New to Capacity Connect? Register"}
        </button>
      </div>
      <button className="backdemo" onClick={back}>
        <ArrowLeft size={16} />
        Return to demo workspace
      </button>
    </div>
  );
}
