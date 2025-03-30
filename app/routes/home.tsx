import type { Route } from "./+types/home";
import Login from "./login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TASKMANAGEMENT" },
    { name: "TASKMANAGEMENT", content: "Welcome to Taskmanagement" },
  ];
}

export default function Home() {
  return (<main className="w-screen h-screen flex overflow-hidden">
    <Login />
  </main>
  );
}
