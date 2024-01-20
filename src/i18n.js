import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  "en-US": {
    translation: {
      "Bridging Connections and Empowering Autistic Journeys":
        "Bridging Connections and Empowering Autistic Journeys",
      "is a compassionate and knowledgeable companion designed to provide valuable insights,guidance, and a sense of understanding for individuals and communities navigating the diverse spectrum of autism.":
        "is a compassionate and knowledgeable companion designed to provide valuable insights,guidance, and a sense of understanding for individuals and communities navigating the diverse spectrum of autism.",
      "Sign in with google": "Sign in with google",
      Home: "Home",
      Discover: "Discover",
      Library: "Library",
      "New Thread": "New Thread",
      "Where knowledge begins": "Where knowledge begins",
      Focus: "Focus",
      Attach: "Attach",
      "Ask anything...": "Ask anything...",
      "Paññā (Knowledge)": "Paññā (Knowledge)",
    },
  },
  "es-US": {
    translation: {
      "Bridging Connections and Empowering Autistic Journeys":
        "Uniendo conexiones y empoderando viajes autistas",
      "is a compassionate and knowledgeable companion designed to provide valuable insights,guidance, and a sense of understanding for individuals and communities navigating the diverse spectrum of autism.":
        "es un compañero compasivo y conocedor diseñado para brindar valiosos conocimientos, orientación y un sentido de comprensión para personas y comunidades que navegan por el diverso espectro del autismo.",
      "Sign in with google": "Inicia sesión con Google",
      Home: "Hogar",
      Discover: "Descubrir",
      Library: "Biblioteca",
      "New Thread": "Nuevo hilo",
      "Where knowledge begins": "donde comienza el conocimiento",
      Focus: "Enfocar",
      Attach: "Adjuntar",
      "Ask anything...": "Pregunta cualquier cosa...",
      "Paññā (Knowledge)": "Paññā (Conocimiento)",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "EN",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
      //   format: function(value, format, lng) {
      //     if(value instanceof Date) return moment(value).format(format);
      //     return value;
      // }
    },
  });

export default i18n;
