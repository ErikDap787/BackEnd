import Order from "../DAO/Models/orderModel.js";

export const showCheckoutPageCtrl = async (req, res) => {
  try {
    const cartItems = req.session.cart;

    function calculateCartTotal(cartItems) {
      let total = 0;
      for (const item of cartItems) {
        total += item.price * item.quantity;
      }
      return total;
    }

    const cartTotal = calculateCartTotal(cartItems);

    res.render("checkout", { cartItems, cartTotal });
  } catch (error) {
    console.error(error);
    res.render("error", {
      message: "Error al mostrar la página de finalización de compra",
    });
  }
};

export const processOrderCtrl = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    const cartItems = req.session.cart;

    const order = new Order({
      items: cartItems,
      shippingAddress,
      paymentMethod,
    });

    await order.save();

    req.session.cart = [];

    res.send("La compra ha sido realizada con exito", { order });
  } catch (error) {
    console.error(error);
    res.render("error", { message: "Error al procesar el pedido" });
  }
};
