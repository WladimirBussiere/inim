const Order = require("../models/order.model.js");

//on POST
async function createOrder(req, res){
  console.log('CREATE ORDER');
  console.log('BODY:', req.body);

  const { mini_number, family_pack } = req.body;
  const user_id = req.user._id; //recuperation du user_id passé par le next de la fonction authenticate
  let mini_price = 15;

  if (!mini_number || mini_number === 0 || isNaN(mini_number)) {
    return res.status(400).json({
      text: "Invalid request"
    });
  }

// verifier login order, puis login puis order avec l'ancien jwt

  if (family_pack) {
    mini_price = 15 * 0.8;
  }
  if (mini_number > 50) {
    mini_price = 9;
  }

  const order_price = mini_price * mini_number;
  const order = {
    mini_number,
    order_price,
    mini_price,
    family_pack,
    user_id
  };

  console.log('ORDER: ', order);
  try {
    // Sauvegarde de l'utilisateur en base
    const orderData = new Order(order);
    const orderObject = await orderData.save();
    return res.status(200).json({
      text: "Success order"
    });
  } catch (error) {
    console.log('ERROR', error);
    return res.status(500).json({ error });
  }
}



//on GET
async function findOneOrder(req, res) {
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
    return res.status(200).json({
      text: "Success",
      token: userObject.getToken()
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}


//on GET
async function getOrdersList(req, res, next) {
  try{
    const findOrder = await Order.find();
    res.status(200).json(findOrder)
  }
  catch(error){
    console.log(error);
    res.status(500).json({error})
  }
}


//on GET
async function getUntreatedOrders(req, res, next) {
  try{
    const findOrder = await Order.find({"production_status": "untreated"});
    res.status(200).json(findOrder)
  }
  catch(error) {
    console.log(error);
    res.status(500).json({error})
  }
}



async function updateOrder(req, res) {
  const order = {
    production_status: req.body.production_status,
    serial_numbers: req.body.serial_numbers
  }
  console.log('ORDER', order);
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.body.id, order, {new: true})
    res.status(200).json(updatedOrder);
  }
  catch(error) {
    console.log(error);
    res.status(500).json({error})
  }
}


async function deleteOrder(req, res){

}


module.exports = {
  createOrder: createOrder,
  updateOrder: updateOrder,
  getOrdersList: getOrdersList,
  getUntreatedOrders: getUntreatedOrders
}
