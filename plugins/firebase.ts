import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {initializeAppCheck, ReCaptchaV3Provider} from "firebase/app-check";

const firebaseConfig = {
  apiKey: "AIzaSyDEgHrY9f7gQLOyRZj4CZmhSs0PHgrFQOA",
  authDomain: "vdttest-16ef2.firebaseapp.com",
  projectId: "vdttest-16ef2",
  storageBucket: "vdttest-16ef2.appspot.com",
  messagingSenderId: "199442472246",
  appId: "1:199442472246:web:eea4de28a125b479f02797",
  measurementId: "G-6Y4GX1GZVF"
};

const app = initializeApp(firebaseConfig);
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LfGpPgfAAAAALj-kWqFaSCY9wm_V4p_heyrZ_eR'),
  isTokenAutoRefreshEnabled: true,

});
const db = getFirestore(app);

export default db;
