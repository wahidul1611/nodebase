import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    // Fetching the video
    await step.sleep("fetching", "5s");

    //Transcribing
    await step.sleep("trancribing", "5s")

    // Sending transcription to AI
    await step.sleep("sending-to-ai", "5s")

    await step.sleep("wait-a-moment", "10s");
    return { message: `Hello ${event.data.email}!` };
  },
);