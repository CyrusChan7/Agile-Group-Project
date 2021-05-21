const userModel = require("../database").userModel;

// check if user's email exist and also check user's password
const getUserByEmailIdAndPassword = (email, password) => {
  const user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};

// see if user exists based on their id
const getUserById = (id) => {
  const user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

// Check whether user is valid by the password they inputted
function isUserValid(user, password) {
  return user.password === password;
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
};