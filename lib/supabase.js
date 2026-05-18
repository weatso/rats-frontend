import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vqhruyfocczcawqvcrxk.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxaHJ1eWZvY2N6Y2F3cXZjcnhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2NjI1MjYsImV4cCI6MjA5MjIzODUyNn0.cRdPsd0HQAVsNAYB43V2bwTxf0j3MaAjsEjLKTe7Nc8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
