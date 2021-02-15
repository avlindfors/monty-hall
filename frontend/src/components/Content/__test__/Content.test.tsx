import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent } from "@testing-library/react";
import Content from "..";

function mockApi(status: number, response: any) {
  server.use(
    rest.post("/api/v1/simulate", (req, res, ctx) => {
      return res(ctx.status(status), ctx.json(response));
    })
  );
}

const server = setupServer(
  rest.post("/api/v1/simulate", (req, res, ctx) => {
    return res(
      ctx.json({
        totalSimulations: "1000",
        totalWins: "750",
      })
    );
  })
);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe("Content", () => {
  test("can perform simulations", async () => {
    const rendered = render(<Content />);
    const submitButton = await rendered.findByText("Simulate");
    fireEvent.click(submitButton);
    await rendered.findByText(
      "Out of 1000 simulations you picked the right door 750 times!"
    );
    await rendered.findByText(
      "You made the right choice!"
    );
  });

  test("can show error message", async () => {
    mockApi(400, {
      code: "NETWORK_ERROR",
      description: "Something has gone wrong..",
    });

    const rendered = render(<Content />);
    const submitButton = await rendered.findByText("Simulate");
    await fireEvent.click(submitButton);
    await rendered.findByText("Something has gone wrong..");
    await rendered.findByText("Use the form above to create and run simulations");
  });
});
