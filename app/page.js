export default function Home() {
  return (
    <div style={{background:"#0a0a0a",color:"white",minHeight:"100vh",padding:"60px",fontFamily:"Arial"}}>
      <h1 style={{fontSize:"48px"}}>Speng Music Promo Generator</h1>
      <p style={{fontSize:"20px",marginTop:"20px"}}>
        Turn your song into promo videos for Instagram, YouTube Shorts and Spotify Canvas.
      </p>

      <div style={{marginTop:"40px"}}>
        <button style={{
          background:"white",
          color:"black",
          padding:"15px 30px",
          borderRadius:"10px",
          fontSize:"16px",
          border:"none",
          cursor:"pointer"
        }}>
          Generate Promo Video
        </button>
      </div>
    </div>
  )
}