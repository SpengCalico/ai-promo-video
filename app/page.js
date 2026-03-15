"use client";

import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState(null);
  const [songName, setSongName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [message, setMessage] = useState("");

  function handleImageUpload(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  }

  function handleSongUpload(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    setSongName(file.name);
  }

  function handleGenerate() {
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

    setMessage(
      `Generating promo video for "${songName}" with prompt: "${prompt}"`
    );
  }

  return (
    <main
      style={{
        background: "#0a0a0a",
        color: "white",
        minHeight: "100vh",
        padding: "60px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
        Speng Music Promo Generator
      </h1>

      <p style={{ fontSize: "20px", marginTop: "20px", maxWidth: "800px" }}>
        Turn your song into promo videos for Instagram, YouTube Shorts and
        Spotify Canvas.
      </p>

      <div style={{ marginTop: "40px" }}>
        <label
          htmlFor="artist-photo"
          style={{
            background: "white",
            color: "black",
            padding: "15px 30px",
            borderRadius: "10px",
            fontSize: "16px",
            cursor: "pointer",
            display: "inline-block",
            fontWeight: "bold",
            marginRight: "15px",
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
      </div>

      {image ? (
        <div style={{ marginTop: "30px" }}>
          <h2>Image Preview</h2>
          <img
            src={image}
            alt="Uploaded artist"
            style={{
              maxWidth: "300px",
              borderRadius: "12px",
              border: "2px solid white",
              marginTop: "10px",
            }}
          />
        </div>
      ) : null}

      <div style={{ marginTop: "40px" }}>
        <label
          htmlFor="song-file"
          style={{
            background: "white",
            color: "black",
            padding: "15px 30px",
            borderRadius: "10px",
            fontSize: "16px",
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
          <p style={{ marginTop: "15px" }}>Song uploaded: {songName}</p>
        ) : null}
      </div>

      <div style={{ marginTop: "40px", maxWidth: "700px" }}>
        <h2>Video Prompt</h2>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Example: Create a modern dancehall promo teaser with fast cuts, nightclub energy, bold text, and cinematic lighting."
          style={{
            width: "100%",
            minHeight: "120px",
            marginTop: "12px",
            padding: "15px",
            borderRadius: "10px",
            border: "1px solid #444",
            background: "#111",
            color: "white",
            fontSize: "16px",
          }}
        />
      </div>

      <div style={{ marginTop: "30px" }}>
        <button
          onClick={handleGenerate}
          style={{
            background: "white",
            color: "black",
            padding: "15px 30px",
            borderRadius: "10px",
            fontSize: "16px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Generate Promo Video
        </button>
      </div>

      {message ? (
        <div
          style={{
            marginTop: "25px",
            padding: "15px",
            background: "#151515",
            border: "1px solid #333",
            borderRadius: "10px",
            maxWidth: "800px",
          }}
        >
          {message}
        </div>
      ) : null}
    </main>
  );
}