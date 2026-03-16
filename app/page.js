"use client";

import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState(null);
  const [songName, setSongName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [message, setMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [scenes, setScenes] = useState([]);

  function handleImageUpload(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
    setMessage("");
    setScenes([]);
  }

  function handleSongUpload(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    setSongName(file.name);
    setMessage("");
    setScenes([]);
  }

  async function generateStoryboard() {
    if (!image) {
      setMessage("Please upload an artist photo first.");
      return;
    }

    if (!songName) {
      setMessage("Please upload a song first.");
      return;
    }

    if (!prompt.trim()) {
      setMessage("Please enter a video prompt.");
      return;
    }

    setMessage("");
    setIsGenerating(true);
    setScenes([]);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          songName,
          prompt,
        }),
      });

      const data = await res.json();

      const updatedScenes = (data.scenes || []).map((scene) => ({
        ...scene,
        image: image,
      }));

      setScenes(updatedScenes);
      setMessage("Storyboard generated successfully!");
    } catch (error) {
      setMessage("Something went wrong while generating the storyboard.");
    } finally {
      setIsGenerating(false);
    }
  }

  function updateSceneField(sceneNumber, field, value) {
    setScenes((prevScenes) =>
      prevScenes.map((scene) =>
        scene.scene === sceneNumber ? { ...scene, [field]: value } : scene
      )
    );
  }

  function downloadStoryboard() {
    if (scenes.length === 0) {
      setMessage("Generate a storyboard first.");
      return;
    }

    const exportData = {
      songName,
      prompt,
      scenes,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "storyboard.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main
      style={{
        background: "#0a0a0a",
        color: "white",
        minHeight: "100vh",
        padding: "40px 24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <div style={{ marginBottom: "30px" }}>
          <p
            style={{
              fontSize: "13px",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: "#9f9f9f",
              marginBottom: "10px",
            }}
          >
            AI music promo builder
          </p>

          <h1
            style={{
              fontSize: "48px",
              marginBottom: "14px",
              lineHeight: 1.1,
            }}
          >
            Speng Music Promo Generator
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: "#c7c7c7",
              maxWidth: "760px",
              lineHeight: 1.6,
            }}
          >
            Upload an artist image, add a song, write a promo prompt, and
            generate a visual storyboard for Instagram Reels, YouTube Shorts,
            and Spotify Canvas campaigns.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "24px",
          }}
        >
          <div
            style={{
              background: "#111",
              border: "1px solid #2a2a2a",
              borderRadius: "16px",
              padding: "24px",
            }}
          >
            <h2 style={{ marginBottom: "20px", fontSize: "24px" }}>
              Project Setup
            </h2>

            <div style={{ marginBottom: "24px" }}>
              <label
                htmlFor="artist-photo"
                style={{
                  background: "white",
                  color: "black",
                  padding: "14px 22px",
                  borderRadius: "10px",
                  fontSize: "15px",
                  cursor: "pointer",
                  display: "inline-block",
                  fontWeight: "bold",
                }}
              >
                Upload Artist Photo
              </label>

              <input
                id="artist-photo"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />

              {image ? (
                <div style={{ marginTop: "18px" }}>
                  <p
                    style={{
                      marginBottom: "10px",
                      color: "#bdbdbd",
                      fontSize: "14px",
                    }}
                  >
                    Artist image loaded
                  </p>
                  <img
                    src={image}
                    alt="Uploaded artist"
                    style={{
                      width: "220px",
                      height: "220px",
                      objectFit: "cover",
                      borderRadius: "14px",
                      border: "2px solid #333",
                      display: "block",
                    }}
                  />
                </div>
              ) : null}
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label
                htmlFor="song-file"
                style={{
                  background: "white",
                  color: "black",
                  padding: "14px 22px",
                  borderRadius: "10px",
                  fontSize: "15px",
                  cursor: "pointer",
                  display: "inline-block",
                  fontWeight: "bold",
                }}
              >
                Upload Song
              </label>

              <input
                id="song-file"
                type="file"
                accept="audio/*"
                onChange={handleSongUpload}
                style={{ display: "none" }}
              />

              {songName ? (
                <p
                  style={{
                    marginTop: "14px",
                    color: "#c7c7c7",
                  }}
                >
                  Song uploaded: <strong>{songName}</strong>
                </p>
              ) : null}
            </div>

            <div style={{ marginBottom: "24px" }}>
              <h3 style={{ marginBottom: "12px", fontSize: "18px" }}>
                Video Prompt
              </h3>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Example: Create a modern dancehall promo teaser with fast cuts, nightclub energy, bold text overlays, smoke, cinematic lighting, and release-day hype."
                style={{
                  width: "100%",
                  minHeight: "130px",
                  padding: "16px",
                  borderRadius: "12px",
                  border: "1px solid #333",
                  background: "#0b0b0b",
                  color: "white",
                  fontSize: "15px",
                  lineHeight: 1.5,
                  resize: "vertical",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <button
                onClick={generateStoryboard}
                disabled={isGenerating}
                style={{
                  background: "white",
                  color: "black",
                  padding: "14px 22px",
                  borderRadius: "10px",
                  fontSize: "15px",
                  border: "none",
                  cursor: isGenerating ? "not-allowed" : "pointer",
                  fontWeight: "bold",
                  opacity: isGenerating ? 0.7 : 1,
                }}
              >
                {isGenerating ? "Generating..." : "Generate Storyboard"}
              </button>

              <button
                onClick={downloadStoryboard}
                style={{
                  background: "#1b1b1b",
                  color: "white",
                  padding: "14px 22px",
                  borderRadius: "10px",
                  fontSize: "15px",
                  border: "1px solid #333",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Download Storyboard
              </button>
            </div>

            {message ? (
              <div
                style={{
                  marginTop: "18px",
                  padding: "14px",
                  background: "#151515",
                  border: "1px solid #333",
                  borderRadius: "10px",
                  color: "#e5e5e5",
                }}
              >
                {message}
              </div>
            ) : null}
          </div>

          {scenes.length > 0 && (
            <div
              style={{
                background: "#111",
                border: "1px solid #2a2a2a",
                borderRadius: "16px",
                padding: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "12px",
                  flexWrap: "wrap",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <h2 style={{ fontSize: "24px", marginBottom: "6px" }}>
                    Storyboard
                  </h2>
                  <p style={{ color: "#bdbdbd", margin: 0 }}>
                    Edit the scenes before you move to image or video generation.
                  </p>
                </div>

                <button
                  onClick={generateStoryboard}
                  disabled={isGenerating}
                  style={{
                    background: "#1b1b1b",
                    color: "white",
                    padding: "12px 18px",
                    borderRadius: "10px",
                    fontSize: "14px",
                    border: "1px solid #333",
                    cursor: isGenerating ? "not-allowed" : "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Regenerate
                </button>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "20px",
                }}
              >
                {scenes.map((scene) => (
                  <div
                    key={scene.scene}
                    style={{
                      background: "#0d0d0d",
                      borderRadius: "14px",
                      border: "1px solid #2f2f2f",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={scene.image || image}
                      alt={`Scene ${scene.scene}`}
                      style={{
                        width: "100%",
                        height: "280px",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />

                    <div style={{ padding: "20px" }}>
                      <p
                        style={{
                          fontSize: "13px",
                          color: "#9f9f9f",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          marginBottom: "10px",
                        }}
                      >
                        Scene {scene.scene}
                      </p>

                      <label
                        style={{
                          display: "block",
                          marginBottom: "8px",
                          fontWeight: "bold",
                        }}
                      >
                        Scene Description
                      </label>
                      <textarea
                        value={scene.description}
                        onChange={(e) =>
                          updateSceneField(
                            scene.scene,
                            "description",
                            e.target.value
                          )
                        }
                        style={{
                          width: "100%",
                          minHeight: "90px",
                          padding: "12px",
                          borderRadius: "10px",
                          border: "1px solid #333",
                          background: "#111",
                          color: "white",
                          fontSize: "14px",
                          marginBottom: "16px",
                          resize: "vertical",
                        }}
                      />

                      <label
                        style={{
                          display: "block",
                          marginBottom: "8px",
                          fontWeight: "bold",
                        }}
                      >
                        Text Overlay
                      </label>
                      <input
                        type="text"
                        value={scene.text}
                        onChange={(e) =>
                          updateSceneField(scene.scene, "text", e.target.value)
                        }
                        style={{
                          width: "100%",
                          padding: "12px",
                          borderRadius: "10px",
                          border: "1px solid #333",
                          background: "#111",
                          color: "white",
                          fontSize: "14px",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}