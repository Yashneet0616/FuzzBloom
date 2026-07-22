const {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} = require("../services/addressService");

// GET /api/addresses
async function getAll(req, res) {
  try {
    const addresses = await getAddresses(req.user.uid);

    res.json(addresses);
  } catch (err) {
  console.error("Address API Error:", err);

  res.status(500).json({
    message: err.message,
  });
}
}

// POST /api/addresses
async function create(req, res) {
  try {
    const address = await addAddress(req.user.uid, req.body);

    res.status(201).json(address);
  } catch (err) {
  console.error("Address API Error:", err);

  res.status(500).json({
    message: err.message,
  });
}
}

// PUT /api/addresses/:id
async function update(req, res) {
  try {
    const address = await updateAddress(
      req.user.uid,
      req.params.id,
      req.body
    );

    res.json(address);
  } catch (err) {
  console.error("Address API Error:", err);

  res.status(500).json({
    message: err.message,
  });
}
}

// DELETE /api/addresses/:id
async function remove(req, res) {
  try {
    const result = await deleteAddress(
      req.user.uid,
      req.params.id
    );

    res.json(result);
  } catch (err) {
  console.error("Address API Error:", err);

  res.status(500).json({
    message: err.message,
  });
}
}

module.exports = {
  getAll,
  create,
  update,
  remove,
};  