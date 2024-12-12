const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const itemRoutes = require('./server/routes/itemRoutes');

const app = express();
app.set('view engine', 'ejs' )
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true })); // Parses form data
app.use(methodOverride('_method'));  
app.use((req, res, next) => {
    console.log(`Original Method: ${req.method}, Overridden Method: ${req.originalMethod}, Path: ${req.path}`);
    next();
});



//execute Route
app.use('/items', itemRoutes);


app.get('', (req, res) => {
    res.send("For Testing Purposes Only.")
})



app.listen(3000, () => {
    console.log("Serving on Port 3000.")
})