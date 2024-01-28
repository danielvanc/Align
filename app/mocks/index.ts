import { setupServer } from "msw/node";
import { handlers } from "./handlers";
import { http, passthrough } from "msw";

const remix = process.env.REMIX_DEV_HTTP_ORIGIN as string;

const miscHandlers = [
  http.post(`${remix}/ping`, () => {
    return passthrough();
  }),
];

export const server = setupServer(...miscHandlers, ...handlers);

server.listen({ onUnhandledRequest: "warn" });

server.events.on("request:start", ({ request }) => {
  console.info("🔶 MSW intercepted:", request.method, request.url);
});

process.once("SIGINT", () => server.close());
process.once("SIGTERM", () => server.close());
