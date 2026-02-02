import textModel from "../models/Text.js";
import { RequestHandler } from "express";

export const addText: RequestHandler = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { text } = req.body;
    console.log("ADDTEXT: ", userId, text);
    const newText = new textModel({
      createdBy: userId,
      text,
    });
    await newText.save();
    return res
      .status(200)
      .json({ text: newText.text, isCompleted: newText.isCompleted });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error);
      res.status(500).json({ msg: "Server Error", error: error.message });
    }
  }
};

export const getAllText: RequestHandler = async (req, res) => {
  try {
    const sort = req.body.sort;
    const userId = req.user.userId;
    const userName = req.user.userName;
    console.log("GET ALL TEXT: ", userId, sort);
    let userData: any[] = [];
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
    if (userData.length === 0) {
      return res.status(404).json({ msg: "No Data Found" });
    } else {
      return res.status(200).json({ userData: userData, userName: userName });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error);
      res.status(500).json({ msg: "Server Error", error: error.message });
    }
  }
};

export const deleteById: RequestHandler = async (req, res) => {
  try {
    const textId = req.params.id;
    console.log("DELETE BY ID: ", textId);
    if (!textId) {
      return res.status(404).json({ msg: "Id not found." });
    } else {
      const userData = await textModel.findById(textId);
      if (!userData) {
        return res.json({ msg: "No user data found" });
      }
      const deleted = await textModel.findByIdAndDelete(textId);
      if (deleted) {
        return res
          .status(200)
          .json({ msg: "Deletion Successful.", text: userData.text });
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error);
      res.status(500).json({ msg: "Server Error", error: error.message });
    }
  }
};

export const editById: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.id;
    const { text } = req.body;
    console.log("EDIT BY ID: ", userId, text);
    if (!userId) {
      return res.status(404).json({ msg: "Id not found." });
    } else {
      const done = await textModel.findByIdAndUpdate(
        userId,
        { text: text },
        { new: true },
      );
      if (done) {
        return res
          .status(200)
          .json({ msg: "Update Successful", updatedData: done.text });
      } else {
        return res.status(500).json({ msg: "Updating error" });
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error);
      res.status(500).json({ msg: "Server Error", error: error.message });
    }
  }
};

export const status: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.id;
    const userStatus = req.body.isCompleted;
    console.log("STATUS: ", userId, userStatus);
    if (!userId) {
      return res.status(404).json({ msg: "Id not found." });
    } else {
      const done = await textModel.findByIdAndUpdate(
        userId,
        {
          isCompleted: userStatus,
        },
        { new: true },
      );
      if (done) {
        return res
          .status(200)
          .json({ msg: "Status Changed.", status: done.isCompleted });
      } else {
        return res.status(500).json({ msg: "Updating error" });
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error);
      res.status(500).json({ msg: "Server Error", error: error.message });
    }
  }
};
