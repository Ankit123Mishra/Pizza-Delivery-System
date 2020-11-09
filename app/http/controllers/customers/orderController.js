const Order = require('../../../models/order');
const moment = require('moment');
function orderController() {
    return {
        store(req, res) {
            const { phone, address } = req.body;
            if (!phone || !address) {
                req.flash('error', 'All fields are required');
                return res.redirect('/cart');
            }

            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                phone: phone,
                address: address
            })

            order.save().then(result => {
                Order.populate(result, { path: 'customerId' }, (err, placedOrder) => {
                    req.flash('success', 'Order Placed Successfully');
                    delete req.session.cart
                    // Emit
                    const eventEmitter = req.app.get('eventEmitter');
                    eventEmitter.emit('orderPlaced', placedOrder);
                    return res.redirect('/customer/orders');
                });
            }).catch(err => {
                req.flash('error', 'Something went wrong');
                return res.redirect('/cart');
            })
        },

        async index(req, res) {
            const orders = await Order.find({ customerId: req.user._id },
                null,
                { sort: { 'createdAt': -1 } }
            )
            res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')
            res.render('customers/orders', { orders: orders, moment: moment });
        },

        async show(req, res) {
            const order = await Order.findById(req.params.id);
            // Authorize User
            if (req.user._id.toString() === order.customerId.toString()) {
                return res.render('customers/singleOrder', { order: order });
            }
            return res.redirect('/');
        },

        delete(req, res) {
            var pizza = JSON.parse(req.body.pizza);
            if (req.session.cart.items[pizza.item._id].qty === 1) {
                delete req.session.cart.items[pizza.item._id];
            }
            else {
                req.session.cart.items[pizza.item._id].qty -= 1;
            }
            req.session.cart.totalQty = req.session.cart.totalQty - 1;
            req.session.cart.totalPrice = req.session.cart.totalPrice - parseInt(pizza.item.price);
            if (req.session.cart.totalQty === 0) {
                req.session.cart = null;
            }
            res.redirect('/cart');
        }
    }
}

module.exports = orderController;