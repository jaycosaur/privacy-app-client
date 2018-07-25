import * as firebase from "firebase";

import { FIREBASE_CONFIG } from "./config";
let fire = firebase.initializeApp(FIREBASE_CONFIG);

export default fire
export const auth = firebase.auth()
export const db = firebase.firestore()

const settings = {/* your settings... */ timestampsInSnapshots: true};
db.settings(settings);
