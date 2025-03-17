const User = require("../models/user");

const getUserMatches = async (req, res) => {
  try {
     const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "İstifadəçi tapılmadı!" });
    }

    const zodiacMatches = {
      "Qoç": ["Şir", "Oxatan", "Əkizlər", "Tərəzi"],
      "Buğa": ["Xərçəng", "Oğlaq", "Qız"],
      "Əkizlər": ["Tərəzi", "Dolça", "Qoç", "Balıqlar"],
      "Xərçəng": ["Buğa", "Oğlaq", "Balıqlar", "Şir"],
      "Şir": ["Qoç", "Əkizlər", "Tərəzi", "Oxatan"],
      "Qız": ["Buğa", "Oğlaq", "Xərçəng", "Balıqlar"],
      "Tərəzi": ["Əkizlər", "Şir", "Dolça", "Qoç"],
      "Əqrəb": ["Balıqlar", "Xərçəng", "Oğlaq"],
      "Oxatan": ["Qoç", "Şir", "Əkizlər", "Dolça"],
      "Oğlaq": ["Buğa", "Xərçəng", "Qız", "Əqrəb"],
      "Dolça": ["Əkizlər", "Tərəzi", "Oxatan", "Balıqlar"],
      "Balıqlar": ["Xərçəng", "Buğa", "Əqrəb", "Əkizlər"]
    };

    const compatibleSigns = zodiacMatches[user.zodiacSign] || [];

    const matches = await User.find({
      zodiacSign: { $in: compatibleSigns },
      _id: { $ne: user._id }
    });

    res.json({ user, matches });
  } catch (error) {
    res.status(500).json({ message: "Xəta baş verdi!" });
  }
};

const getAllUser = async (req,res) => {
  try {
    const getUser = await User.find()
    res.status(200).json(getUser)
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}
const getAllUserId = async (req,res) => {
  const id = req.params.id
  try {
    const getUser = await User.findById(id)
    res.status(200).json(getUser)
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}


const deleteUser = async (req, res) => {
  const userId = req.params.id; // Silinəcək istifadəçinin ID-si
  try {
    const deletedUser = await User.findByIdAndDelete(userId); // İstifadəçini sil
    if (!deletedUser) {
      return res.status(404).json({ message: "İstifadəçi tapılmadı!" });
    }
    res.status(200).json({ message: "İstifadəçi uğurla silindi!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { getUserMatches,getAllUser,getAllUserId, deleteUser };
