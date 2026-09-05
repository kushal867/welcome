const { createClient } = require("@supabase/supabase-js");

// Service role key bypasses Row Level Security - only ever used server-side.
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Anon key client, used only to verify a user's access token in auth middleware.
const supabaseAuth = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

module.exports = { supabaseAdmin, supabaseAuth };
