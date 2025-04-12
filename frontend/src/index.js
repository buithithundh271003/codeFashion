import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux'
import { store } from './State/Store';
// import 'swiper/css/bundle';
// import '';
// import '../src/organic-1.0.0/css/style.css';
// import '../src/organic-1.0.0/css/vendor.css';
// import { Helmet } from "react-helmet";

function loadStylesheet(href) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

// Thêm các file CSS vào trang
loadStylesheet("https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css");
loadStylesheet("https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css");
loadStylesheet("../src/organic-1.0.0/css/vendor.css");
loadStylesheet("../src/organic-1.0.0/css/style.css");

// Thêm font từ Google Fonts
const googleFonts = document.createElement("link");
googleFonts.rel = "stylesheet";
googleFonts.href = "https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap";
document.head.appendChild(googleFonts);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <App />
    </Provider>
  
    </BrowserRouter>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
