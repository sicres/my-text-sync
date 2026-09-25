import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  onValue
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAIofTXB7I6mWZXjNT5k1DXe60C2BmpQM",
  authDomain: "my-text-sync.firebaseapp.com",
  databaseURL: "https://my-text-sync-default-rtdb.firebaseio.com",
  projectId: "my-text-sync",
  storageBucket: "my-text-sync.firebasestorage.app",
  messagingSenderId: "227196875342",
  appId: "1:227196875342:web:9659efce6709ec48b0891f",
  measurementId: "G-QBZLYVD3Q2"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const textRef = ref(db, "sharedText");

const textBox = document.getElementById("text");
const status = document.getElementById("status");
const saveButton = document.getElementById("save");
const clearButton = document.getElementById("clear");

onValue(textRef, (snapshot) => {
  const value = snapshot.val();

  if (value !== null && document.activeElement !== textBox) {
    textBox.value = value;
  }

  status.textContent = "🟢 Connected";
});

saveButton.addEventListener("click", async () => {
  try {
    await set(textRef, textBox.value);
    status.textContent = "✅ Saved online";
  } catch (error) {
    status.textContent = "❌ Save failed";
  }
});

clearButton.addEventListener("click", async () => {
  textBox.value = "";

  try {
    await set(textRef, "");
    status.textContent = "✅ Cleared";
  } catch (error) {
    status.textContent = "❌ Clear failed";
  }
});
