import { readFile, writeFile, mkdir } from 'fs/promises';
import { resolve } from 'path';
import { existsSync } from 'fs';
import OpenAI from 'openai';

// Ensure ~/.ai_cli directory exists
const aiCliDir = resolve(process.env.HOME, '.ai_cli');
if (!existsSync(aiCliDir)) {
  await mkdir(aiCliDir, { recursive: true });
}

// Read OpenAI token from ~/.ai_cli/token
const tokenPath = resolve(aiCliDir, 'token');
const token = await readFile(tokenPath, 'utf8').then(data => data.trim());
// Read system message from ~/.ai_cli/prompt
const promptPath = resolve(aiCliDir, 'prompt');
const systemMessage = await readFile(promptPath, 'utf8').then(data => data.trim());

// Get command-line arguments and form the user message
const userMessage = process.argv.slice(2).join(' ');


// Call OpenAI endpoint
const client = new OpenAI({
  apiKey: token,
  baseURL: 'https://litellm.in.customink.com/'
});


const chatCompletion = await client.chat.completions.create({
  messages: [
    { role: 'system', content: systemMessage },
    { role: 'user', content: userMessage }
  ],
  model: 'Claude-3-Sonnet' // Ensure the model name is correct
});

const aiResult = chatCompletion.choices[0].message.content.trim();

// Save result to ~/.ai_cli/tmp.result.sh
const resultPath = resolve(aiCliDir, 'tmp.result.sh');
await writeFile(resultPath, aiResult);

// Output result to console (for debugging purposes)
console.log(aiResult);

process.exit(0);
