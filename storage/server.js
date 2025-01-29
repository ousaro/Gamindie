const express = require('express');
const path = require('path');

const app = express();

// Serve the 'uploads' folder as static
app.use('/uploads', express.static(path.resolve('../uploads')));


app.listen(3000, () => console.log('Server running on port 3000'));
