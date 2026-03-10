import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cpemfycycndyiyffkgjm.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwZW1meWN5Y25keWl5ZmZrZ2ptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwNzQzNzAsImV4cCI6MjA4NzY1MDM3MH0.V7LSh0Qd8AIe3_lKU3aL1V7yk0oVnWNTinLGUM_4scI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
