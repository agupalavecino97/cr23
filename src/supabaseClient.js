import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kvahfwejlmlgisbdnlxn.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2YWhmd2VqbG1sZ2lzYmRubHhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQzMjQ5OTMsImV4cCI6MTk4OTkwMDk5M30.3nNj-eGD2BnmdEYDj2PG1qLlZ2dE_MS8U9TycW2Ui1A'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)