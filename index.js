const express = require('express');
const app = express();
const path = require('path')
const port = 3000;

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(express.static('public/img'));



app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(`Memory game app listening at http://localhost:${port}`);
});
