const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function generateSceneImage(promptText) {
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-image-1-mini",
      prompt: promptText,
      size: "1024x1024",
      quality: "low",
      output_format: "jpeg",
    }),
  });

  const rawText = await response.text();

  if (!response.ok) {
    throw new Error(`OpenAI image generation failed: ${rawText}`);
  }

  const data = JSON.parse(rawText);
  const b64 = data?.data?.[0]?.b64_json;

  if (!b64) {
    throw new Error("No image data returned from OpenAI.");
  }

  return `data:image/jpeg;base64,${b64}`;
}

export async function POST(req) {
  try {
    if (!OPENAI_API_KEY) {
      return Response.json(
        {
          success: false,
          error: "Missing OPENAI_API_KEY in .env.local",
        },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { songName, prompt, outputType } = body;

    let scenes = [];

    if (outputType === "canvas") {
      scenes = [
        {
          scene: 1,
          description:
            "Loop-friendly performance visual with smooth motion, moody lighting, and minimal distractions for Spotify Canvas.",
          text: "",
        },
        {
          scene: 2,
          description:
            "Atmospheric close-up shot with subtle movement, strong mood, and a clean looping feel.",
          text: "",
        },
      ];
    } else if (outputType === "both") {
      scenes = [
        {
          scene: 1,
          description:
            "Artist entrance shot with dramatic lighting and a strong social promo feel.",
          text: "New Drop Tonight",
        },
        {
          scene: 2,
          description:
            "Crowd reaction shot with hands in the air, club lighting, and fast-cut hype moments.",
          text: songName || "Now Playing",
        },
        {
          scene: 3,
          description:
            "Loop-friendly Spotify Canvas visual with moody lighting and minimal motion styling.",
          text: "",
        },
        {
          scene: 4,
          description:
            "Wide cinematic ending shot with title reveal and social-ready promo framing.",
          text: "Out Now",
        },
      ];
    } else {
      scenes = [
        {
          scene: 1,
          description:
            "Artist entrance shot with dramatic lighting, a confident walk-in, and bold release energy.",
          text: "New Drop Tonight",
        },
        {
          scene: 2,
          description:
            "Crowd reaction shot with hands in the air, club lighting, and fast-cut hype moments.",
          text: songName || "Now Playing",
        },
        {
          scene: 3,
          description:
            "Close-up performance shot with smoke, spotlight, and intense face expression matching the rhythm.",
          text: "Feel The Energy",
        },
        {
          scene: 4,
          description:
            "Wide cinematic ending shot with hero pose, title reveal, and social-ready promo framing.",
          text: "Out Now",
        },
      ];
    }

    const sceneImages = await Promise.all(
      scenes.map(async (scene) => {
        const imagePrompt = `
Create a cinematic music promo image.
Output type: ${outputType}
Style: modern dancehall, Caribbean nightlife, social-media promo.
Overall campaign prompt: ${prompt}
Scene description: ${scene.description}
Text overlay mood: ${scene.text}
Make it dramatic, polished, high-energy, and visually striking.
No watermarks. No logos. No random readable text.
        `.trim();

        const image = await generateSceneImage(imagePrompt);

        return {
          ...scene,
          image,
        };
      })
    );

    return Response.json({
      success: true,
      prompt,
      outputType,
      scenes: sceneImages,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error.message || "Something went wrong generating the storyboard.",
      },
      { status: 500 }
    );
  }
}