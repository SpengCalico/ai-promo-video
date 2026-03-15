"use client";

import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState(null);

  function handleImageUpload(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
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
            border: "none",
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
      </div>

      {image ? (
        <div style={{ marginTop: "40px" }}>
          <h2 style={{ marginBottom: "20px" }}>Image Preview</h2>
          <img
            src={image}
            alt="Uploaded artist"
            style={{
              maxWidth: "300px",
              borderRadius: "12px",
              border: "2px solid white",
            }}
          />
        </div>
      ) : null}
    </main>
  );
}