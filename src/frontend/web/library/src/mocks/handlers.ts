import { rest } from "msw";
import dummy1 from "~/assets/dummy1.png";
import dummy2 from "~/assets/dummy2.png";
import dummy3 from "~/assets/dummy3.png";

export const handlers = [
  rest.post("/login", (req, res, ctx) => {
    // Persist user's authentication in the session
    sessionStorage.setItem("is-authenticated", "true");
    return res(
      // Respond with a 200 status code
      ctx.status(200)
    );
  }),
  rest.get("/user", (req, res, ctx) => {
    // Check if the user is authenticated in this session
    const isAuthenticated = sessionStorage.getItem("is-authenticated");
    if (!isAuthenticated) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: "Not authorized",
        })
      );
    }
    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json({
        username: "admin",
      })
    );
  }),
  rest.get("/images/:imageId", async (req, res, ctx) => {
    const dummyImages = [dummy1, dummy2, dummy3];
    const imageIndex = Math.floor(Math.random() * dummyImages.length);
    const imageBuffer = await fetch(dummyImages[imageIndex]).then((res) =>
      res.arrayBuffer()
    );
    return res(
      ctx.set("Content-Length", imageBuffer.byteLength.toString()),
      ctx.set("Content-Type", "image/png"),
      ctx.body(imageBuffer)
    );
  }),
];
