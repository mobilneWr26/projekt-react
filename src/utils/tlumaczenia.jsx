// tłumaczenie nazw państw na polski na podstawie kodu kraju
const tłumaczenieNaPolski = new Intl.DisplayNames(["pl"], {
  type: "region"
});

export function nazwaPanstwaPoPolsku(kraj) {
  return tłumaczenieNaPolski.of(kraj.alpha2Code) || kraj.name;
}


const stolicePoPolsku = {
  "Warsaw": "Warszawa",
  "Vienna": "Wiedeń",
  "Prague": "Praga",
  "Rome": "Rzym",
  "Athens": "Ateny",
  "London": "Londyn",
  "Paris": "Paryż",
  "Lisbon": "Lizbona",
  "Brussels": "Bruksela",
  "Copenhagen": "Kopenhaga",
  "Stockholm": "Sztokholm",
  "Bern": "Berno",
  "Bucharest": "Bukareszt",
  "Belgrade": "Belgrad",
  "Bratislava": "Bratysława",
  "Ljubljana": "Lublana",
  "Zagreb": "Zagrzeb",
  "Sarajevo": "Sarajewo",
  "Budapest": "Budapeszt",
  "Vilnius": "Wilno",
  "Riga": "Ryga",
  "Tallinn": "Tallin",
  "Minsk": "Mińsk",
  "Chisinau": "Kiszyniów",
  "Kyiv": "Kijów",
  "Kiev": "Kijów",
  "Moscow": "Moskwa",
  "Reykjavik": "Reykjavik",
  "Luxembourg": "Luksemburg",

  "Tokyo": "Tokio",
  "Beijing": "Pekin",
  "Seoul": "Seul",
  "Pyongyang": "Pjongjang",
  "Taipei": "Tajpej",
  "Jakarta": "Dżakarta",
  "Kathmandu": "Katmandu",
  "Ulaanbaatar": "Ułan Bator",
  "Bishkek": "Biszkek",
  "Dushanbe": "Duszanbe",
  "Ashgabat": "Aszchabad",
  "Tashkent": "Taszkent",
  "Yerevan": "Erywań",
  "Tehran": "Teheran",
  "Baghdad": "Bagdad",
  "Damascus": "Damaszek",
  "Beirut": "Bejrut",
  "Jerusalem": "Jerozolima",
  "Abu Dhabi": "Abu Zabi",
  "Riyadh": "Rijad",
  "Muscat": "Maskat",
  "Sanaa": "Sana",
  "Vientiane": "Wientian",

  "Cairo": "Kair",
  "Algiers": "Algier",
  "Tripoli": "Trypolis",
  "Khartoum": "Chartum",
  "Addis Ababa": "Addis Abeba",
  "Kinshasa": "Kinszasa",
  "Nouakchott": "Nawakszut",
  "N'Djamena": "Ndżamena",
  "Ouagadougou": "Wagadugu",
  "Yaoundé": "Jaunde",
  "Mogadishu": "Mogadiszu",
  "Djibouti": "Dżibuti",
  "Windhoek": "Windhuk",
  "Antananarivo": "Antananarywa",
  "Cape Town": "Kapsztad",

  "Washington, D.C.": "Waszyngton",
  "Washington D.C.": "Waszyngton",
  "Mexico City": "Meksyk",
  "Havana": "Hawana"
};

export function nazwaStolicyPoPolsku(stolica) {
  if (!stolica) {
    return "Brak danych";
  }

  return stolicePoPolsku[stolica] || stolica;
}