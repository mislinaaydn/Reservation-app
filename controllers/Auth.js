const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  const { username, password, email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(500)
        .json({ message: "Zaten böyle bir kullanıcı bulunmakta..." });
    }
    if (password.length < 6)
      return res.status(500).json({ message: "Parola kısa..." });

    if (!isEmail(email))
      return res.status(500).json({ message: "Email formatında yazınız..." });

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = await User.create({ ...req.body, password: passwordHash });
    const token = await jwt.sign(
      { id: newUser._id, isAdmin: newUser.isAdmin },
      "SECRET_KEY",
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { httpOnly: true }).status(201).json({
      message: "Kullanıcı başarıyla oluşturuldu!", // Başarı mesajı eklendi
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res, next) => {
  const { password, email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      // 'if (user)' yerine '!user' olarak değiştirildi
      return res
        .status(404)
        .json({ message: "Böyle bir kullanıcı bulunmamakta..." }); // Hata mesajı da güncellendi
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      return res.status(401).json({ message: "Parolalar eşleşmiyor..." });
    }
    const token = await jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      "SECRET_KEY",
      { expiresIn: "1h" }
    );
    res.cookie("token", token, { httpOnly: true }).status(200).json({
      message: "Giriş yaptınız!", // Başarı mesajı eklendi
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

function isEmail(emailAdress) {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (emailAdress.match(regex)) return true;
  else return false;
}

module.exports = { register, login };
