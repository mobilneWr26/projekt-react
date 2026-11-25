import { useState, useEffect } from "react";
import { nazwaPanstwaPoPolsku } from "../utils/tlumaczenia";
import { nazwaStolicyPoPolsku } from "../utils/tlumaczenia";
import { useNavigate } from "react-router";

function StronaGlowna() {
  const [kraje, setKraje] = useState([]);
  const [ladowanie, setLadowanie] = useState(true);
  const [blad, setBlad] = useState("");
  const [wyszukiwanie, setWyszukiwanie] = useState("");
  const [wybranyKraj, setWybranyKraj] = useState(null);
  const [poziomTrudnosci, setPoziomTrudnosci] = useState("latwy");
  //useNavigate() - przekazuje dane do strony do której przechodzimy
  const navigate = useNavigate();

  function rozpocznijQuiz() {
    if (wybranyKraj) {
      navigate("/quiz", {
        state: {
          kraj: wybranyKraj,
          poziomTrudnosci: poziomTrudnosci,
          wszystkieKraje: kraje
        }
      });
    }
  }
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

  const przefiltrowaneKraje = kraje.filter((kraj) =>
    nazwaPanstwaPoPolsku(kraj)
    .toLocaleLowerCase("pl")
    .includes(wyszukiwanie.trim().toLocaleLowerCase("pl"))
  );

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

    <input type="text" placeholder="Wyszukaj państwo..." value={wyszukiwanie} onChange={(e) => setWyszukiwanie(e.target.value)}/>
    {wybranyKraj && (
      <p>
        Wybrane państwo: {nazwaPanstwaPoPolsku(wybranyKraj)}
      </p>
    )}
    <div className="wybor-poziomu">
      <label htmlFor="poziom">Poziom trudności: </label>

      <select id="poziom" value={poziomTrudnosci} onChange={(e) => setPoziomTrudnosci(e.target.value)}>
        <option value="latwy">Łatwy</option>
        <option value="sredni">Średni</option>
        <option value="trudny">Trudny</option>
      </select>
    </div>

    <button onClick={rozpocznijQuiz} disabled={!wybranyKraj}> Rozpocznij quiz </button>
    <div className="lista-krajow">
      {przefiltrowaneKraje.map((kraj) => (
        //key - identyfikator elementu listy
        <div className="karta-kraju" key={kraj.alpha3Code}>
          <img
            src={kraj.flags.svg}
            alt={"Flaga " + kraj.name}
          />
          <h2>{nazwaPanstwaPoPolsku(kraj)}</h2>
          <p>Stolica: {nazwaStolicyPoPolsku(kraj.capital)}</p>
          <button onClick={() => setWybranyKraj(kraj)}>
            Wybierz państwo
          </button>
        </div>
      ))}
    </div>
    {przefiltrowaneKraje.length === 0 && (
      <p>Nie znaleziono takiego państwa.</p>
    )}
  </div>
);

}

export default StronaGlowna;