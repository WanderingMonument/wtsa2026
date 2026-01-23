/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import OpenAI from "openai";



export default {
	async fetch(request, env, ctx) {

		if (request.method === "OPTIONS") {
            return new Response(null, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type",
					"Access-Control-Max-Age": "86400",
                }
            });
        }

		const client = new OpenAI({
			apiKey: "API-KEY-HERE",
			baseURL: 'https://api.voidai.app/v1',
			dangerouslyAllowBrowser: true
		});

		const base64Image = await request.text();

		if (!base64Image) {
        	return new Response("No image data", { 
				status: 400, 
				headers: {
                    "Access-Control-Allow-Origin": "*",
                } 
			});
      	}

		try {
			const response = await client.chat.completions.create({
				model: 'gpt-5.2',
				messages: [
					{ role: 'system', content: 'You are a helpful assistant designed to describe the contents of screenshots provided to you for accessibility purposes. Keep the responses short, not too long.' },
					{
						role: 'user', content: [
							{ "type": "text", "text": "Describe this screenshot" },
							{
								"type": "image_url",
								"image_url": {
									"url": "data:image/jpeg;base64," + base64Image
								}
							}
						]
					}
				]
			});


		const data = response.choices[0].message.content;

		return new Response(data, { 
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Content-Type": "text/plain",
			}
		});
			
		}
		catch(error) {
			return new Response(JSON.stringify({ error: error.message }), { 
                status: 500,
                headers: { 
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                }
            });
		}
	},
};
