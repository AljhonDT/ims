const mongoose = require('mongoose');
const Item = require('../../models/item');

mongoose.connect('mongodb://localhost:27017/item-db')
    .then(() => {
        console.log('Connected to MongoDB...');
    })
    .catch(err => {
        console.error('Could not connect to MongoDB...');
        console.error(err);
    });

// List of All Items
exports.items = async (req, res) => {
        const items = await Item.find({})
        res.render('index', {items}); // Render the index view
}

// Add Item Form
exports.addItemForm  = (req, res) => {
    res.render('new-item');
}

// Create Item
exports.addItem = async (req, res) => {
    const item = new Item(req.body);
    console.log(item);
    await item.save();
    res.redirect('/items');
}

// View Specific Item
exports.viewItem = async (req, res) => {
    const item = await Item.findById(req.params.id);
    res.render('show-item', {item});
}

// Update Item Form
exports.editItemForm = async(req, res) => {
    const item = await Item.findById(req.params.id);
    res.render('edit-item', {item});
}

// Update Item
exports.updateItem = async(req, res) => {
    const {id} = req.params;
    await Item.findByIdAndUpdate(id, {...req.body});
    res.redirect(`/items/${id}`);
}

// Delete Item
exports.deleteItem = async (req, res) => {
    const { id } = req.params;
    await Item.findByIdAndDelete(id);
    res.redirect('/items');
}
