const express = require("express");
const { supabaseAdmin } = require("../supabaseClient");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

// GET /api/products?search=lap&category=<id>&minPrice=10&maxPrice=500
router.get("/", async (req, res) => {
  const { search, category, minPrice, maxPrice } = req.query;

  let query = supabaseAdmin
    .from("products")
    .select("*, category:categories(id, name)")
    .order("created_at", { ascending: false });

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }
  if (category) {
    query = query.eq("category_id", category);
  }
  if (minPrice) {
    query = query.gte("price", Number(minPrice));
  }
  if (maxPrice) {
    query = query.lte("price", Number(maxPrice));
  }

  const { data, error } = await query;

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

router.get("/:id", async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*, category:categories(id, name)")
    .eq("id", req.params.id)
    .maybeSingle();

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  if (!data) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(data);
});

router.post("/", requireAuth, async (req, res) => {
  const { name, price, category_id, image_url } = req.body;

  if (!name || price === undefined) {
    return res.status(400).json({ error: "name and price are required" });
  }

  const { data, error } = await supabaseAdmin
    .from("products")
    .insert({
      name,
      price,
      category_id: category_id || null,
      image_url: image_url || null,
      created_by: req.user.id,
    })
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data);
});

router.put("/:id", requireAuth, async (req, res) => {
  const { name, price, category_id, image_url } = req.body;
  const updates = {};

  if (name !== undefined) updates.name = name;
  if (price !== undefined) updates.price = price;
  if (category_id !== undefined) updates.category_id = category_id;
  if (image_url !== undefined) updates.image_url = image_url;

  const { data, error } = await supabaseAdmin
    .from("products")
    .update(updates)
    .eq("id", req.params.id)
    .select()
    .maybeSingle();

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  if (!data) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(data);
});

router.delete("/:id", requireAuth, async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from("products")
    .delete()
    .eq("id", req.params.id)
    .select()
    .maybeSingle();

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  if (!data) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(data);
});

module.exports = router;
