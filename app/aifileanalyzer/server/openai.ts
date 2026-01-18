"use server";

import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

// import OpenAI from "openai";

// const client = new OpenAI({
//   apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
// });

export async function getAIResponse(prompt: string) {
  try {
    // const { text } = await generateText({
    //   model: openai("gpt-4-turbo"),
    //   prompt,
    // });
    // return text;

    const result = await generateText({
      model: google("gemini-1.5-flash"),
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt,
            },
          ],
        },
      ],
    });

    return result.steps[0].text;
    // const response = await client.responses.create({
    //   model: "gpt-4o","gpt-4o-mini"
    //   instructions: "You are a coding assistant that talks like a pirate",
    //   input: prompt,
    // });

    // return response.output_text;
  } catch (error) {
    console.error(error);
    return "Error generating response";
  }
}
