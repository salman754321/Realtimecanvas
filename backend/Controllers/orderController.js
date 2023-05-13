const Item = require('../models/Items');
const Order = require('../models/Order');
const { calculateTotal } = require('../utils/utils');





let addOrder = async(req, res) => {
    let { items } = req.body;
    let user = req.decoded._id;
    let total = 0;
    total = await calculateTotal(items);
    console.log(total);
    let order = new Order({ items, total, user });

    console.log(order);
    order.save()
        .then(order => {
            res.status(200).json({ "Success": true, 'Message': 'order added successfully' });
        }
        )
        .catch(err => {

            res.status(400).json({ "Success": false, 'Message': 'adding new order failed' , err });
        }
        );
}


module.exports = {
    addOrder
}
