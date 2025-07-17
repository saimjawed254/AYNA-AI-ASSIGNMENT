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

export const getAllResponseDates = async (req, res) => {
  try {
    const responses = await Response.find({}, "submittedAt formId").sort({ submittedAt: 1 });

    const data = responses.map(r => ({
      submittedAt: r.submittedAt,
      formId: r.formId,
    }));

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
