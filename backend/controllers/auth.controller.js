const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Create new user
    const newUser = new User({
      email,
      password: bcrypt.hashSync(password, 8),
    });

    const defaultRole = await Role.findOne({ name: "user" });
    if (!defaultRole) {
      return res.status(500).send({ message: "Default role 'user' not found" });
    }
    newUser.roles = [defaultRole._id];

    // Save user to the database
    const savedUser = await newUser.save();
    res.send({ message: "User was registered successfully with 'user' role." });
  } catch (err) {
    if (err.name === 'ValidationError') {
      // Handle validation errors
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).send({ message: messages.join(', ') });
    }

    console.error("Signup error:", err);
    res.status(500).send({ message: err.message });
  }
};

exports.signin = async (req, res) => {

  try {
    // Find user by email
    const user = await User.findOne({ email: req.body.email }).populate("roles", "-__v").exec();

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    // Validate password
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Password!" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, config.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });

    // Prepare user roles
    const authorities = user.roles.map(role => "ROLE_" + role.name.toUpperCase());

    // Set the session cookie
    res.cookie('elearn-session', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: 'strict',
    });

    // Send response with user data and roles
    res.status(200).send({
      id: user._id,
      email: user.email,
      roles: authorities,
    });
  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).send({ message: err.message });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};
