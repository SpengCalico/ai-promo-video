export async function POST(req) {
  const body = await req.json();
  const { songName, prompt } = body;

  const scenes = [
    {
      scene: 1,
      description: "Artist walking through neon-lit city street at night",
      text: "New drop tonight",
      image:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80",
    },
    {
      scene: 2,
      description: "Crowd dancing in nightclub with strobe lights",
      text: songName,
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80",
    },
    {
      scene: 3,
      description: "Close-up performance shot with smoke and spotlight",
      text: "Feel the energy",
      image:
        "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80",
    },
    {
      scene: 4,
      description: "Wide cinematic shot of DJ performing on stage",
      text: "Out now",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80",
    },
  ];

  return Response.json({
    success: true,
    prompt,
    scenes,
  });
}