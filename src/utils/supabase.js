import { supabase } from './supabaseClient'

// Mengambil semua daftar flight
export async function getFlights() {
  return await supabase.from("flights").select("*")
}

// Mendapatkan flight berdasarkan ID
export async function getFlightById(id) {
  return await supabase.from("flights").select("*").eq("id", id).single()
}

// Membuat booking baru
export async function createBooking({ ticket_code, user_id, flight_id }) {
  return await supabase.from("bookings").insert({
    ticket_code,
    user_id,
    flight_id,
    status: "paid"
  }).select().single()
}

// Mendapatkan data booking berdasarkan ticket_code
export async function getBookingByTicket(ticket_code) {
  return await supabase.from("bookings").select(`
    *,
    flights(*)
  `).eq("ticket_code", ticket_code).single()
}

// Membuat check-in
export async function createCheckin({ booking_id, seat }) {
  return await supabase.from("checkins").insert({
    booking_id,
    seat
  }).select().single()
}
