import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "BBDEV" },
    { name: "description", content: "BBDEV portfolio!" },
  ];
};

export default function Index() {
  return (
    <div className="ml-4">
      <span className="text-3xl font-bold underline">
        Welcome to BBDEV portfolio
      </span>
    </div>
  );
}
