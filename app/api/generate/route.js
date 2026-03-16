export async function POST(req) {
  const body = await req.json();

  const { songName, prompt } = body;

  const scenes = [
    {
      scene: 1,
      description: "Artist walking through neon-lit city street at night",
      text: "New drop tonight",
    },
    {
      scene: 2,
      description: "Crowd dancing in nightclub with strobe lights",
      text: songName,
    },
    {
      scene: 3,
      description: "Close-up performance shot with smoke and spotlight",
      text: "Feel the energy",
    },
    {
      scene: 4,
      description: "Wide cinematic shot of DJ performing on stage",
      text: "Out now",
    },
  ];

  return Response.json({
    success: true,
    prompt,
    scenes,
  });
}