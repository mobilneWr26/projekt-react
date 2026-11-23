import { useState, useEffect } from "react";

function StronaGlowna() {
  const [kraje, setKraje] = useState([]);
  const [ladowanie, setLadowanie] = useState(true);
  const [blad, setBlad] = useState("");

  useEffect(() => {
  async function pobierzKraje() {
    try {
      const odpowiedz = await fetch("https://countries.dev/countries");

      if (!odpowiedz.ok) {
        throw new Error("Nie udało się pobrać państw");
      }

      const dane = await odpowiedz.json();
      setKraje(dane);

    } catch (error) {
      setBlad(error.message);

    } finally {
      setLadowanie(false);
    }
  }

  pobierzKraje();
  }, []);

  if (ladowanie) {
  return <p>Ładowanie państw...</p>;
  }

  if (blad) {
    return <p>{blad}</p>;
  }

  if(!ladowanie && !blad){
    return <p>Załadowano {kraje.length} państw!</p>;
  }
  return (
    <div>
      <h1>🌍 CountryQuiz</h1>
      <p>Sprawdź swoją wiedzę o państwach świata!</p>
      <button>Rozpocznij quiz</button>
      

    </div>
    
  );
}

export default StronaGlowna;