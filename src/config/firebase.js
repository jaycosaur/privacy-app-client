import * as firebase from "firebase";

import { FIREBASE_CONFIG } from "./config";
let fire = firebase.initializeApp(FIREBASE_CONFIG);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

export default fire
export const auth = firebase.auth()
export const fireRef = firebase.database().ref();
export const todosRef = fireRef.child("todos");
