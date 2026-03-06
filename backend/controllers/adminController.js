const User=require("../models/User");


const getAdmins = async (req, res) => {
  try {
    const users = await User.find({ role: "admin" }).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const admin = await User.findById(req.params.id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isSelfDelete = req.user._id.toString() === req.params.id;

    await admin.deleteOne();

    res.json({
      message: "Admin Deleted Successfully",
      logout: isSelfDelete,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports={getAdmins,deleteAdmin};