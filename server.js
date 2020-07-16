const express = require('express');
const app = express();
require('./src/config/config');


app.use(express.static(__dirname + '/dist/BancoDeProductos'));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/BancoDeProductos/index.html'));
});

 
app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto', process.env.PORT);
})