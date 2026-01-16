import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function chibify() {
    if (!file) return;

    setLoading(true);
    const base64 = await toBase64(file);

    const res = await fetch("/api/chibify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: base64 })
    });

    const data = await res.json();
    setResult(data.image);
    setLoading(false);
  }

  return (
    <main style={{ textAlign: "center", padding: 40 }}>
      <h1>✨ AI Chibify ✨</h1>

      <input type="file" accept="image/*"
        onChange={(e) => setFile(e.target.files[0])} />

      <br /><br />

      <button onClick={chibify}>
        {loading ? "Chibifying..." : "Chibify"}
      </button>

      <br /><br />

      {result && <img src={result} width={300} />}
    </main>
  );
}

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
    }
          
