const mongoose = require('mongoose');
const Item = require('../models/item');

mongoose.connect('mongodb://localhost:27017/item-db', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB...');
    })
    .catch(err => {
        console.error('Could not connect to MongoDB...');
        console.error(err);
    });

const seedDb = async () => {
    // Clear the collection (if needed)
    // await Item.deleteMany({}); // Uncomment this line to clear existing data

    // Add a new item
    const item = new Item({
        name: 'Sample Item',
        category: 'Sample Category',
        quantity: 10,
        price: 99.99,
        description: 'This is a sample item description.'
    });

    await item.save();
    console.log('Database seeded with item data.');
};

seedDb().then(() => {
    mongoose.connection.close();
});
