const { supabaseAuth } = require("../supabaseClient");

// Verifies the Supabase access token sent from the frontend and attaches req.user.
// Blocks the request with 401 if the token is missing or invalid.
async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "Missing access token" });
  }

  const { data, error } = await supabaseAuth.auth.getUser(token);

  if (error || !data.user) {
    return res.status(401).json({ error: "Invalid or expired access token" });
  }

  req.user = data.user;
  next();
}

module.exports = { requireAuth };
