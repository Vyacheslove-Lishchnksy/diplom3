export interface RTTTLMelody {
  title: string;
  code: string;
}

const RTTTL_LIBRARY: RTTTLMelody[] = [
  {
    title: "Samsung Over the Horizon",
    code: "Samsung:d=4,o=5,b=160:8e6,8p,16g#6,16f#6,16e6,16d#6,8b,8p,8g#5,8p,8c#6,8p,8e6,8p,8f#6",
  },
  {
    title: "Nokia Tune",
    code: "Nokia:d=4,o=5,b=160:8e6,8d6,4f#5,4g#5,8e6,8d6,4f#5,4g#5,8e6,8d6,4f#5,4g#5,4e6",
  },
  {
    title: "iPhone Marimba",
    code: "Iphone:d=4,o=5,b=120:8c6,8e6,8d6,8g,8c6,8e6,8d6,8g",
  },
  {
    title: "Jingle Bells",
    code: "JingleBells:d=8,o=5,b=125:e,e,4e,e,e,4e,e,g,f.,16e,2g,a,a,a.,16a,a,e,e,16e,16e,e,d,d,e,4d,4g",
  },
  {
    title: "Super Mario Theme",
    code: "Mario:d=4,o=5,b=100:16e6,16e6,32p,8e6,16c6,8e6,8g6,8p,8g,8p,8c6,16p,8g,16p,8e,16p,8a,8b,16a#,8a,16g.,16e6,16g6,8a6,16f6,8g6,8e6,16c6,16d6,8b",
  },
  {
    title: "Star Wars Main Theme",
    code: "StarWars:d=4,o=5,b=45:32p,32f#,32f#,32f#,8b.,8f#.6,32e6,32d#6,32c#6,8b.6,16f#.6,32e6,32d#6,32c#6,8b.6,16f#.6,32e6,32d#6,32e6,8c#.6",
  },
  {
    title: "Imperial March (Darth Vader)",
    code: "Imperial:d=4,o=5,b=100:e,e,e,8c6,16g,e,8c6,16g,2e,b,b,b,8c6,16g,d#,8c6,16g,2e",
  },
  {
    title: "Mission Impossible",
    code: "MissionImp:d=16,o=6,b=95:32d,32d,32d#,32d#,32d,32d,32c#,32c#,32d,32d,32d#,32d#,32d,32d,32c#,32c#,32d,32d,32d#,32d#,32d,32d,32c#,32c#,d,f,8g,d,f,8g,d,f,8g,d,f,8g",
  },
  {
    title: "Inspector Gadget",
    code: "Gadget:d=4,o=5,b=125:8c6,8d6,8e6,8f6,8g6,2g#,8g6,8f6,8e6,8d6,8c6,8b,2c6",
  },
  {
    title: "A-ha - Take On Me",
    code: "TakeOnMe:d=4,o=4,b=160:8f#5,8f#5,8f#5,8d5,8b,8b,8e5,8e5,8e5,8g#5,8g#5,8a5,8b5,8a5,8a5,8a5,8e5,8d5,8f#5,8f#5,8f#5,8e5,8e5,8f#5,8e5",
  },
];

export default RTTTL_LIBRARY;
