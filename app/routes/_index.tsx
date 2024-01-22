import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="p-10 w-1/3 text-3xl font-bold mx-auto">
      <h1>👋 Welcome to Align.</h1>
    </div>
  );
}
