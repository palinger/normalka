import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtgZnbRNCPXQxWLvTlqW2Q1HDZHsPwyLE",
  authDomain: "menu-83923.firebaseapp.com",
  projectId: "menu-83923",
  storageBucket: "menu-83923.appspot.com",
  messagingSenderId: "839618370553",
  appId: "1:839618370553:web:6a7b6fb9c5a2a4690c3b28",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export async function getNewTest(dbx: any) {
  const currentWeekCol = collection(dbx, "newTest");
  const currentWeekSnapshot = await getDocs(currentWeekCol);
  const currentWeekList = await currentWeekSnapshot.docs.map((doc) =>
    doc.data()
  );
  return currentWeekList;
}

export async function getOrders(dbx: any) {
  const currentWeekCol = collection(dbx, "orders");
  const currentWeekSnapshot = await getDocs(currentWeekCol);
  const currentWeekList = await currentWeekSnapshot.docs.map((doc) =>
    doc.data()
  );
  return currentWeekList;
}
