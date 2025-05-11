import { NextResponse } from "next/server";
import OpenAI, { toFile } from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const prompt = formData.get('prompt') as string;
    const imageFiles = formData.getAll('images') as File[];

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    if (!imageFiles || imageFiles.length === 0) {
      return NextResponse.json({ error: "At least one image is required" }, { status: 400 });
    }

    // Convert uploaded files to OpenAI compatible format
    const images = await Promise.all(
      imageFiles.map(async (file) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        return await toFile(buffer, file.name, { type: file.type });
      })
    );

    // Edit images using OpenAI - remove response_format parameter
    const result = await openai.images.edit({
      model: "gpt-image-1", 
      image: images,
      prompt
    });

    // Check if data exists and has at least one element
    if (!result.data || result.data.length === 0) {
      return NextResponse.json(
        { error: "No image data returned" },
        { status: 500 }
      );
    }

	const imageBase64 = result.data[0].b64_json;

	if (!imageBase64) {
	  return NextResponse.json(
		{ error: "Failed to get image data" },
		{ status: 500 }
	  );
	}
	
	// Return the base64 data to the client
	return NextResponse.json({ 
	  imageUrl: `data:image/png;base64,${imageBase64}`,
	  revised_prompt: result.data[0].revised_prompt 
	});
  } catch (error: any) {
    console.error("Error editing image:", error);
    return NextResponse.json(
      { error: error.message || "Failed to edit image" },
      { status: 500 }
    );
  }
}