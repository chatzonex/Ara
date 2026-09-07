import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-analytics.js";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  deleteField,
  arrayUnion,
  arrayRemove,
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  enableNetwork,
  disableNetwork,
  writeBatch,
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";
import {
  getAuth,
  signInAnonymously,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  deleteUser,
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyDFgxjZgoaP7Q7vSUjXOJvM1-UIRYIEsyk",
  authDomain: "chatzone-b296a.firebaseapp.com",
  projectId: "chatzone-b296a",
  storageBucket: "chatzone-b296a.firebasestorage.app",
  messagingSenderId: "157945849107",
  appId: "1:157945849107:web:e1aa8f36f1bca9a7ab66e6",
  measurementId: "G-DYPL4KPMXX",
};
const app = initializeApp(firebaseConfig);
try {
  getAnalytics(app);
} catch (a0_0x481910) {
  console.warn("Analytics غير متاح في البيئة الحالية:", a0_0x481910);
}
let db;
try {
  db = initializeFirestore(app, {
    localCache: persistentLocalCache({
      tabManager: persistentMultipleTabManager(),
    }),
  });
} catch (a0_0x5069be) {
  console.warn(
    "تعذّر تفعيل التخزين المحلي (IndexedDB)، هنكمل أونلاين بس:",
    a0_0x5069be,
  );
  db = initializeFirestore(app, {});
}
const auth = getAuth(app);
function waitForAuthUser() {
  return new Promise((_0x598d4a) => {
    const _0x35110a = onAuthStateChanged(auth, (_0x3f42b6) => {
      _0x35110a();
      _0x598d4a(_0x3f42b6);
    });
  });
}
async function ensureAuthenticated() {
  const _0x58dbcf = await waitForAuthUser();
  if (_0x58dbcf) {
    return _0x58dbcf;
  }
  const _0x45baac = await signInAnonymously(auth);
  return _0x45baac.user;
}
async function signInAdmin(_0x251f4e, _0x262818) {
  const _0x3ee584 = await signInWithEmailAndPassword(
    auth,
    _0x251f4e,
    _0x262818,
  );
  return _0x3ee584.user;
}
export {
  db,
  auth,
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  deleteField,
  arrayUnion,
  arrayRemove,
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  enableNetwork,
  disableNetwork,
  writeBatch,
  signInAnonymously,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  deleteUser,
  waitForAuthUser,
  ensureAuthenticated,
  signInAdmin,
};
