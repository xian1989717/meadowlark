let express = require('express');
let app = express();
let handlebars = require('express3-handlebars').create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);


let fortunes = [
    'Conquer', 'Rivers', 'Do not', 'You', 'Whenever'
];

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    let randomFortunes = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', { fortunes: randomFortunes });
});
app.use((req, res) => {
    res.status(404);
    res.render('404');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), () => {
    console.log('Express started on http://localhost:' + app.get('port') + ';press Ctrl - C to terminate.');
});