import { http, graphql, HttpResponse, HttpHandler } from "msw";
import { faker } from "@faker-js/faker";
import "./utils";

const { json } = HttpResponse;

export const handlers: Array<HttpHandler> = [
  http.post(`https://some-api`, async ({ request }) => {
    return json({
      id: faker.string.uuid(),
      created_at: new Date().toISOString(),
    });
  }),
];
