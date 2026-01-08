import textModel from "../models/Text.js";

export const addText = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { text } = req.body;
    console.log("ADDTEXT: ", userId, text);
    const newText = new textModel({
      createdBy: userId,
      text,
    });
    await newText.save();
    return res.status(200).json({ text: newText.text, status: newText.status });
  } catch {
    (error) => {
      res.status(500).json("Server Error: ", error.message);
    };
  }
};

export const getAllText = async (req, res) => {
  try {
    const sort = req.body.sort;
    const userId = req.user.userId;
    const userName = req.user.userName;
    console.log("GET ALL TEXT: ", userId, sort);
    let userData = [];
    if (sort === "all" || sort === "") {
      userData = await textModel.find({ createdBy: userId });
    } else if (sort === "pending") {
      userData = await textModel.find({
        createdBy: userId,
        isCompleted: false,
      });
    } else if (sort === "completed") {
      userData = await textModel.find({ createdBy: userId, isCompleted: true });
    }

    if (!userData.length === 0) {
      return res.status(404).json({ msg: "No Data Found" });
    } else {
      return res.status(200).json({ userData: userData, userName: userName });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteById = async (req, res) => {
  try {
    const textId = req.params.id;
    console.log("DELETE BY ID: ", textId);
    if (!textId) {
      return res.status(404).json({ msg: "Id not found." });
    } else {
      const userData = await textModel.findById(textId);
      const deleted = await textModel.findByIdAndDelete(textId);
      if (deleted) {
        return res
          .status(200)
          .json({ msg: "Deletion Successful.", text: userData.text });
      }
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const editById = async (req, res) => {
  try {
    const userId = req.params.id;
    const { text } = req.body;
    console.log("EDIT BY ID: ", userId, text);
    if (!userId) {
      return res.status(404).json({ msg: "Id not found." });
    } else {
      const done = await textModel.findByIdAndUpdate(userId, { text: text });
      const updated = await textModel.findById(userId);
      if (done) {
        return res
          .status(200)
          .json({ msg: "Update Successful", updatedData: updated.text });
      }
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const status = async (req, res) => {
  try {
    const userId = req.params.id;
    const userStatus = req.body.isCompleted;
    console.log("STATUS: ", userId, userStatus);
    if (!userId) {
      return res.status(404).json({ msg: "Id not found." });
    } else {
      const done = await textModel.findByIdAndUpdate(userId, {
        isCompleted: userStatus,
      });
      const updated = await textModel.findById(userId);
      if (done) {
        return res
          .status(200)
          .json({ msg: "Status Changed.", status: updated.isCompleted });
      }
    }
  } catch (error) {
    console.error(error.message);
  }
};
