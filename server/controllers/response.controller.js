import Response from "../models/Response.js";

export const deleteResponse = async (req, res) => {
  try {
    const { id } = req.params;
    await Response.findByIdAndDelete(id);
    res.status(200).json({ msg: "Response deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
