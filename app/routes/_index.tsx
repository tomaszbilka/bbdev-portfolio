import { useRef } from "react";
import type { MetaFunction } from "@remix-run/node";

import Header from "~/components/header";
import About from "~/components/about";

export const meta: MetaFunction = () => {
  return [
    { title: "BBDEV" },
    { name: "description", content: "BBDEV portfolio!" },
  ];
};

export default function Index() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Header scrollRef={scrollRef} />
      <About scrollRef={scrollRef} />
    </>
  );
}
