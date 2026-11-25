
import { nazwaPanstwaPoPolsku, kontynentyPoPolsku } from "./tlumaczenia";

export function losujOdpowiedzi(poprawna, mozliweOdpowiedzi) {
  const bledne = mozliweOdpowiedzi.filter(odpowiedz =>
    odpowiedz !== poprawna &&
    odpowiedz !== null &&
    odpowiedz !== undefined &&
    odpowiedz !== ""
  );

  bledne.sort(() => Math.random() - 0.5);

  const odpowiedzi = [poprawna];

  for (let odpowiedz of bledne) {
    if (!odpowiedzi.includes(odpowiedz)) {
      odpowiedzi.push(odpowiedz);
    }

    if (odpowiedzi.length === 4) {
      break;
    }
  }

  return odpowiedzi.sort(() => Math.random() - 0.5);
}


export function generujPytania(kraj, wszystkieKraje, poziomTrudnosci) {
  if (!kraj) {
    return [];
  }

  const pytania = [];
  const nazwa = nazwaPanstwaPoPolsku(kraj);

  if (poziomTrudnosci === "latwy") {

    // Pytanie o stolicę
    if (kraj.capital) {
      pytania.push({
        tresc: "Jaka jest stolica państwa " + nazwa + "?",
        poprawna: kraj.capital,
        odpowiedzi: losujOdpowiedzi(
          kraj.capital,
          wszystkieKraje.map(p => p.capital)
        ),
        typ: "stolica"
      });
    }

    // Pytanie o kontynent
    const kontynenty = Object.keys(kontynentyPoPolsku);

    if (kontynenty.includes(kraj.region)) {
      pytania.push({
        tresc: "Na jakim kontynencie leży państwo " + nazwa + "?",
        poprawna: kraj.region,
        odpowiedzi: losujOdpowiedzi(kraj.region, kontynenty),
        typ: "kontynent"
      });
    }

  } else if (poziomTrudnosci === "sredni") {

    // Pytanie o walutę
    const waluta = kraj.currencies?.[0]?.code;

    if (waluta) {
      pytania.push({
        tresc: "Jaka waluta obowiązuje w państwie " + nazwa + "?",
        poprawna: waluta,
        odpowiedzi: losujOdpowiedzi(
          waluta,
          wszystkieKraje.map(p => p.currencies?.[0]?.code)
        ),
        typ: "waluta"
      });
    }

    // Pytanie o język
    const jezykiKraju = (kraj.languages || [])
      .map(j => j.iso639_1)
      .filter(j => j);

    const jezyk = jezykiKraju[0];

    if (jezyk) {
      const inneJezyki = wszystkieKraje
        .flatMap(p => p.languages || [])
        .map(j => j.iso639_1)
        .filter(j => j && !jezykiKraju.includes(j));

      pytania.push({
        tresc: "Który język jest urzędowy w państwie " + nazwa + "?",
        poprawna: jezyk,
        odpowiedzi: losujOdpowiedzi(jezyk, inneJezyki),
        typ: "jezyk"
      });
    }

  } else if (poziomTrudnosci === "trudny") {

    // Pytanie o powierzchnię
    if (kraj.area > 0) {
      pytania.push({
        tresc: "Jaką powierzchnię ma państwo " + nazwa + "?",
        poprawna: kraj.area,
        odpowiedzi: losujOdpowiedzi(
          kraj.area,
          wszystkieKraje.map(p => p.area).filter(a => a > 0)
        ),
        typ: "powierzchnia"
      });
    }

    // Pytanie o liczbę mieszkańców
    if (kraj.population > 0) {
      pytania.push({
        tresc: "Ilu mieszkańców ma państwo " + nazwa + " według danych API?",
        poprawna: kraj.population,
        odpowiedzi: losujOdpowiedzi(
          kraj.population,
          wszystkieKraje.map(p => p.population).filter(l => l > 0)
        ),
        typ: "ludnosc"
      });
    }
  }

  return pytania
    .filter(p => p.odpowiedzi.length === 4)
    .sort(() => Math.random() - 0.5);
}
