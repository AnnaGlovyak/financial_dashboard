import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { firebaseConfig } from './firebase-config.js'

const firebaseApp = initializeApp(firebaseConfig)

export const db = getFirestore()

// const { Timestamp, GeoPoint } = firebaseApp.getFirestore
// export { Timestamp, GeoPoint }

// db.settings({ timestampsInSnapshots: true })
// console.log(db)