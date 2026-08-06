/* =====================================================================
   INNHOLDSFIL – Voss Chalet
   ---------------------------------------------------------------------
   ALT tekstinnhold på nettsiden ligger i denne filen. Du trenger ikke
   røre HTML, CSS eller JavaScript for å endre teksten.

   Slik redigerer du:
   • Tekst står inne i "anførselstegn". Bytt teksten, behold tegnene.
   • Lister står i [firkantklammer], adskilt med komma.
   • Alt under `no:` er norsk, alt under `en:` er engelsk.
     Endrer du noe på norsk, husk å endre tilsvarende på engelsk.
   • Linjer som starter med // er kommentarer og vises ikke på siden.

   Beskrivelse, fasiliteter, husregler og anmeldelser er hentet fra
   Airbnb-annonsen. Punkter merket TODO er praktisk info Airbnb ikke
   viser offentlig (wifi-passord, koder, telefonnummer osv.) – de må
   fylles inn manuelt.
   ===================================================================== */

window.SITE = {
  /* -------------------------------------------------------------------
     1. GRUNNOPPSETT – gjelder begge språk
     ------------------------------------------------------------------- */
  meta: {
    siteName: "Voss Chalet",
    // Lenken gjestene sendes til for å booke
    airbnbUrl: "https://www.airbnb.com/h/vosschalet",

    hostName: "Michelle og Marius",
    // All kontakt går via Airbnb-meldinger. Fylles disse ut, dukker de
    // opp i bunnteksten — la dem stå tomme for å holde dem skjult.
    email: "",
    phone: "",
    address: "Tråstølsvegen 10, Voss",

    // Nøkkelfakta fra Airbnb-annonsen
    facts: { guests: 9, bedrooms: 4, beds: 6, baths: 2 },

    // Inn- og utsjekk (fra husreglene på Airbnb)
    checkIn: "15:00",
    checkOut: "11:00",

    // Vurdering fra Airbnb – vises som et lite merke i toppen
    rating: { score: "5,0", scoreEn: "5.0", count: 37, badgeNo: "Gjestefavoritt", badgeEn: "Guest favourite" },

    // Vises øverst i husmanualen, med kopier-knapp og QR-kode.
    // Endrer dere wifi: kjør `python3 tools/lag-wifi-qr.py` for ny QR.
    wifi: {
      ssid: "Zyxel_4012",
      password: "8U84CXYX4H",
      qr: "assets/img/wifi-qr.svg"
    },

    /* Viktige numre. `no`/`en` er teksten til venstre, `value` er det
       som står til høyre. Er verdien ulik på de to språkene, bruk
       valueNo og valueEn i stedet for value. */
    emergency: [
      { no: "Brann", en: "Fire", value: "110" },
      { no: "Politi", en: "Police", value: "112" },
      { no: "Ambulanse", en: "Ambulance", value: "113" },
      { no: "Legevakt", en: "Out-of-hours doctor", value: "116 117" },
      { no: "Veihjelp (Viking)", en: "Roadside assistance (Viking)", value: "06000" },
      { no: "Førstehjelpsskrin", en: "First aid kit",
        valueNo: "På vaskerommet", valueEn: "In the utility room" },
      { no: "Michelle og Marius", en: "Michelle and Marius",
        valueNo: "Meldinger i Airbnb-appen", valueEn: "Messages in the Airbnb app" }
    ],

    // Google Maps: åpne kartet, trykk Del → Bygg inn kart, og lim inn
    // KUN adressen fra src="..." her. La stå tom for å skjule kartet.
    mapEmbed: "",

    // Kartlenke som åpnes i ny fane (fungerer selv uten innebygd kart)
    mapLink: "https://www.google.com/maps/search/?api=1&query=Tr%C3%A5st%C3%B8lsvegen+10%2C+Voss",

    /* -----------------------------------------------------------------
       PASSORD TIL GJESTESIDENE
       -----------------------------------------------------------------
       Forsiden (index.html) er åpen for alle. Hytteside, husmanual,
       husregler og områdeguide krever passordet under.

       Passordet lagres ikke her — bare et sha256-avtrykk av det.
       Slik bytter du passord:
         1. Åpne admin/passord.html i nettleseren
         2. Skriv inn ønsket passord
         3. Kopier linjen du får, og lim den inn som `hash:` under

       Nåværende passord: modernchalet
       ----------------------------------------------------------------- */
    access: {
      hash: "ec02c2867ba5833ec4203fd810cb821babe6c7461ac537e38599cb05f6580359",
      // Liten hjelpetekst under passordfeltet. La stå tom for å skjule.
      hintNo: "Passordet står i meldingen dere fikk på Airbnb.",
      hintEn: "The password is in the message we sent you on Airbnb."
    }
  },

  /* -------------------------------------------------------------------
     2. BILDER OG VIDEO
     ---------------------------------------------------------------------
     Bildene ligger i assets/img/ og videoene i assets/video/.
     Filer som ikke finnes vises som en pen plassholder, så siden ser
     aldri ødelagt ut. Anbefalt for nye bilder: ca. 1600–2000 px bredde,
     .jpg eller .webp, under 400 kB.
     ------------------------------------------------------------------- */
  media: {
    // Toppbildet på landingssiden (index.html)
    landing: "assets/img/jacuzzi-kveld.avif",
    // Toppbildet på hyttesiden (hytta.html)
    hero: "assets/img/terrasse-jacuzzi.jpg",

    // Vises i «Beliggenhet» så lenge meta.mapEmbed står tom
    locationMap: "assets/img/omrade-loypekart.avif",

    // Galleriet på hyttesiden. Første bilde vises bredt.
    gallery: [
      { src: "assets/img/stue-spiseplass.avif", captionNo: "Stue og spiseplass med panoramautsikt", captionEn: "Living and dining area with panoramic views" },
      { src: "assets/img/stue-kjokken.jpg", captionNo: "Åpen stue- og kjøkkenløsning med peis", captionEn: "Open-plan living room and kitchen with fireplace" },
      { src: "assets/img/jacuzzi-kveld.avif", captionNo: "Saltvannsjacuzzien en kveld", captionEn: "The salt-water hot tub in the evening" },
      { src: "assets/img/bad-badstue.avif", captionNo: "Bad med badstue", captionEn: "Bathroom with sauna" },
      { src: "assets/img/stue-terrasse.jpg", captionNo: "Stuen med utgang til terrassen", captionEn: "Living room opening onto the terrace" },
      { src: "assets/img/soverom-dobbeltseng-1.avif", captionNo: "Soverom med dobbeltseng", captionEn: "Bedroom with a double bed" },
      { src: "assets/img/hems-tv-stue.jpg", captionNo: "Hems og TV-stue", captionEn: "Mezzanine and TV lounge" },
      { src: "assets/img/nordlys.avif", captionNo: "Nordlys over terrassen", captionEn: "Northern lights above the terrace" },
      { src: "assets/img/soverom-koyeseng-1.avif", captionNo: "Soverom med køyeseng", captionEn: "Bedroom with bunk beds" },
      { src: "assets/img/kjokken-peis.avif", captionNo: "Kjøkkenet med peisen i stuen", captionEn: "The kitchen, with the fireplace in the living room" },
      { src: "assets/img/soverom-dobbeltseng-2.avif", captionNo: "Soverom under skråtaket", captionEn: "Bedroom under the sloping roof" },
      { src: "assets/img/bad-1.avif", captionNo: "Bad", captionEn: "Bathroom" },
      { src: "assets/img/lekerom.avif", captionNo: "Lekerom og bod", captionEn: "Playroom and storage" },
      { src: "assets/img/jacuzzi-dag.jpg", captionNo: "Jacuzzi med utsikt over dalen", captionEn: "Hot tub overlooking the valley" },
      { src: "assets/img/utside-garasje.jpg", captionNo: "Hytta utenfra, med garasje og parkering", captionEn: "The chalet from outside, with garage and parking" },
      { src: "assets/img/kjokken-utsikt.avif", captionNo: "Kjøkkenøya mot utsikten", captionEn: "The kitchen island facing the view" }
    ],

    /* ---------------------------------------------------------------
       BILDER OG VIDEO I HUSMANUALEN
       Nøkkelen (ankomst, jacuzzi …) må stemme med `id` på seksjonen
       lenger nede. Video kjennes igjen på .mp4/.mov, eller lim inn en
       YouTube-/Vimeo-lenke. Rekkefølgen her er rekkefølgen på siden.
       --------------------------------------------------------------- */
    manual: {
      ankomst: [
        { src: "assets/video/ankomst-kjorevei.mp4", capNo: "Veien opp til hytta", capEn: "The drive up to the chalet" },
        { src: "assets/img/manual-kodelas.jpg", capNo: "Kodelåsen ved ytterdøren", capEn: "The keypad lock at the front door" },
        { src: "assets/img/manual-nokler.jpg", capNo: "Fjernkontroll til garasjen og nøkkel til annekset henger i gangen", capEn: "The garage remote and the key to the annexe hang in the hallway" },
        { src: "assets/img/manual-nokkelkort.jpg", capNo: "Bomkort til vegbommen", capEn: "Cards for the road barrier" }
      ],
      jacuzzi: [
        { src: "assets/video/jacuzzi.mp4", capNo: "Slik tar du av og på lokket", capEn: "How to take the cover off and put it back" },
        { src: "assets/img/manual-jacuzzi-temp.jpg", capNo: "Jacuzzien står klar på badetemperatur hele året", capEn: "The hot tub is kept at bathing temperature all year" },
        { src: "assets/img/manual-jacuzzi-ph.jpg", capNo: "Vannverdiene sjekkes før hver ankomst", capEn: "The water values are checked before every arrival" },
        { src: "assets/img/manual-spashock.jpg", capNo: "Spa Shock-granulatet står i garasjen, ett lokk etter bruk", capEn: "The Spa Shock granulate is in the garage, one capful after use" }
      ],
      badstue: [
        { src: "assets/video/badstue.mp4", capNo: "Slik skrur dere på badstuen i 1. etasje", capEn: "How to switch on the ground-floor sauna" },
        { src: "assets/img/bad-badstue.avif", capNo: "Badstuen på badet i 1. etasje", capEn: "The sauna in the ground-floor bathroom" }
      ],
      peis: [
        { src: "assets/img/kjokken-peis.avif", capNo: "Peisen i stuen", capEn: "The fireplace in the living room" }
      ],
      kjokken: [
        { src: "assets/video/kjokken-kokende-vann.mp4", capNo: "Kranen med kokende vann", capEn: "The boiling-water tap" },
        { src: "assets/img/kjokken-utsikt.avif", capNo: "Kjøkkenøya", capEn: "The kitchen island" }
      ],
      lading: [
        { src: "assets/img/utside-garasje.jpg", capNo: "Garasje og parkering utenfor hytta", capEn: "Garage and parking outside the chalet" },
        { src: "assets/img/manual-parkering-vei.jpg", capNo: "Ekstra parkering på andre siden av veien, om det trengs", capEn: "Extra parking across the road if you need it" }
      ],
      soppel: [
        { src: "assets/img/manual-soppelstasjon.jpg", capNo: "Søppelstasjonen", capEn: "The waste station" }
      ]
    }
  },

  /* ===================================================================
     3. NORSK INNHOLD
     =================================================================== */
  no: {
    nav: {
      home: "Hytta",
      manual: "Husmanual",
      rules: "Husregler",
      area: "Området",
      book: "Book på Airbnb"
    },

    // Landingssiden (index.html) – den eneste siden som er åpen for alle
    landing: {
      eyebrow: "Tråstølen · Voss",
      title: "Voss Chalet",
      tagline: "Moderne hytte med ski in/ski out, badstue og saltvannsjacuzzi, med panoramautsikt over Lønavatnet.",
      bookCta: "Book på Airbnb",
      guestTitle: "Er du gjest hos oss?",
      guestText: "Logg inn for hytteside, husmanual, husregler og tips til området.",
      passwordLabel: "Passord",
      submit: "Logg inn",
      error: "Feil passord. Prøv igjen, eller send oss en melding på Airbnb.",
      unsupported: "Innlogging krever at siden åpnes over https. Bruk lenken vi sendte på Airbnb."
    },

    facts: {
      guests: "gjester",
      bedrooms: "soverom",
      beds: "senger",
      baths: "bad"
    },

    hero: {
      eyebrow: "Tråstølen · Voss",
      title: "Moderne hytte i Voss",
      subtitle:
        "Ny hytte med ekte ski in/ski out i Tråstølen. Fire soverom, badstue, saltvannsjacuzzi og stor terrasse med panoramautsikt over Lønavatnet.",
      ctaPrimary: "Sjekk ledige datoer",
      ctaSecondary: "Se husmanualen"
    },

    about: {
      title: "Om hytta",
      lead:
        "Velkommen til en moderne og innholdsrik hytte i Tråstølen på Voss, perfekt plassert med ekte ski in/ski out. Den store, solrike terrassen byr på panoramautsikt over Lønavatnet.",
      paragraphs: [
        "Hytten har fire soverom, to bad, badstue, TV-stue, lekerom og hems. Stuen og kjøkkenet ligger i en åpen løsning med peis, store vinduer og fullt utstyrt kjøkken.",
        "På terrassen står en Arctic Spa saltvannsjacuzzi som gir ekstra komfort etter en aktiv dag. Det miljøvennlige saltvannssystemet er skånsomt for hud og hår og gir en behagelig spaopplevelse med avslappende hydroterapi.",
        "Hytten har moderne fasiliteter, god lagringsplass, garasje, elbillading og gjesteparkering til fem biler. Sengetøy og håndklær er inkludert.",
        "Med kort vei til Voss sentrum, fjellturer, ski og aktiviteter året rundt er dette et ideelt sted for både familier og vennegjenger som vil kombinere komfort med natur og opplevelser."
      ]
    },

    highlights: {
      title: "Det gjestene liker best",
      items: [
        { icon: "ski", title: "Ski in / ski out", text: "Skiheisene ligger rett utenfor døren, med over 40 km preparerte løyper i Voss Resort." },
        { icon: "hottub", title: "Saltvannsjacuzzi", text: "Arctic Spa med hudvennlig saltvann, tilgjengelig hele året og døgnet rundt." },
        { icon: "sauna", title: "Badstue", text: "Godt å ta etter en dag i bakken eller på fjellet." },
        { icon: "mountain", title: "Utsikt over Lønavatnet", text: "Gulv-til-tak-vinduer i stuen og stor, solrik terrasse med panoramautsikt." },
        { icon: "fire", title: "Peis i åpen stue", text: "Åpen stue- og kjøkkenløsning med peis og fullt utstyrt kjøkken." },
        { icon: "car", title: "Garasje og elbillading", text: "Elbillader nivå 2 i garasjen, og gjesteparkering til fem biler." },
        { icon: "kids", title: "Familievennlig", text: "Lekerom, hems, TV-stue og sprinkelseng gjør hytta godt egnet for barnefamilier." },
        { icon: "bed", title: "Alt er klart", text: "Sengetøy, håndklær og forbruksvarer som såpe, sjampo og toalettpapir er inkludert." }
      ]
    },

    sleeping: {
      title: "Hvor dere sover",
      subtitle: "Fire soverom, seks senger, plass til ni gjester.",
      rooms: [
        { title: "Soverom 1", beds: "1 køyeseng" },
        { title: "Soverom 2", beds: "1 køyeseng" },
        { title: "Soverom 3", beds: "1 dobbeltseng" },
        { title: "Soverom 4", beds: "1 dobbeltseng, 1 sprinkelseng" }
      ],
      note: "I tillegg kommer hems, TV-stue og lekerom."
    },

    amenities: {
      title: "Fasiliteter",
      subtitle: "Alt dette står klart når dere kommer.",
      groups: [
        {
          title: "Ute og spa",
          items: ["Privat saltvannsjacuzzi, hele året og hele døgnet", "Badstue", "Stor terrasse med panoramautsikt", "Utendørsdusj", "Grill", "Nær skiløype/-bakke"]
        },
        {
          title: "Kjøkken og stue",
          items: ["Fullt utstyrt kjøkken", "Åpen stue- og kjøkkenløsning", "Peis", "TV", "TV-stue og lekerom", "Hems"]
        },
        {
          title: "Praktisk",
          items: ["Trådløst nettverk", "Vaskemaskin", "Klimaanlegg", "Sengetøy og håndklær inkludert", "Forbruksvarer (såpe, sjampo, toalettpapir)", "Røykvarsler"]
        },
        {
          title: "Parkering",
          items: ["Garasje", "Elbillader (nivå 2)", "Gjesteparkering til 5 biler", "Gratis parkering på stedet"]
        }
      ],
      // Airbnb oppgir at karbonmonoksidvarsler ikke er installert – vi sier det ærlig her.
      noteTitle: "Verdt å vite",
      note: "Hytta har røykvarslere. Karbonmonoksidvarsler er foreløpig ikke installert. Innkjørselen ned til garasjen er bratt, og kan være krevende når det er mye snø. Det er god parkering på andre siden av veien."
    },

    gallery: {
      title: "Bilder",
      subtitle: "Klikk på et bilde for å se det større."
    },

    reviews: {
      title: "Hva gjestene sier",
      subtitle: "Utdrag fra anmeldelser på Airbnb.",
      cta: "Les alle anmeldelsene på Airbnb",
      items: [
        {
          text: "Vi hadde et fantastisk opphold i denne vakre og moderne hytten. Det føltes rent og luksuriøst, sengene var gode og hytten var godt utstyrt med kjøkkenartikler, håndklær, sengetøy og toalettartikler.",
          author: "Camilla",
          meta: "mars 2026"
        },
        {
          text: "Vi elsket saunaen og jacuzzien etter en dag i snøen! Vi hadde fantastiske familiemiddager i et veldig vakkert, fredelig, rent og imøtekommende hjem!",
          author: "Frances",
          meta: "mars 2026 · gruppetur"
        },
        {
          text: "Fra det øyeblikket vi gikk inn, ble vi møtt av fantastiske vinduer fra gulv til tak med utsikt over de nydelige fjellene i Voss. Det føltes virkelig som om vi bodde i en koselig hytte høyt oppe i fjellet.",
          author: "Joel",
          meta: "Singapore"
        },
        {
          text: "Både barn og voksne satte pris på jacuzzien og utendørsdusjen. Det var veldig praktisk at huset var utstyrt med forbruksvarer som toalettpapir, såpe, oppvaskmiddel og sjampo.",
          author: "Puck",
          meta: "sommer 2026 · to familier"
        },
        {
          text: "Hjemmet er vakkert, privat og utrolig koselig. Sengene var veldig komfortable. Beliggenheten var utmerket, og vi vil alltid verdsette minnene om å se nordlyset fra dette stedet.",
          author: "Hannah",
          meta: "januar 2026 · Colorado"
        },
        {
          text: "Dette er en flott hytte med skisenteret i umiddelbar nærhet! Vertskapet er hyggelig og svarte raskt på henvendelser.",
          author: "Isak",
          meta: "mars 2026"
        }
      ]
    },

    location: {
      title: "Beliggenhet",
      text:
        "Hytta ligger i Tråstølen på Voss, med skiheisene rett utenfor døren og kort vei til Voss sentrum. Nøyaktig adresse og adkomstinfo sendes på Airbnb-melding før ankomst.",
      distancesTitle: "Avstander",
      // TODO: juster minuttene hvis noe ikke stemmer
      distances: [
        { label: "Skiheis / skiløype", value: "Rett utenfor døren" },
        { label: "Voss Resort", value: "Ski in / ski out" },
        { label: "Nærmeste dagligvare", value: "ca. 10 min med bil" },
        { label: "Voss sentrum og togstasjon", value: "ca. 15 min med bil" },
        { label: "Myrkdalen", value: "ca. 30 min med bil" },
        { label: "Nærøyfjorden / Flåm", value: "ca. 1–1,5 t med bil" },
        { label: "Hardangerfjorden", value: "ca. 1–1,5 t med bil" },
        { label: "Bergen", value: "ca. 1,5 t med bil" }
      ],
      mapCta: "Åpne i Google Maps"
    },

    host: {
      title: "Vertskapet",
      name: "Michelle og Marius",
      badge: "Superhost",
      text:
        "Vi bor i Bergen og har vært verter i tre år. Vi svarer normalt innen en time, og hjelper gjerne med lokale tips før og under oppholdet. Ta kontakt via Airbnb hvis dere lurer på noe.",
      stats: [
        { value: "5,0", label: "gjennomsnittlig vurdering" },
        { value: "37", label: "anmeldelser" },
        { value: "100 %", label: "svarprosent" }
      ]
    },

    cta: {
      title: "Ledig for din neste tur?",
      text: "Priser, kalender og booking ligger på Airbnb. Har du spørsmål før du bestiller, er det bare å ta kontakt.",
      button: "Se ledige datoer på Airbnb"
    },

    /* --- HUSMANUAL -------------------------------------------------
       Dette er den delen Airbnb ikke viser offentlig. Innholdet under
       er et utgangspunkt basert på hva hytta faktisk har – gå gjennom
       hvert punkt og rett opp der det ikke stemmer.
       ---------------------------------------------------------------- */
    manual: {
      title: "Husmanual",
      intro:
        "Vi håper dere får et hyggelig og avslappende opphold. Her finner dere praktisk informasjon som gjør det enklere å bruke hytta og området rundt: ankomst, hvordan tingene fungerer, og hva som skal gjøres før avreise. Klikk på et punkt for å åpne det. Skulle noe gå i stykker, mangle eller ikke fungere, ta kontakt, så ordner vi det så raskt som mulig.",
      wifiTitle: "Wifi",
      wifiNetwork: "Nettverk",
      wifiPassword: "Passord",
      wifiCopy: "Kopier",
      wifiCopied: "Kopiert",
      wifiConnect: "Koble til wifi",
      wifiConnectDone: "Passordet er kopiert",
      wifiConnectHint: "Åpne wifi-innstillingene på telefonen, velg «{ssid}» og lim inn passordet.",
      wifiQrHelp: "Eller skann denne med kameraet på telefonen, så kobler den seg til av seg selv.",
      checkInLabel: "Innsjekk",
      checkOutLabel: "Utsjekk",
      printCta: "Skriv ut manualen",
      pdfCta: "Last ned som PDF",
      pdfFile: "assets/filer/husmanual-voss-chalet.pdf",
      emergencyTitle: "Viktige numre",
      sections: [
        {
          id: "ankomst",
          icon: "key",
          title: "Ankomst og smartlås",
          paragraphs: [
            "Innsjekk er fra kl. 15:00, og dere sjekker inn selv med smartlåsen. Dere trenger ikke møte noen."
          ],
          steps: [
            "Koden til ytterdøren sendes på Airbnb-melding før ankomst.",
            "Dra hånden over tastaturet for å vekke knappene.",
            "Tast koden, og trykk deretter på symbolet med åpen hengelås.",
            "Dere trenger ingen nøkkel til selve hytta, for låsen går på kode.",
            "Døren låses ved å dra hånden over tastene. Husk koden, så kommer dere inn igjen.",
            "De hvite nøkkelkortene i gangen åpner vegbommen.",
            "I gangen henger også fjernkontrollen til garasjen og nøkkelen til annekset. Bruk dem gjerne så lenge dere bor her, og heng dem tilbake før avreise.",
            "Innkjørselen ned til garasjen er bratt. Kjør rolig, spesielt når det er snø og is. Det er også god parkering på andre siden av veien."
          ],
          tip: "Trenger dere tidlig innsjekk eller sen utsjekk, send en melding i god tid. Vi er fleksible når hytta er ledig."
        },
        {
          id: "jacuzzi",
          icon: "hottub",
          title: "Saltvannsjacuzzi",
          paragraphs: [
            "Jacuzzien er en Arctic Spa med saltvannssystem. Den holder standard badetemperatur hele året, døgnet rundt, så den er klar til bruk når dere kommer. Vi sjekker at vannverdiene er riktige før ankomst. Ser vannet likevel ikke bra ut, vil vi gjerne ha beskjed."
          ],
          steps: [
            "Skyv lokket forsiktig av og legg det på lokkholderen, ikke på bakken eller snøen.",
            "God hygiene er viktig: dusj og vask dere grundig før bading. Såpe, sjampo og kremer skylles av, ellers ødelegges vannbalansen.",
            "Temperatur og bobler styrer dere på panelet på selve boblebadet.",
            "Legg lokket på igjen med én gang dere er ferdige, ellers faller temperaturen og strømforbruket øker.",
            "Ikke ta med glass, leker eller andre gjenstander i badet.",
            "Har dere brukt spaet i løpet av oppholdet: ha i omtrent ett lokk med Spa Shock (står i garasjen), kjør alle pumpene på fullt til de stopper av seg selv, og lukk lokket. Det balanserer vannet til neste gjest."
          ],
          tip: "Saltvannet er skånsomt mot hud og hår, men badetøy kan bleknes over tid, akkurat som i et vanlig spa."
        },
        {
          id: "badstue",
          icon: "sauna",
          title: "Badstue",
          paragraphs: [
            "Badstuen ligger på badet i 1. etasje, og den blir fort varm."
          ],
          steps: [
            "Videoen under viser hvordan dere skrur den på.",
            "Legg alltid et håndkle under dere på benken.",
            "Vann på steinene: bruk øsekaret, litt om gangen.",
            "Ikke tørk klær eller sko inne i badstuen. Det er brannfarlig."
          ],
          tip: "Badstue først, så jacuzzi, så utedusj. Den rekkefølgen anbefaler gjestene våre."
        },
        {
          id: "peis",
          icon: "fire",
          title: "Peisen",
          paragraphs: [
            "Peisen i stua er trygg å bruke, men les gjennom punktene under før dere fyrer første gang."
          ],
          steps: [
            "Åpne spjeldet helt før dere tenner.",
            "Legg opptenningsbriketter nederst, deretter tynn ved i kryss.",
            "Tenn på, la døren stå på gløtt i et par minutter, og lukk den så.",
            "Når det brenner godt, skyv spjeldet halvveis inn.",
            "Legg aldri i mer enn tre kubber om gangen, og la aldri peisen stå ubevoktet.",
            "Asken kastes i søppelpose i restavfallet, men bare når den er helt kald."
          ],
          tip: "Hytta har røykvarslere, men foreløpig ikke karbonmonoksidvarsler. Luft godt hvis det ryker inn, og la aldri peisen brenne mens dere sover."
        },
        {
          id: "varme",
          icon: "thermo",
          title: "Varme og klimaanlegg",
          paragraphs: [
            "Hytta har tre varmekilder, og de styres hver for seg."
          ],
          steps: [
            "Tilluft og ventilasjon styres med panelet nede i trappen i gangen.",
            "Varmepumpen i stuen, som både varmer og kjøler, styres med egen fjernkontroll.",
            "Termostatene på soverommene styrer gulvvarmen på det rommet.",
            "20–22 °C i stuen er behagelig.",
            "Hold vinduer og terrassedør lukket når varmen eller kjølingen står på."
          ],
          tip: "Skru ned til normal temperatur i stedet for å skru helt av når dere er ute på dagstur. Det bruker mindre strøm enn å varme opp igjen fra kaldt."
        },
        {
          id: "kjokken",
          icon: "kitchen",
          title: "Kjøkken og hvitevarer",
          paragraphs: [
            "Kjøkkenet er fullt utstyrt med det dere trenger for å lage mat til hele følget."
          ],
          steps: [
            "Platetoppen er induksjon, så kjelene må ha magnetisk bunn. De som ligger i skuffen fungerer.",
            "Oppvaskmaskin: tablettene ligger under vasken, og programmet Auto fungerer fint til det meste.",
            "Kaffe: både filterkaffe og kaffemaskin. Kaffen står i skapet ved siden av kaffetrakteren.",
            "Kranen på kjøkkenet gir kokende vann, se videoen under.",
            "Alt som står i tørrskapet og kjøleskapet kan dere bruke.",
            "La kjøleskapet stå på når dere reiser."
          ],
          tip: "I vinskapet står det to flasker vin som dere gjerne må nyte. Vi ber bare om at dere fyller tilbake tilsvarende antall flasker før avreise, så ordningen kan fortsette. Grillen på terrassen er kullgrill. Kull ligger som regel i garasjen, men det kan være tomt, så ta gjerne med en sekk."
        },
        {
          id: "tv",
          icon: "tv",
          title: "TV, wifi og lyd",
          paragraphs: [
            "TV-en i stua er en smart-TV. Dere kan logge inn på egne strømmekontoer, men husk å logge ut igjen før avreise."
          ],
          steps: [
            "Det er TV både i stuen nede og i stuen oppe. TV-en oppe har surroundanlegg.",
            "Wifi-navn og passord finner dere øverst på denne siden.",
            "Hytta har Sonos lydanlegg, med høyttalere i stuen og ute ved grillplassen.",
            "Enkleste måte å spille musikk på: koble mobilen til wifi og send fra din egen strømmetjeneste.",
            "Er nettet borte, send oss en melding på Airbnb, så hjelper vi dere videre."
          ],
          tip: ""
        },
        {
          id: "robot",
          icon: "robot",
          title: "Robotstøvsuger",
          paragraphs: [
            "Hytta har en Roborock som både støvsuger og vasker. Bruk den gjerne så mye dere vil under oppholdet."
          ],
          steps: [
            "Trykk på PÅ-knappen på roboten, så starter den støvsuging og vask av seg selv.",
            "Lyser ladestasjonen rødt: tøm tanken med skittent vann, og fyll rent vann på den andre tanken.",
            "Roboten kan bæres opp i etasjen over. Sett den ned der dere vil at den skal jobbe, og trykk PÅ."
          ],
          tip: "Sett den gjerne i gang før dere reiser, så er hytta et godt stykke på vei til neste gjest."
        },
        {
          id: "anneks",
          icon: "house",
          title: "Anneks og leker",
          paragraphs: [
            "Annekset kan brukes fritt, og lekene som står der er til låns for gjestene våre."
          ],
          steps: [
            "Nøkkelen til annekset henger i gangen.",
            "Boden i andre etasje er privat og skal ikke brukes.",
            "Ladere som hører til hytta skal bli stående i rommet de tilhører."
          ],
          tip: ""
        },
        {
          id: "ski",
          icon: "ski",
          title: "Ski, sko og tørking",
          paragraphs: [
            "Med ski in/ski out kommer dere rett fra bakken og inn, og da trengs et sted for alt det våte."
          ],
          steps: [
            "Ski, staver og brett settes i garasjen, eller inntil husveggen ved parkeringen.",
            "Skisko og skiutstyr henges på vaskerommet, som egner seg godt til å tørke klær.",
            "Førstehjelpsskrinet står også på vaskerommet.",
            "Ta av skistøvlene før dere går inn i stua."
          ],
          tip: ""
        },
        {
          id: "lading",
          icon: "car",
          title: "Parkering, garasje og elbillading",
          paragraphs: [
            "Det er gratis parkering på stedet med plass til fem biler, samt garasje med elbillader."
          ],
          steps: [
            "Innkjørselen til garasjen er bratt, så kjør rolig, særlig ved snø og is.",
            "Garasjeporten åpnes med «Harmonie»-fjernkontrollen som henger i gangen.",
            "Elbilladeren har fastmontert type 2-kabel på 5 kW, og lading er kostnadsfri for gjester.",
            "Hytta har egne ekstraplasser over veien, rett ovenfor innkjørselen. Bruk dem gjerne, særlig når det er mye snø."
          ],
          tip: ""
        },
        {
          id: "soppel",
          icon: "trash",
          title: "Søppel og kildesortering",
          paragraphs: [
            "Søppelet leveres på sorteringsstasjonen nede ved bommen, se bildet under."
          ],
          steps: [
            "Sorter avfallet etter anvisningene på beholderne.",
            "Ta posene med ned, ikke sett dem igjen utenfor hytta.",
            "Ta med full restavfallspose ut ved avreise, selv etter et kort opphold."
          ],
          tip: ""
        },
        {
          id: "avreise",
          icon: "check",
          title: "Før dere reiser",
          paragraphs: [
            "Utsjekk er innen kl. 11:00. Dere trenger ikke vaske hytta, men denne listen hjelper oss mye."
          ],
          steps: [
            "Kjøkken: slå på oppvaskmaskinen, og tøm kjøleskapet for medbrakt mat.",
            "Sengetøy: ta gjerne av sengetøyet og sett på en maskin med det. Da bruker vi mindre tid på å gjøre klart til neste gjest.",
            "Legg brukte håndklær i dusjen eller i kurven på badet.",
            "Fyll tilbake vinen dere har drukket fra vinskapet.",
            "Legg lokket på jacuzzien og skru av badstuen.",
            "Sett temperaturen tilbake til normal, og lukk alle vinduer og terrassedøren.",
            "Slå på robotstøvsugeren.",
            "Heng portåpneren, nøkkelen til annekset og bomkortene tilbake i gangen.",
            "Slukk lyset, logg ut av strømmetjenester, og sjekk at dere har fått med alle eiendelene deres.",
            "Lukk ytterdøren ordentlig, og se etter at den er låst."
          ],
          tip: "Glemt noe igjen? Send en melding, så finner vi en løsning med å sende det etter."
        }
      ]
    },

    /* --- HUSREGLER ------------------------------------------------- */
    rules: {
      title: "Husregler",
      intro:
        "Hytta er hjemmet vårt, og vi leier den ut fordi vi vil at flere skal få oppleve Voss. Disse reglene er der for at både dere og neste gjest skal ha det bra.",
      keyPointsTitle: "Kort oppsummert",
      items: [
        { icon: "clock", title: "Inn- og utsjekk", text: "Innsjekk etter kl. 15:00, utsjekk før kl. 11:00. Vi er fleksible når hytta er ledig, så send en melding i god tid." },
        { icon: "users", title: "Maks 9 gjester", text: "Alle skal være registrert i bookingen, også barn. Besøk på dagtid er greit, men gi oss beskjed." },
        { icon: "moon", title: "Nattero", text: "Vis hensyn til naboene, og hold det rolig ute og inne mellom kl. 23:00 og 07:00." },
        { icon: "party", title: "Ingen fester", text: "Hytta er ikke egnet for fester eller arrangementer. Rolig samvær med dem som bor her er selvsagt helt fint." },
        { icon: "smoke", title: "Røykfritt innendørs", text: "Røyking er ikke tillatt inne, heller ikke på soverom eller bad. Ute er det greit, men vær nøye med sneiper." },
        { icon: "hottub", title: "Jacuzzi og badstue", text: "Dusj før bruk, ikke bruk glass i eller ved jacuzzien, og legg alltid på lokket etterpå. Barn skal ha tilsyn." },
        { icon: "fire", title: "Peis og levende lys", text: "Følg fyringsanvisningen i husmanualen. La aldri peis eller stearinlys stå ubevoktet, og slukk alt før dere legger dere." },
        { icon: "shoe", title: "Sko av innendørs", text: "Skiutstyr og sko settes igjen i gangen, ikke i stua." },
        { icon: "lock", title: "Privat bod", text: "Hele hytta kan brukes, og det samme kan annekset. Boden i 2. etasje er privat og skal ikke brukes av gjester." },
        { icon: "shield", title: "Skader og uhell", text: "Uhell skjer. Si fra med én gang, så ordner vi det sammen. Det er bedre enn at neste gjest oppdager det." }
      ],
      moreTitle: "Litt mer om praktiske ting",
      more: [
        "Det er gratis parkering på stedet til fem biler, og elbillader i garasjen. Lading er inkludert for gjester.",
        "Innkjørselen til garasjen er bratt og kan være krevende ved mye snø. Det er også parkering på andre siden av veien.",
        "Hytta har røykvarslere. Karbonmonoksidvarsler er foreløpig ikke installert.",
        "Det finnes ikke videoovervåking inne eller ute på eiendommen.",
        "Kjæledyr: send oss en melding før booking, så avklarer vi det.",
        "Avbestillingsvilkår følger det som står i Airbnb-annonsen."
      ],
      contactTitle: "Spørsmål underveis?",
      contactText: "Send oss en melding på Airbnb, så svarer vi normalt innen en time."
    },

    /* --- OMRÅDET ---------------------------------------------------- */
    area: {
      title: "Voss og området rundt",
      intro:
        "Voss er kjent som Norges ekstremsporthovedstad, men her er like mye rolige turer, god mat og fine bad. Her er noen av favorittene våre.",
      categories: [
        {
          title: "Vinter",
          items: [
            { name: "Voss Resort", desc: "Over 40 km preparerte løyper for alle nivåer, og skiheisene ligger rett utenfor døren. Skikort kjøpes på vossresort.no, og hele løypekartet ligger til nedlasting nederst på siden.", meta: "Ski in / ski out", map: "Voss Resort, Voss", url: "https://vossresort.no", img: "assets/img/skikart-voss-resort.jpg" },
            { name: "Myrkdalen", desc: "Snøsikkert alpinanlegg med god variasjon hvis dere vil bytte bakke for en dag.", meta: "ca. 30 min", map: "Myrkdalen Fjellandsby" },
            { name: "Hanguren", desc: "Dere kan gå opp fra hytta, eller ta skiheisen rett opp herfra. Alternativt tar dere gondolen opp fra Voss sentrum, ca. 15 minutter med bil. Spektakulær utsikt og lett tilgjengelige løyper på toppen.", meta: "Fra hytta", map: "Hangurstoppen, Voss", img: "assets/img/omrade-hangurstoppen.avif" },
            { name: "Nordlys", desc: "På klare vinterkvelder har gjester sett nordlyset rett fra terrassen.", meta: "Fra hytta", img: "assets/img/nordlys.avif" }
          ]
        },
        {
          title: "Sommer og fjelltur",
          items: [
            { name: "Lønahorgi", desc: "Kjent topptur, og dere kan gå rett fra hytta.", meta: "Fra døren", map: "Lønahorgi, Voss", img: "assets/img/omrade-lonahorgi.avif" },
            { name: "Sykling og terrengsykling", desc: "Familievennlige sykkelstier rundt Vangsvatnet, og krevende stier i fjellet. Gondolen tar deg og sykkelen opp.", meta: "ca. 15 min" },
            { name: "Bordalsgjelet", desc: "Et trangt og frodig juv med gangbru og sti langs elva. Turen er kort, dramatisk og fin også for barn. Vil dere ut i elva selv, arrangerer flere aktører i Voss sentrum rafting, juving og elvepadling med erfarne guider.", meta: "ca. 15 min", map: "Bordalsgjelet, Voss", img: "assets/img/omrade-gjel.avif" },
            { name: "Paragliding og fallskjermhopp", desc: "Tandemhopp fra fjellet, eller fallskjermhopp fra hoppfeltet på Bømoen.", meta: "ca. 20 min", map: "Skydive Voss, Bømoen" },
            { name: "Voss Golfklubb", desc: "9-hulls bane i naturskjønne omgivelser, for både nybegynnere og erfarne.", meta: "ca. 20 min", map: "Voss Golfklubb", img: "assets/img/omrade-golf-vangsvatnet.avif" },
            { name: "Bjørkemoen badeplass", desc: "Badeplass i elva med svaberg og kulper, populær blant lokale på varme dager. Ta med håndkle og noe å sitte på.", meta: "ca. 15 min", map: "Bjørkemoen badeplass, Voss", img: "assets/img/omrade-bjorkemoen.jpg" }
          ]
        },
        {
          title: "Spisesteder",
          items: [
            { name: "Park Hotel Vossevangen", desc: "Fine dining, og en av verdens største vinkjellere. Vinsmaking er mulig, men bestill gjerne i forkant.", meta: "ca. 15 min", map: "Park Hotel Vossevangen, Voss" },
            { name: "Vossevangen Grill & Steakhouse", desc: "Burgere og biff i uformell setting. Sentralt og familievennlig.", meta: "ca. 15 min", map: "Vossevangen Grill & Steakhouse, Voss" },
            { name: "Flor'n Restaurant", desc: "Lokalmat i sjarmerende omgivelser på Store Ringheim.", meta: "Litt utenfor sentrum", map: "Flor'n Restaurant Store Ringheim, Voss" },
            { name: "Tre Brør Café & Bar", desc: "Kafé med lunsj, snacks og kveldskonserter. Sosialt og sentralt.", meta: "ca. 15 min", map: "Tre Brør, Voss" },
            { name: "Malin Restaurant & Sushi Bar", desc: "Sushi og asiatisk mat i moderne lokaler.", meta: "ca. 15 min", map: "Malin Restaurant & Sushi Bar, Voss" },
            { name: "Skrot Café & Bar", desc: "Trendy kafé med enkle retter og milkshakes.", meta: "ca. 15 min", map: "Skrot Café & Bar, Voss" },
            { name: "Hangurstoppen Restaurant", desc: "Mat med utsikt, på toppen av gondolen.", meta: "Toppen av gondolen", map: "Hangurstoppen Restaurant, Voss", img: "assets/img/omrade-hangurstoppen.avif" },
            { name: "Vangen Café", desc: "Enkel norsk lunsj i sentrum.", meta: "ca. 15 min", map: "Vangen Café, Voss" }
          ]
        },
        {
          title: "Kultur og familie",
          items: [
            { name: "Voss Folkemuseum", desc: "Lokalhistorie i vakre omgivelser.", meta: "ca. 15 min", map: "Voss Folkemuseum" },
            { name: "Voss Vind", desc: "Innendørs fallskjermhopp i vindtunnel. Moro for både barn og voksne, og helt uavhengig av været.", meta: "ca. 15 min", map: "Voss Vind", video: "https://www.youtube.com/watch?v=Y6_gW-LJPik" },
            { name: "Vossabadet", desc: "Svømmehall, utendørsbasseng og egen barneavdeling. Fint på regnværsdager.", meta: "ca. 15 min", map: "Vossabadet" },
            { name: "Bømoen", desc: "Turstier, sykkelmuligheter og lekeplasser barna elsker.", meta: "ca. 20 min", map: "Bømoen, Voss" }
          ]
        },
        {
          title: "Dagsturer",
          items: [
            { name: "Flåmsbanen og Nærøyfjorden", desc: "En av verdens vakreste togturer, og en UNESCO-fjord i verdensklasse.", meta: "ca. 1–1,5 t", map: "Flåm, Norge" },
            { name: "Hardangerfjorden", desc: "Fossefall, frukthager og fjord, flott på en dagstur.", meta: "ca. 1–1,5 t", map: "Hardangerfjorden" },
            { name: "Bergen", desc: "Bryggen, Fløyen og fisketorget. Fint som stopp på vei til eller fra flyplassen.", meta: "ca. 1,5 t", map: "Bergen, Norge" }
          ]
        },
        {
          title: "Praktisk",
          items: [
            { name: "Dagligvare", desc: "Flere butikker å velge mellom, alle en kort kjøretur unna.", meta: "ca. 10 min", map: "dagligvare Voss" },
            { name: "Vinmonopolet Voss", desc: "I sentrum. Merk kortere åpningstid lørdag og stengt søndag.", meta: "ca. 15 min", map: "Vinmonopolet Voss" },
            { name: "Apotek og legevakt", desc: "Begge i sentrum. Legevakt: ring 116 117.", meta: "ca. 15 min", map: "Apotek Voss" },
            { name: "Voss stasjon", desc: "Tog til Bergen og Oslo, praktisk hvis noen kommer uten bil.", meta: "ca. 15 min", map: "Voss stasjon" }
          ]
        }
      ]
    },

    // Kart og dokumenter til nedlasting, nederst på områdesiden
    downloads: {
      title: "Kart og guider",
      subtitle: "Verdt å laste ned før dere drar ut, for de virker også der mobildekningen er dårlig.",
      items: [
        {
          name: "Skiløypekart for Voss Resort",
          desc: "Alle heiser og nedfarter med symbolforklaring, oversatt til engelsk.",
          meta: "JPG · 1,4 MB",
          file: "assets/filer/skikart-voss-resort.jpg",
          img: "assets/img/skikart-voss-resort.jpg",
          cta: "Åpne kartet"
        },
        {
          name: "Vandrekart for Voss Resort",
          desc: "Tolv merkede turer med lengde, stigning og tidsbruk, på norsk og engelsk. Tur 8 går fra Hangurstoppen om Tråstølen.",
          meta: "PDF · 8,6 MB · 2 sider",
          file: "assets/filer/voss-resort-vandreguide.pdf",
          img: "assets/img/vandreguide-forside.jpg",
          cta: "Last ned PDF"
        }
      ]
    },

    footer: {
      about: "Moderne utleiehytte i Tråstølen på Voss, med ski in/ski out, badstue og saltvannsjacuzzi. Booking skjer via Airbnb.",
      linksTitle: "Sider",
      contactTitle: "Kontakt",
      bookTitle: "Booking",
      bookText: "Kalender, priser og bestilling ligger på Airbnb.",
      rights: "Alle rettigheter forbeholdt."
    },

    common: {
      back: "Tilbake til forsiden",
      close: "Lukk",
      openMenu: "Meny",
      langLabel: "Språk",
      themeLabel: "Bytt mellom lyst og mørkt tema",
      imagePlaceholder: "Bilde kommer",
      logout: "Logg ut"
    }
  },

  /* ===================================================================
     4. ENGELSK INNHOLD
     =================================================================== */
  en: {
    nav: {
      home: "The chalet",
      manual: "House manual",
      rules: "House rules",
      area: "The area",
      book: "Book on Airbnb"
    },

    landing: {
      eyebrow: "Tråstølen · Voss, Norway",
      title: "Voss Chalet",
      tagline: "A modern chalet with ski-in/ski-out, a sauna and a salt-water hot tub, with panoramic views over Lønavatnet.",
      bookCta: "Book on Airbnb",
      guestTitle: "Staying with us?",
      guestText: "Sign in for the chalet page, house manual, house rules and local tips.",
      passwordLabel: "Password",
      submit: "Sign in",
      error: "Wrong password. Please try again, or send us a message on Airbnb.",
      unsupported: "Signing in requires the page to be opened over https. Please use the link we sent on Airbnb."
    },

    facts: {
      guests: "guests",
      bedrooms: "bedrooms",
      beds: "beds",
      baths: "bathrooms"
    },

    hero: {
      eyebrow: "Tråstølen · Voss, Norway",
      title: "Modern chalet in Voss",
      subtitle:
        "A new chalet with true ski-in/ski-out in Tråstølen. Four bedrooms, sauna, salt-water hot tub and a large terrace with panoramic views over Lønavatnet.",
      ctaPrimary: "Check availability",
      ctaSecondary: "Read the house manual"
    },

    about: {
      title: "About the chalet",
      lead:
        "Welcome to a modern, well-equipped chalet in Tråstølen near Voss, perfectly placed with true ski-in/ski-out access. The large, sunny terrace offers panoramic views over lake Lønavatnet.",
      paragraphs: [
        "The chalet has four bedrooms, two bathrooms, a sauna, a TV lounge, a playroom and a mezzanine. The living room and kitchen form one open space with a fireplace, large windows and a fully equipped kitchen.",
        "On the terrace you will find an Arctic Spa salt-water hot tub, a good way to wind down after an active day. The eco-friendly salt-water system is gentle on skin and hair and gives a comfortable spa experience with relaxing hydrotherapy.",
        "The chalet has modern amenities, plenty of storage, a garage, EV charging and guest parking for five cars. Bed linen and towels are included.",
        "With Voss town centre, mountain hikes, skiing and year-round activities close by, this is an ideal base for families and groups of friends who want comfort as well as nature and adventure."
      ]
    },

    highlights: {
      title: "What guests mention most",
      items: [
        { icon: "ski", title: "Ski-in / ski-out", text: "The lifts are right outside the door, with over 40 km of groomed slopes at Voss Resort." },
        { icon: "hottub", title: "Salt-water hot tub", text: "An Arctic Spa with skin-friendly salt water, available all year and around the clock." },
        { icon: "sauna", title: "Sauna", text: "Good after a day on the slopes or in the mountains." },
        { icon: "mountain", title: "Views over Lønavatnet", text: "Floor-to-ceiling windows in the living room and a large, sunny terrace with panoramic views." },
        { icon: "fire", title: "Fireplace in an open living room", text: "Open-plan living room and kitchen with a fireplace and everything you need to cook." },
        { icon: "car", title: "Garage and EV charging", text: "Level 2 EV charger in the garage, plus guest parking for five cars." },
        { icon: "kids", title: "Family friendly", text: "Playroom, mezzanine, TV lounge and a travel cot make the chalet well suited for families with children." },
        { icon: "bed", title: "Everything is ready", text: "Bed linen, towels and consumables such as soap, shampoo and toilet paper are included." }
      ]
    },

    sleeping: {
      title: "Where you sleep",
      subtitle: "Four bedrooms, six beds, room for nine guests.",
      rooms: [
        { title: "Bedroom 1", beds: "1 bunk bed" },
        { title: "Bedroom 2", beds: "1 bunk bed" },
        { title: "Bedroom 3", beds: "1 double bed" },
        { title: "Bedroom 4", beds: "1 double bed, 1 cot" }
      ],
      note: "Plus a mezzanine, a TV lounge and a playroom."
    },

    amenities: {
      title: "Amenities",
      subtitle: "All of this is ready when you arrive.",
      groups: [
        {
          title: "Outdoors and spa",
          items: ["Private salt-water hot tub, all year and around the clock", "Sauna", "Large terrace with panoramic views", "Outdoor shower", "Barbecue", "Close to ski slopes and trails"]
        },
        {
          title: "Kitchen and living room",
          items: ["Fully equipped kitchen", "Open-plan living and kitchen", "Fireplace", "TV", "TV lounge and playroom", "Mezzanine"]
        },
        {
          title: "Practical",
          items: ["Wi-Fi", "Washing machine", "Air conditioning", "Bed linen and towels included", "Consumables (soap, shampoo, toilet paper)", "Smoke alarm"]
        },
        {
          title: "Parking",
          items: ["Garage", "EV charger (level 2)", "Guest parking for 5 cars", "Free parking on the property"]
        }
      ],
      noteTitle: "Good to know",
      note: "The chalet has smoke alarms. A carbon monoxide alarm is not currently installed. The driveway down to the garage is steep and can be demanding in heavy snow. There is also plenty of parking across the road."
    },

    gallery: {
      title: "Photos",
      subtitle: "Click an image to view it larger."
    },

    reviews: {
      title: "What guests say",
      subtitle: "Excerpts from Airbnb reviews.",
      cta: "Read all reviews on Airbnb",
      items: [
        {
          text: "We had a fantastic stay in this beautiful, modern chalet. It felt clean and luxurious, the beds were good and the house was well equipped with kitchenware, towels, bed linen and toiletries.",
          author: "Camilla",
          meta: "March 2026"
        },
        {
          text: "We loved the sauna and hot tub after a day in the snow! We had wonderful family dinners in a very beautiful, peaceful, clean and welcoming home.",
          author: "Frances",
          meta: "March 2026 · group trip"
        },
        {
          text: "From the moment we walked in we were met by amazing floor-to-ceiling windows overlooking the beautiful mountains of Voss. It really felt like staying in a cosy cabin high up in the mountains.",
          author: "Joel",
          meta: "Singapore"
        },
        {
          text: "Both children and adults appreciated the hot tub and the outdoor shower. It was very practical that the house was stocked with consumables such as toilet paper, soap, washing-up liquid and shampoo.",
          author: "Puck",
          meta: "Summer 2026 · two families"
        },
        {
          text: "The home is beautiful, private and incredibly cosy. The beds were very comfortable. The location was excellent, and we will always treasure the memory of seeing the northern lights from this place.",
          author: "Hannah",
          meta: "January 2026 · Colorado"
        },
        {
          text: "This is a great chalet with the ski resort right nearby! The hosts are friendly and answered questions quickly.",
          author: "Isak",
          meta: "March 2026"
        }
      ]
    },

    location: {
      title: "Location",
      text:
        "The chalet is in Tråstølen near Voss, with the ski lifts right outside the door and a short drive to Voss town centre. The exact address and access details are sent by Airbnb message before arrival.",
      distancesTitle: "Distances",
      distances: [
        { label: "Ski lift / slope", value: "Right outside the door" },
        { label: "Voss Resort", value: "Ski-in / ski-out" },
        { label: "Nearest grocery store", value: "approx. 10 min by car" },
        { label: "Voss centre and train station", value: "approx. 15 min by car" },
        { label: "Myrkdalen", value: "approx. 30 min by car" },
        { label: "Nærøyfjord / Flåm", value: "approx. 1–1.5 h by car" },
        { label: "Hardangerfjord", value: "approx. 1–1.5 h by car" },
        { label: "Bergen", value: "approx. 1.5 h by car" }
      ],
      mapCta: "Open in Google Maps"
    },

    host: {
      title: "Your hosts",
      name: "Michelle and Marius",
      badge: "Superhost",
      text:
        "We live in Bergen and have been hosting for three years. We normally reply within an hour and are happy to help with local tips before and during your stay. Get in touch through Airbnb if there is anything you are wondering about.",
      stats: [
        { value: "5.0", label: "average rating" },
        { value: "37", label: "reviews" },
        { value: "100%", label: "response rate" }
      ]
    },

    cta: {
      title: "Free for your next trip?",
      text: "Rates, calendar and booking are on Airbnb. If you have questions before you book, just get in touch.",
      button: "See available dates on Airbnb"
    },

    manual: {
      title: "House manual",
      intro:
        "We hope you have a relaxing and enjoyable stay. Here you will find the practical information that makes the chalet and the area easier to use: arrival, how things work, and what to do before you leave. Click a section to open it. If anything breaks, is missing or does not work, get in touch and we will sort it out as quickly as we can.",
      wifiTitle: "Wi-Fi",
      wifiNetwork: "Network",
      wifiPassword: "Password",
      wifiCopy: "Copy",
      wifiCopied: "Copied",
      wifiConnect: "Connect to Wi-Fi",
      wifiConnectDone: "Password copied",
      wifiConnectHint: "Open Wi-Fi settings on your phone, choose “{ssid}” and paste the password.",
      wifiQrHelp: "Or scan this with your phone camera, and it will connect by itself.",
      checkInLabel: "Check-in",
      checkOutLabel: "Check-out",
      printCta: "Print the manual",
      pdfCta: "Download as PDF",
      pdfFile: "assets/filer/house-manual-voss-chalet.pdf",
      emergencyTitle: "Important numbers",
      sections: [
        {
          id: "ankomst",
          icon: "key",
          title: "Arrival and smart lock",
          paragraphs: [
            "Check-in is from 15:00, and you check in yourself using the smart lock. There is no need to meet anyone."
          ],
          steps: [
            "The door code is sent by Airbnb message before arrival.",
            "Wave your hand across the keypad to wake the buttons.",
            "Enter the code, then press the open-padlock symbol.",
            "You do not need a key for the chalet itself, as the lock works on the code.",
            "To lock the door, sweep your hand across the keypad. Remember the code so you can get back in.",
            "The white key cards in the hallway open the road barrier.",
            "The garage remote and the key to the annexe also hang in the hallway. Please use them during your stay and hang them back before you leave.",
            "The driveway down to the garage is steep. Take it slowly, especially in snow and ice. There is also good parking across the road."
          ],
          tip: "If you need an early check-in or late check-out, send us a message in good time. We are flexible when the chalet is free."
        },
        {
          id: "jacuzzi",
          icon: "hottub",
          title: "Salt-water hot tub",
          paragraphs: [
            "The hot tub is an Arctic Spa with a salt-water system. It is kept at bathing temperature all year, around the clock, so it is ready when you arrive. We check the water values before every arrival. If the water still does not look right, please tell us."
          ],
          steps: [
            "Slide the cover off carefully and place it on the cover lifter, not on the ground or in the snow.",
            "Good hygiene matters: shower and wash thoroughly before getting in. Rinse off soap, shampoo and lotions, as they upset the water balance.",
            "Temperature and jets are set on the panel on the tub itself.",
            "Put the cover back on as soon as you are done, otherwise the temperature drops and power use rises.",
            "Please do not bring glass, toys or other objects into the tub.",
            "If you have used the spa during your stay: add about one capful of Spa Shock (kept in the garage), run all the pumps at full until they stop by themselves, and close the cover. That rebalances the water for the next guest."
          ],
          tip: "The salt water is gentle on skin and hair, but swimwear may fade over time, just like in any spa."
        },
        {
          id: "badstue",
          icon: "sauna",
          title: "Sauna",
          paragraphs: [
            "The sauna is in the ground-floor bathroom, and it heats up quickly."
          ],
          steps: [
            "The video below shows how to switch it on.",
            "Always sit on a towel.",
            "Water on the stones: use the ladle, a little at a time.",
            "Never dry clothes or boots inside the sauna. It is a fire hazard."
          ],
          tip: "Sauna first, then hot tub, then the outdoor shower. That is the order our guests recommend."
        },
        {
          id: "peis",
          icon: "fire",
          title: "The fireplace",
          paragraphs: [
            "The fireplace in the living room is safe to use, but please read these steps before your first fire."
          ],
          steps: [
            "Open the damper fully before lighting.",
            "Place firelighters at the bottom, then thin logs in a cross pattern.",
            "Light it, leave the door slightly ajar for a couple of minutes, then close it.",
            "Once burning well, push the damper halfway in.",
            "Never add more than three logs at a time, and never leave the fire unattended.",
            "Ash goes in a bin bag with the general waste, but only once it is completely cold."
          ],
          tip: "The chalet has smoke alarms but no carbon monoxide alarm at present. Air the room well if smoke comes back in, and never leave the fire burning while you sleep."
        },
        {
          id: "varme",
          icon: "thermo",
          title: "Heating and air conditioning",
          paragraphs: ["The chalet has three sources of heat, each controlled separately."],
          steps: [
            "Fresh air and ventilation are controlled from the panel at the bottom of the stairs in the hallway.",
            "The heat pump in the living room, which both heats and cools, has its own remote control.",
            "The thermostats in the bedrooms control the underfloor heating in that room.",
            "20–22 °C in the living room is comfortable.",
            "Keep windows and the terrace door closed while heating or cooling is running."
          ],
          tip: "Turn it down rather than off when you head out for the day. That uses less power than heating up from cold."
        },
        {
          id: "kjokken",
          icon: "kitchen",
          title: "Kitchen and appliances",
          paragraphs: ["The kitchen is fully equipped for cooking for the whole group."],
          steps: [
            "The hob is induction, so pans need a magnetic base. The ones in the drawer work.",
            "Dishwasher: tablets are under the sink, and the Auto programme handles most loads well.",
            "Coffee: both filter coffee and a coffee machine. The coffee is in the cupboard next to the coffee maker.",
            "The kitchen tap gives boiling water, see the video below.",
            "Anything in the dry-goods cupboard and the fridge is yours to use.",
            "Please leave the fridge switched on when you go."
          ],
          tip: "There are two bottles of wine in the wine cabinet, and you are welcome to enjoy them. We only ask that you replace them with the same number of bottles before you leave, so we can keep the arrangement going. The barbecue on the terrace is a charcoal grill. Charcoal is usually in the garage, but it can run out, so bring a bag if you can."
        },
        {
          id: "tv",
          icon: "tv",
          title: "TV, Wi-Fi and sound",
          paragraphs: [
            "The living room TV is a smart TV. You are welcome to sign in to your own streaming accounts, but remember to sign out before you leave."
          ],
          steps: [
            "There is a TV in the living room downstairs and in the lounge upstairs. The upstairs TV has a surround system.",
            "The Wi-Fi name and password are at the top of this page.",
            "The chalet has a Sonos sound system, with speakers in the living room and outside by the barbecue.",
            "Easiest way to play music: connect your phone to the Wi-Fi and cast from your own streaming service.",
            "If the internet drops, send us a message on Airbnb and we will help."
          ],
          tip: ""
        },
        {
          id: "robot",
          icon: "robot",
          title: "Robot vacuum",
          paragraphs: [
            "The chalet has a Roborock that both vacuums and mops. Use it as much as you like during your stay."
          ],
          steps: [
            "Press the ON button on the robot and it starts vacuuming and mopping by itself.",
            "If the dock shows a red light: empty the dirty-water tank and refill the clean-water tank.",
            "You can carry the robot upstairs. Put it down where you want it to work and press ON."
          ],
          tip: "Setting it going before you leave is a real help, and the chalet is then well on its way for the next guest."
        },
        {
          id: "anneks",
          icon: "house",
          title: "Annexe and toys",
          paragraphs: [
            "The annexe is yours to use, and the toys in there are there for our guests to borrow."
          ],
          steps: [
            "The key to the annexe hangs in the hallway.",
            "The storage room on the second floor is private and not for guest use.",
            "Chargers that belong to the chalet should stay in the room they belong to."
          ],
          tip: ""
        },
        {
          id: "ski",
          icon: "ski",
          title: "Skis, boots and drying",
          paragraphs: [
            "With ski-in/ski-out you come straight off the slope and inside, which means there needs to be a place for all the wet gear."
          ],
          steps: [
            "Skis, poles and boards go in the garage, or against the wall by the parking area.",
            "Ski boots and gear hang in the utility room, which is the best place in the house for drying clothes.",
            "The first aid kit is in the utility room as well.",
            "Please take ski boots off before going into the living room."
          ],
          tip: ""
        },
        {
          id: "lading",
          icon: "car",
          title: "Parking, garage and EV charging",
          paragraphs: [
            "There is free parking on the property for five cars, plus a garage with an EV charger."
          ],
          steps: [
            "The driveway to the garage is steep, so take it slowly, especially in snow and ice.",
            "The garage door opens with the “Harmonie” remote hanging in the hallway.",
            "The EV charger has a fixed type 2 cable at 5 kW, and charging is free for guests.",
            "The chalet has its own extra spaces across the road, just above the driveway. Do use them, especially when there is a lot of snow."
          ],
          tip: ""
        },
        {
          id: "soppel",
          icon: "trash",
          title: "Waste and recycling",
          paragraphs: ["Waste goes to the sorting station down by the barrier, see the photo below."],
          steps: [
            "Sort your waste following the labels on the containers.",
            "Take the bags down with you; please do not leave them outside the chalet.",
            "Take the full waste bag out when you leave, even after a short stay."
          ],
          tip: ""
        },
        {
          id: "avreise",
          icon: "check",
          title: "Before you leave",
          paragraphs: [
            "Check-out is by 11:00. You do not need to clean, but this short list helps us a lot."
          ],
          steps: [
            "Kitchen: start the dishwasher, and clear the fridge of food you brought.",
            "Bed linen: please strip the beds and put a load in the washing machine. It saves us time getting ready for the next guest.",
            "Leave used towels in the shower or the bathroom basket.",
            "Replace any wine you drank from the wine cabinet.",
            "Put the cover back on the hot tub and switch off the sauna.",
            "Set the temperature back to normal and close all windows and the terrace door.",
            "Start the robot vacuum.",
            "Hang the garage remote, the annexe key and the barrier cards back in the hallway.",
            "Turn off the lights, sign out of streaming services, and check you have all your belongings.",
            "Close the front door properly and check that it has locked."
          ],
          tip: "Left something behind? Send us a message and we will work out how to get it back to you."
        }
      ]
    },

    rules: {
      title: "House rules",
      intro:
        "This chalet is our home, and we rent it out because we want more people to experience Voss. These rules are here so that both you and the next guest have a good stay.",
      keyPointsTitle: "The short version",
      items: [
        { icon: "clock", title: "Check-in and check-out", text: "Check-in after 15:00, check-out before 11:00. We are flexible when the chalet is free, so message us in good time." },
        { icon: "users", title: "Maximum 9 guests", text: "Everyone must be listed in the booking, children included. Daytime visitors are fine, just let us know." },
        { icon: "moon", title: "Quiet hours", text: "Please be considerate of the neighbours and keep it quiet inside and outside between 23:00 and 07:00." },
        { icon: "party", title: "No parties", text: "The chalet is not suitable for parties or events. A relaxed evening with the people staying here is of course welcome." },
        { icon: "smoke", title: "No smoking indoors", text: "Smoking is not allowed inside, including bedrooms and bathrooms. Outside is fine, but please dispose of cigarette ends carefully." },
        { icon: "hottub", title: "Hot tub and sauna", text: "Shower before use, no glass in or near the hot tub, and always put the cover back on afterwards. Children must be supervised." },
        { icon: "fire", title: "Fireplace and candles", text: "Follow the instructions in the house manual. Never leave a fire or candle unattended, and put everything out before bed." },
        { icon: "shoe", title: "Shoes off indoors", text: "Leave ski gear and shoes in the hallway, not in the living room." },
        { icon: "lock", title: "Private storage", text: "The whole chalet is yours, and so is the annexe. The storage room on the second floor is private and not for guest use." },
        { icon: "shield", title: "Damage and accidents", text: "Accidents happen. Tell us straight away and we will sort it out together. That is much better than the next guest finding it." }
      ],
      moreTitle: "A few more practical things",
      more: [
        "There is free parking on the property for five cars, and an EV charger in the garage. Charging is included for guests.",
        "The driveway to the garage is steep and can be demanding in heavy snow. There is also parking across the road.",
        "The chalet has smoke alarms. A carbon monoxide alarm is not currently installed.",
        "There is no video surveillance inside or outside the property.",
        "Pets: send us a message before booking so we can confirm.",
        "Cancellation terms follow the Airbnb listing."
      ],
      contactTitle: "Questions during your stay?",
      contactText: "Send us a message on Airbnb, and we normally reply within an hour."
    },

    area: {
      title: "Voss and around",
      intro:
        "Voss is known as Norway's extreme sports capital, but there is just as much quiet hiking, good food and fine swimming. Here are some of our favourites.",
      categories: [
        {
          title: "Winter",
          items: [
            { name: "Voss Resort", desc: "Over 40 km of groomed slopes for every level, with the lifts right outside the door. Lift passes are sold at vossresort.no, and the full piste map is available to download at the bottom of this page.", meta: "Ski-in / ski-out", map: "Voss Resort, Voss", url: "https://vossresort.no", img: "assets/img/skikart-voss-resort.jpg" },
            { name: "Myrkdalen", desc: "Snow-sure ski resort with plenty of variety if you fancy a change for a day.", meta: "approx. 30 min", map: "Myrkdalen Fjellandsby" },
            { name: "Hanguren", desc: "You can walk up from the chalet, or take the ski lift straight up from here. Alternatively, take the gondola up from Voss centre, about 15 minutes by car. Spectacular views and easily accessible trails at the top.", meta: "From the chalet", map: "Hangurstoppen, Voss", img: "assets/img/omrade-hangurstoppen.avif" },
            { name: "Northern lights", desc: "On clear winter evenings guests have watched the aurora straight from the terrace.", meta: "From the chalet", img: "assets/img/nordlys.avif" }
          ]
        },
        {
          title: "Summer and hiking",
          items: [
            { name: "Lønahorgi", desc: "A well-known summit hike, and you can walk straight from the chalet.", meta: "From the door", map: "Lønahorgi, Voss", img: "assets/img/omrade-lonahorgi.avif" },
            { name: "Cycling and mountain biking", desc: "Family-friendly paths around Vangsvatnet and demanding trails in the mountains. The gondola takes you and your bike up.", meta: "approx. 15 min" },
            { name: "Bordalsgjelet gorge", desc: "A narrow, green gorge with a walkway and a path along the river. The walk is short, dramatic and fine for children too. If you want to get into the water yourselves, operators in Voss centre run rafting, canyoning and river kayaking with experienced guides.", meta: "approx. 15 min", map: "Bordalsgjelet, Voss", img: "assets/img/omrade-gjel.avif" },
            { name: "Paragliding and skydiving", desc: "Tandem flights from the mountain, or skydiving from the airfield at Bømoen.", meta: "approx. 20 min", map: "Skydive Voss, Bømoen" },
            { name: "Voss Golf Club", desc: "A scenic 9-hole course for beginners and experienced players alike.", meta: "approx. 20 min", map: "Voss Golfklubb", img: "assets/img/omrade-golf-vangsvatnet.avif" },
            { name: "Bjørkemoen bathing spot", desc: "A river bathing spot with smooth rocks and pools, popular with locals on warm days. Bring a towel and something to sit on.", meta: "approx. 15 min", map: "Bjørkemoen badeplass, Voss", img: "assets/img/omrade-bjorkemoen.jpg" }
          ]
        },
        {
          title: "Places to eat",
          items: [
            { name: "Park Hotel Vossevangen", desc: "Fine dining, and one of the largest wine cellars in the world. Wine tasting is possible, but it is worth booking ahead.", meta: "approx. 15 min", map: "Park Hotel Vossevangen, Voss" },
            { name: "Vossevangen Grill & Steakhouse", desc: "Burgers and steak in a relaxed setting. Central and family friendly.", meta: "approx. 15 min", map: "Vossevangen Grill & Steakhouse, Voss" },
            { name: "Flor'n Restaurant", desc: "Local food in charming surroundings at Store Ringheim.", meta: "Just outside the centre", map: "Flor'n Restaurant Store Ringheim, Voss" },
            { name: "Tre Brør Café & Bar", desc: "Café with lunch, snacks and evening concerts. Sociable and central.", meta: "approx. 15 min", map: "Tre Brør, Voss" },
            { name: "Malin Restaurant & Sushi Bar", desc: "Sushi and Asian food in modern surroundings.", meta: "approx. 15 min", map: "Malin Restaurant & Sushi Bar, Voss" },
            { name: "Skrot Café & Bar", desc: "Trendy café with simple dishes and milkshakes.", meta: "approx. 15 min", map: "Skrot Café & Bar, Voss" },
            { name: "Hangurstoppen Restaurant", desc: "Food with a view, at the top of the gondola.", meta: "Top of the gondola", map: "Hangurstoppen Restaurant, Voss", img: "assets/img/omrade-hangurstoppen.avif" },
            { name: "Vangen Café", desc: "Simple Norwegian lunch in the centre.", meta: "approx. 15 min", map: "Vangen Café, Voss" }
          ]
        },
        {
          title: "Culture and family",
          items: [
            { name: "Voss Folk Museum", desc: "Local history in beautiful surroundings.", meta: "approx. 15 min", map: "Voss Folkemuseum" },
            { name: "Voss Vind", desc: "Indoor skydiving in a wind tunnel. Great fun for children and adults alike, whatever the weather is doing.", meta: "approx. 15 min", map: "Voss Vind", video: "https://www.youtube.com/watch?v=Y6_gW-LJPik" },
            { name: "Vossabadet", desc: "Indoor pool, outdoor pool and a children's area. Good on a rainy day.", meta: "approx. 15 min", map: "Vossabadet" },
            { name: "Bømoen", desc: "Walking trails, cycling and playgrounds the children love.", meta: "approx. 20 min", map: "Bømoen, Voss" }
          ]
        },
        {
          title: "Day trips",
          items: [
            { name: "Flåm Railway and the Nærøyfjord", desc: "One of the world's most beautiful train journeys, and a UNESCO-listed fjord.", meta: "approx. 1–1.5 h", map: "Flåm, Norway" },
            { name: "Hardangerfjord", desc: "Waterfalls, orchards and fjord, a great day out.", meta: "approx. 1–1.5 h", map: "Hardangerfjorden" },
            { name: "Bergen", desc: "Bryggen, Mount Fløyen and the fish market. A good stop on the way to or from the airport.", meta: "approx. 1.5 h", map: "Bergen, Norge" }
          ]
        },
        {
          title: "Practical",
          items: [
            { name: "Grocery stores", desc: "Several to choose from, all a short drive away.", meta: "approx. 10 min", map: "grocery store Voss" },
            { name: "Vinmonopolet Voss", desc: "The state alcohol shop in the centre. Short hours on Saturday, closed Sunday.", meta: "approx. 15 min", map: "Vinmonopolet Voss" },
            { name: "Pharmacy and out-of-hours clinic", desc: "Both in the centre. Medical helpline: 116 117.", meta: "approx. 15 min", map: "Apotek Voss" },
            { name: "Voss train station", desc: "Trains to Bergen and Oslo, handy if someone arrives without a car.", meta: "approx. 15 min", map: "Voss stasjon" }
          ]
        }
      ]
    },

    downloads: {
      title: "Maps and guides",
      subtitle: "Worth downloading before you head out, as they work where mobile coverage does not.",
      items: [
        {
          name: "Piste map for Voss Resort",
          desc: "Every lift and slope with a full key, in Norwegian and English.",
          meta: "JPG · 1.4 MB",
          file: "assets/filer/skikart-voss-resort.jpg",
          img: "assets/img/skikart-voss-resort.jpg",
          cta: "Open the map"
        },
        {
          name: "Hiking map for Voss Resort",
          desc: "Twelve marked routes with distance, ascent and estimated time, in Norwegian and English. Route 8 runs from Hangurstoppen past Tråstølen.",
          meta: "PDF · 8.6 MB · 2 pages",
          file: "assets/filer/voss-resort-vandreguide.pdf",
          img: "assets/img/vandreguide-forside.jpg",
          cta: "Download PDF"
        }
      ]
    },

    footer: {
      about: "A modern rental chalet in Tråstølen, Voss, with ski-in/ski-out, a sauna and a salt-water hot tub. Booking through Airbnb.",
      linksTitle: "Pages",
      contactTitle: "Contact",
      bookTitle: "Booking",
      bookText: "Calendar, rates and reservations are on Airbnb.",
      rights: "All rights reserved."
    },

    common: {
      back: "Back to the home page",
      close: "Close",
      openMenu: "Menu",
      langLabel: "Language",
      themeLabel: "Switch between light and dark theme",
      imagePlaceholder: "Photo coming",
      logout: "Sign out"
    }
  }
};
