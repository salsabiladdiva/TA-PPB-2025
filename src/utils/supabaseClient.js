// Membuat client Supabase agar bisa dipakai di seluruh aplikasi
import { createClient } from '@supabase/supabase-js'

// Mengambil URL dan KEY dari file .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Membuat instance Supabase
export const supabase = createClient(supabaseUrl, supabaseKey)
