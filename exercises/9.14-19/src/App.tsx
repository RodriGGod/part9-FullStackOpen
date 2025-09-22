import React from "react";

/** ========= Tipos ========= **/

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  kind: string; // discriminante común
}

// Nueva interfaz con description que extiende la base
interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartWithDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  kind: "group";
  groupProjectCount: number;
}

interface CoursePartBackground extends CoursePartWithDescription {
  kind: "background";
  backgroundMaterial: string;
}

interface CoursePartSpecial extends CoursePartWithDescription {
  kind: "special";
  requirements: string[];
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

/** ========= Componentes ========= **/

type HeaderProps = { name: string };
const Header = ({ name }: HeaderProps) => <h1>{name}</h1>;

function assertNever(value: never): never {
  throw new Error(`Unhandled course part: ${JSON.stringify(value, null, 2)}`);
}

type PartProps = { part: CoursePart };

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case "basic":
      return (
        <p>
          <strong>{part.name}</strong> — exercises {part.exerciseCount}
          <br />
          <em>{part.description}</em>
        </p>
      );

    case "group":
      return (
        <p>
          <strong>{part.name}</strong> — exercises {part.exerciseCount}
          <br />
          Group projects: {part.groupProjectCount}
        </p>
      );

    case "background":
      return (
        <p>
          <strong>{part.name}</strong> — exercises {part.exerciseCount}
          <br />
          <em>{part.description}</em>
          <br />
          Background material: {part.backgroundMaterial}
        </p>
      );

    case "special":
      return (
        <p>
          <strong>{part.name}</strong> — exercises {part.exerciseCount}
          <br />
          <em>{part.description}</em>
          <br />
          Requirements: {part.requirements.join(", ")}
        </p>
      );

    default:
      return assertNever(part);
  }
};

type ContentProps = { parts: CoursePart[] };
const Content = ({ parts }: ContentProps) => (
  <div>
    {parts.map((p, i) => (
      <Part key={`${p.kind}-${p.name}-${i}`} part={p} />
    ))}
  </div>
);

type TotalProps = { total: number };
const Total = ({ total }: TotalProps) => (
  <p>
    <strong>Number of exercises {total}</strong>
  </p>
);

/** ========= App ========= **/

const App = () => {
  const courseName = "Half Stack application development";

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    // Nueva parte "special"
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
    },
  ];

  const totalExercises = courseParts.reduce(
    (sum, p) => sum + p.exerciseCount,
    0
  );

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default App;
