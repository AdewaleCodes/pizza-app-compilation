//require database
const app = require('./index')
const Database = require('./database');

const PORT = process.env.PORT || 3500

//connect to database
Database.connect ();

app.listen(PORT, () =>{
    console.log('connecting to port,',PORT)
})