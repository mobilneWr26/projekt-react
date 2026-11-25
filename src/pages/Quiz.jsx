import { Link, useLocation } from "react-router";
import { nazwaPanstwaPoPolsku } from "../utils/tlumaczenia";
import { useState } from "react";
import { nazwaKontynentuPoPolsku } from "../utils/tlumaczenia";
import { nazwaStolicyPoPolsku } from "../utils/tlumaczenia";
import { generujPytania } from "../utils/pytania";
import { nazwaWalutyPoPolsku } from "../utils/tlumaczenia";
import { nazwaJezykaPoPolsku } from "../utils/tlumaczenia";
function Quiz(){
    // useLocation() - odbiera dane przekazane z useNavigate()
    const location = useLocation();
    // ? zabezpiecza zeby sie nie zepsuło gdy otworzymy strone quiz bez wyboru państwa
    const kraj = location.state?.kraj;
    const poziomTrudnosci = location.state?.poziomTrudnosci;
    const wszystkieKraje = location.state?.wszystkieKraje || [];
    const [punkty, setPunkty] = useState(0);
    const [pytania] = useState(() =>
        generujPytania(kraj, wszystkieKraje, poziomTrudnosci)
    );

    const [numerPytania, setNumerPytania] = useState(0);
    const [zakonczony, setZakonczony] = useState(false);
    const pytanie = pytania[numerPytania];

    const [wybranaOdpowiedz, setWybranaOdpowiedz] = useState(null);
    if (!kraj) {
        return (
            <div>
            <h1>Nie wybrano państwa!</h1>
            <Link to="/">Wróć do strony głównej</Link>
            </div>
        );
    }
    if (!pytanie) {
        return <p>Nie udało się przygotować pytań.</p>;
    }

    if (zakonczony) {
        return (
            <div>
            <h1>Koniec testowego quizu!</h1>
            <p>Twój wynik: {punkty}/{pytania.length}</p>
            <Link to="/">Wróć na stronę główną</Link>
            </div>
        );
    }
    if (!pytanie) {
        return <p>Nie udało się przygotować pytań.</p>;
    }

    function klasaOdpowiedzi(stolica) {
        if (wybranaOdpowiedz === null) {
            return "";
        }

        if (stolica === pytanie.poprawna) {
            return "poprawna";
        }

        if (stolica === wybranaOdpowiedz) {
            return "bledna";
        }

        return "";
    }

    let komunikat = null;

    if (wybranaOdpowiedz !== null) {
        if (wybranaOdpowiedz === pytanie.poprawna) {
            komunikat = (
            <p className="tekst-poprawny">Poprawna odpowiedź!</p>
            );
        } 
        else {
            komunikat = (
            <p className="tekst-bledny">
                Błędna odpowiedź! Poprawna to: {tekstOdpowiedzi(pytanie.poprawna)}
            </p>
            );
        }
    }
    function tekstOdpowiedzi(odpowiedz) {
        if (pytanie.typ === "kontynent") {
            return nazwaKontynentuPoPolsku(odpowiedz);
        }

        if (pytanie.typ === "waluta") {
            return nazwaWalutyPoPolsku(odpowiedz);
        }

        if (pytanie.typ === "jezyk") {
            return nazwaJezykaPoPolsku(odpowiedz);
        }

        if (pytanie.typ === "powierzchnia") {
            return odpowiedz.toLocaleString("pl-PL") + " km²";
        }

        if (pytanie.typ === "ludnosc") {
            return odpowiedz.toLocaleString("pl-PL") + " osób";
        }

        return nazwaStolicyPoPolsku(odpowiedz);
    }

    function sprawdzOdpowiedz(stolica) {
        if (wybranaOdpowiedz !== null) {
            return;
        }

        setWybranaOdpowiedz(stolica);

        if (stolica === pytanie.poprawna) {
            setPunkty(punkty + 1);
        }
    }
    function nastepnePytanie() {
        if (numerPytania < pytania.length - 1) {
            setNumerPytania(numerPytania + 1);
            setWybranaOdpowiedz(null);
        } else {
            setZakonczony(true);
        }
    }

    let tekstPrzycisku = "Następne pytanie";

    if (numerPytania === pytania.length - 1) {
        tekstPrzycisku = "Zakończ quiz";
    }
    return (
        <div>
            <h1>Quiz geograficzny</h1>

            <h2>Państwo: {nazwaPanstwaPoPolsku(kraj)}</h2>
            <p>Poziom trudności: {poziomTrudnosci}</p>
            <div className="naglowek-quizu">
                <p>Pytanie {numerPytania + 1}/{pytania.length}</p>
                <div className="pasek-postepu">
                    <div
                        className="wypelnienie-postepu"
                        style={{
                        width: ((numerPytania + 1) / pytania.length) * 100 + "%"
                        }}>
                    </div>
                </div>
                <div className="licznik-punktow">
                    {punkty} pkt
                </div>
            </div>
            <h2>{pytanie.tresc}</h2>
            <div className="odpowiedzi">
                {pytanie.odpowiedzi.map((stolica) => (
                    <button
                    key={stolica}
                    className={"odpowiedz " + klasaOdpowiedzi(stolica)}
                    onClick={() => sprawdzOdpowiedz(stolica)}
                    disabled={wybranaOdpowiedz !== null}
                    >
                    {tekstOdpowiedzi(stolica)}
                    </button>
                ))}
            </div>
           {komunikat}
           {wybranaOdpowiedz !== null && (
            <button onClick={nastepnePytanie}>
                {tekstPrzycisku}
            </button>
            )}
        </div>
    );
}

export default Quiz;