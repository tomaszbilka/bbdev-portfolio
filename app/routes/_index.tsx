import type { MetaFunction } from "@remix-run/node";

import Header from "~/components/header";

export const meta: MetaFunction = () => {
  return [
    { title: "BBDEV" },
    { name: "description", content: "BBDEV portfolio!" },
  ];
};

export default function Index() {
  return (
    <>
      <Header />
    </>
  );
}
