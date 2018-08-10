import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'


import { FIREBASE_CONFIG } from "./config";
let fire = firebase.initializeApp(FIREBASE_CONFIG);
export default fire

export const auth = firebase.auth()
export const db = firebase.firestore()
export const storageRef = firebase.storage().ref()
export const functions = firebase.functions();

const settings = {/* your settings... */ timestampsInSnapshots: true};
db.settings(settings);
