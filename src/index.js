import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { MetamaskStateProvider } from "use-metamask";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import App from "./App";
import { HashRouter } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyAfA970qMp5tM0hbrLVwtaFaToYz1bnCNA",
  authDomain: "toolcat-28074.firebaseapp.com",
  projectId: "toolcat-28074",
  storageBucket: "toolcat-28074.appspot.com",
  messagingSenderId: "778492543794",
  appId: "1:778492543794:web:986c0f27f7e2034985cd2b",
  measurementId: "G-V6RF47HVR9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app); // const analytics = 

ReactDOM.render(
  <React.StrictMode>
      <HashRouter>
        <MetamaskStateProvider>
          <App />
        </MetamaskStateProvider>
      </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
