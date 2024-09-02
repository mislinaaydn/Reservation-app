const Hotel = require("../models/Hotel.js");
const Room = require("../models/Room.js");

//oteli ekleme
const createHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.create(req.body);
    res.status(201).json(hotel);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
//oteli güncelleme
const updateHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(
      id,
      { $set: req.body }, //HTTP isteğiyle birlikte gelen ve güncellenmesi istenen verileri içeren bir objedir.
      { new: true } //güncellenmiş belgenin geri döndürülmesini sağlar.
    );
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
//oteli silme
const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(id); //bi yere atayıp json olarak dönmemesi için const kullanmadık
    res.status(200).json({ message: "silindi" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
//otelin detaylarını getirir
const getSingleHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(id);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
//tüm otelleri filtreleyerek listeler
const getAllHotel = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotel = await Hotel.find({
      ...others,
      cheapestPrice: {
        $gt: min | 1,
        $lt: max | 999,
      },
    }).limit(req.query.limit);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
//Tipine göre otel listelemek için kullanılır

const typeByCount = async (req, res, next) => {
  try {
    const hotel = await Hotel.countDocuments({ type: "hotel" });
    const villa = await Hotel.countDocuments({ type: "villa" });

    res.status(200).json([
      { type: "hotel", count: hotel },
      { type: "villa", count: villa },
    ]);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
//şehirine göre otel listelemek için kullanılır

const typeByCity = async (req, res, next) => {
  try {
    const cities = req.query.cities.split(",");

    const hotel = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
module.exports = {
  createHotel,
  updateHotel,
  deleteHotel,
  getSingleHotel,
  getAllHotel,
  typeByCount,
  typeByCity,
};
