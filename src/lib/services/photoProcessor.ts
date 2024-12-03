import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

interface PhotoMessageParams {
  mediaUrl: string;
  messageBody: string;
  from: string;
}

export async function processPhotoMessage({ mediaUrl, messageBody, from }: PhotoMessageParams) {
  try {
    // Download the image from Twilio's MediaUrl
    const response = await fetch(mediaUrl);
    const imageBuffer = await response.arrayBuffer();

    // Process the image with OpenAI Vision API
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: messageBody || "What's in this image?" },
            {
              type: "image_url",
              image_url: {
                url: mediaUrl,
              },
            },
          ],
        },
      ],
      max_tokens: 300,
    });

    const metadata = {
      description: response.choices[0]?.message?.content || "No description available",
      phoneNumber: from,
      imageUrl: mediaUrl,
      timestamp: new Date().toISOString()
    };

    // Store metadata in Supabase
    const { data, error } = await supabase
      .from('photos')
      .insert([metadata])
      .select();

    if (error) throw error;

    return metadata;
  } catch (error) {
    console.error('Error processing photo:', error);
    throw error;
  }
} 