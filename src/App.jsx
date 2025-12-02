import { Routes, Route } from "react-router-dom"
import HomePage from "./modules/home/HomePage"
import BookingPage from "./modules/booking/BookingPage"
import CheckinPage from "./modules/checkin/CheckinPage"
import AboutPage from "./modules/profile/AboutPage"
import ProfilePage from "./modules/profile/ProfilePage"
import FlightDetailPage from "./modules/flights/FlightDetailPage"
import PaymentSuccessPage from "./modules/payments/PaymentSuccessPage"
import LoginPage from "./modules/auth/LoginPage"
import RegisterPage from "./modules/auth/RegisterPage"
import BoardingPassPage from "./modules/checkin/BoardingPassPage"
import AddFlightPage from "./modules/admin/AddFlightPage" // <-- 1. Import ini

export default function App() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        overflowX: "hidden",
        background: "#000"
      }}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/flight/:id" element={<FlightDetailPage />} />
        <Route path="/checkin" element={<CheckinPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/payment-success" element={<PaymentSuccessPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/boarding-pass" element={<BoardingPassPage />} />
        
        {/* 2. Tambahkan Route Admin */}
        <Route path="/admin/add-flight" element={<AddFlightPage />} />
      </Routes>
    </div>
  )
}