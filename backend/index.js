const express = require('express'); 
const app = express(); 
const mainRouter = require('routes/index.js'); 
const cors = require('cors'); 
const port = 3000; 

app.use(cors()); 
app.use('/api/v1', mainRouter); 
app.listen(port); 