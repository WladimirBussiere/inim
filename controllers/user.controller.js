const User = require("../models/user.model.js");
const Token = require("../models/token.model.js");
const Bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



async function blacklistToken(tokenToBlacklist) {

  const token = {
    createdAt: Date.now(),
    blacklisted_token: tokenToBlacklist
  }
  console.log('BLACKLIST', token);
  try {
    const tokenData = new Token(token);
    const blacklistedToken = await tokenData.save()
    console.log(blacklistedToken);
    return blacklistedToken;
  }
  catch(error) {
    console.log(error);
    res.status(500).json({error})
  }
}



async function logout(req, res) {
  const tokenToBlacklist = req.token;
  blacklistToken(tokenToBlacklist);
  res.status(200).json({ text: "you've been logged out" });
}




async function signup(req, res) {
  console.log('SIGNUP');
  console.log('BODY:', req.body);
  const { password, email } = req.body;
  if (!email || !password) {
    //Le cas où l'email ou bien le password ne serait pas soumit ou nul
    return res.status(400).json({
      text: "Invalid request"
    });
  }
  // Création d'un objet user, dans lequel on hash le mot de passe
  const user = {
    email,
    password: Bcrypt.hashSync(password, 10)
  };
  // On check en base si l'utilisateur existe déjà
  try {
    const findUser = await User.findOne({
      email
    });
    if (findUser) {
      return res.status(400).json({
        text: "User already exists"
      });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
  try {
    // Sauvegarde de l'utilisateur en base
    const userData = new User(user);
    const userObject = await userData.save();
    const token = userObject.generateAuthToken();

    res.header("x-auth-token", token).send({
      _id: userObject._id,
      // name: user.name,
      email: userObject.email
    });

    // return res.status(200).json({
    //   text: "Success",
    //   // token: userObject.getToken()
    // });
  } catch (error) {
    return res.status(500).json({ error });
  }
}


async function login(req, res) {
  console.log('LOGIN');
  console.log('BODY:', req.body);
  const { password, email } = req.body;
  if (!email || !password) {
    //Le cas où l'email ou bien le password ne serait pas soumit ou nul
    return res.status(400).json({
      text: "Invalid request"
    });
  }
  try {
    // On check si l'utilisateur existe en base
    const findUser = await User.findOne({ email });
    if (!findUser)
      return res.status(401).json({
        text: "Unkown user"
      });
    // if (!findUser.authenticate(password))
    if(!Bcrypt.compareSync(password, findUser.password))
      return res.status(401).json({
        text: "Invalid password"
      });
    // return res.status(200).json({
    //   token: findUser.getToken(),
    //   text: "Authentication success"
    // });
    console.log('iciii');
    const token = findUser.generateAuthToken();
    console.log('TOKEN: ',  token);
    res.header("x-auth-token", token).send({
      _id: findUser._id,
      // name: user.name,
      email: findUser.email
    });

  } catch (error) {
    return res.status(500).json({
      error
    });
  }
}



async function authenticate(req, res, next) {
  //get the token from the header if present
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  //if no token found, return response (without going to the next middelware)
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const checkBlackListedToken = await Token.findOne({blacklisted_token: token});
    if (checkBlackListedToken) return res.status(401).send("Access denied. Token blacklisted");
  }
  catch(error){
    console.log(error);
    res.status(500).json({error})
  }
  try {
    //if can verify the token, set req.user and pass to next middleware
    const decoded = jwt.verify(token, process.env.SECRET);
    console.log('DECODED:',  decoded);
    req.user = decoded;
    req.token = token;
    next();
  } catch (error) {
    //if invalid token
    console.log(error);
    res.status(400).send("Invalid token.");
  }
};



module.exports = {
  login: login,
  signup: signup,
  authenticate: authenticate,
  logout: logout

}
