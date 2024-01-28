import "dotenv/config";
import { installGlobals } from "@remix-run/node";
import {
  beforeAll,
  afterEach,
  beforeEach,
  afterAll,
  vi,
  type MockInstance,
} from "vitest";
import { server } from "../../app/mocks";

installGlobals();

export let consoleError: MockInstance<Parameters<(typeof console)["error"]>>;

beforeAll(() => {
  console.log("🔶 MSW enabled.");
  server.listen({ onUnhandledRequest: "warn" });
  server.events.on("request:start", ({ request }) => {
    console.info("🔶 MSW intercepted:", request.method, request.url);
  });
});

beforeEach(() => {
  const originalConsoleError = console.error;
  consoleError = vi.spyOn(console, "error");
  consoleError.mockImplementation(
    (...args: Parameters<typeof console.error>) => {
      originalConsoleError(...args);
      throw new Error(
        "Console error was called. Call consoleError.mockImplementation(() => {}) if this is expected."
      );
    }
  );
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
