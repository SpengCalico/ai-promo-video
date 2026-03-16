export async function POST(req) {
  const body = await req.json();
  const { songName, prompt } = body;

  const scenes = [
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

  return Response.json({
    success: true,
    prompt,
    scenes,
  });
}