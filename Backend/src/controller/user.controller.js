const userModel = require("../models/user.model");

exports.registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res.status(401).json({
        msg: "Name missing",
      });
    }
    if (!email) {
      return res.status(401).json({
        msg: "Email missing",
      });
    }
    if (!password) {
      return res.status(401).json({
        msg: "Password missing",
      });
    }

    const isExist = await userModel.findOne({ email: email });
    if (isExist) {
      return res.status(401).json({
        msg: `${email} Already Exist`,
      });
    }

    // now save the data on database
    await userModel.create({
      name,
      email,
      password,
      ...req.body,
    });

    return res.status(201).json({
      msg: "Registation Succesfull",
    });
  } catch (error) {
    console.log("error from user registraion controller", error);
    res.status(501).json({
      msg: "error from user registraion controller",
      error: error,
    });
  }
};
