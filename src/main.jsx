// Entry point React — menghubungkan aplikasi ke <div id="root"> di index.html
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

// React Router untuk navigasi antar halaman
import { BrowserRouter } from "react-router-dom"

// File styling global
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Router membungkus seluruh aplikasi */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
