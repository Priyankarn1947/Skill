import Skill from "../models/Skill.js";
import User from "../models/User.js";

export const addSkill = async (req, res) => {
  try {
    const newSkill = await Skill.create({ ...req.body, userId: req.user.id });
    res.status(201).json(newSkill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find().populate("userId", "name email");
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ message: "Skill not found" });
    if (skill.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    await skill.deleteOne();
    res.json({ message: "Skill deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const findMatches = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);
    const matches = await User.find({
      teachSkills: { $in: currentUser.learnSkills },
    }).select("name email teachSkills");
    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
