const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const JWT_SECRET = process.env.JWT_SECRET;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required", success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password", success: false });
    }

    const payload = {
      userId: user._id,
      tenantId: user.tenantId,
      role: user.role
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful",
      success: true,
      token,
      user: {
        email: user.email,
        role: user.role,
        tenantId: user.tenant
      }
    });

  } catch (err) {
    res.status(500).json({ message: "Login failed", success: false, error: err.message });
  }
};

module.exports = { login };