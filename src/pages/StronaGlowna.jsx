import { useState, useEffect } from "react";
import { nazwaPanstwaPoPolsku } from "../utils/tlumaczenia";
import { nazwaStolicyPoPolsku } from "../utils/tlumaczenia";
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


return (
  <div className="strona-glowna">
    <h1>🌍 CountryQuiz</h1>
    <p>Wybierz państwo, aby rozpocząć quiz!</p>

    <p>Załadowano {kraje.length} państw</p>
    <div className="lista-krajow">
      {kraje.slice(0, 12).map((kraj) => (
        //key - identyfikator elementu listy
        <div className="karta-kraju" key={kraj.alpha3Code}>
          <img
            src={kraj.flags.svg}
            alt={"Flaga " + kraj.name}
          />
          <h2>{nazwaPanstwaPoPolsku(kraj)}</h2>
          <p>Stolica: {nazwaStolicyPoPolsku(kraj.capital)}</p>
        </div>
      ))}
    </div>
  </div>
);

}

export default StronaGlowna;