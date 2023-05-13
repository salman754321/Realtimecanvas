const Item = require("../models/Items");

let calculateTotal = async(items) => {
    let total = 0;
    items.forEach(item => {
        total += item.qty * item.price;
    });
    return total;
    
}


module.exports = {
    calculateTotal
}
