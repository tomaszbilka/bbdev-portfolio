import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/_index.tsx"),
    route("contributions", "routes/contributions.tsx"),
    route("contact", "routes/contact.tsx"),
    route("blog", "routes/blog._index.tsx"),
    route("blog/:slug", "routes/blog.$slug.tsx"),
  ]),
] satisfies RouteConfig;
