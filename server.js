const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const fileUpload = require('express-fileupload');


const app = express();

//connect db
connectDB();

//Init middleware
app.use(express.json({ extended: false}));

app.use(express.static(path.resolve(__dirname,'client/build')));

app.use(fileUpload());

//define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/master', require('./routes/api/getmaster'));
app.use('/api/auth', require('./routes/api/auth'));
//app.use('/api/upload', require('./routes/api/download'));
//app.use('/api/admin', require('./routes/api/getadmin'));

//production

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static(path.resolve(__dirname,'client/build')));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }
  
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));