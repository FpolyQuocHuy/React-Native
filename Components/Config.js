
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import axios from "axios";

import 'firebase/compat/auth';
import 'firebase/compat/storage';


const Config = {
  
    apiKey: "AIzaSyD4-FvM2qcwF7eH7tV2ICiRfAfzfraZaCM",
    authDomain: "mydata-48487.firebaseapp.com",
    databaseURL: "https://mydata-48487-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "mydata-48487",
    storageBucket: "mydata-48487.appspot.com",
    messagingSenderId: "1039538972504",
    appId: "1:1039538972504:web:6a2e0e9332376707a9272d",
    measurementId: "G-VS5XZJSDLL"
};

const app = initializeApp(Config);
export const db = getDatabase(app);
export const mStorage = getStorage(app);
export const convertUriToBlob = async(uri) => {
    try {
        const response = await axios.get(uri, {
          responseType: "blob",
        });
        return response.data;
      } catch (error) {
        throw new Error("Failed to convert URI to Blob");
      }
}