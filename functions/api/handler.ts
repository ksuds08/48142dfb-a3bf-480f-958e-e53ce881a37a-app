import { OpenAI } from '@openai/api';

// Initialize OpenAI API client
const openai = new OpenAI(process.env.OPENAI_API_KEY);

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === '/api/chat') {
      // Handle chat messages
      if (request.method === 'POST') {
        try {
          const { message } = await request.json();

          if (!message) {
            return new Response('Bad Request: No message provided.', { status: 400 });
          }

          // Send message to OpenAI's API
          const completion = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: message,
            max_tokens: 150,
          });

          const aiResponse = completion.choices[0]?.text?.trim();

          return new Response(JSON.stringify({ response: aiResponse }), {
            headers: { 'Content-Type': 'application/json' },
          });
        } catch (error) {
          return new Response('Internal Server Error', { status: 500 });
        }
      } else {
        return new Response('Method Not Allowed', { status: 405 });
      }
    }

    // Default response for other paths
    return new Response('OK');
  }
};
