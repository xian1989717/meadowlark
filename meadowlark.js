let express = require('express');
let app = express();
let handlebars = require('express3-handlebars').create({
    defaultLayout: 'main',
    helpers: {
        section: function(name, options) {
            if (!this._sections) {
                this._sections = {};
            }
            this._scctions[name] = options.fn(this);
            return null;
        }
    }
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);


let fortunes = [
    'Conquer', 'Rivers', 'Do not', 'You', 'Whenever'
];

function getWeatherData() {
    return {
        locations: [{
            name: 'Portland'
        }, {
            name: 'Wood'
        }, {
            name: 'Jack'
        }, {
            name: 'Rose'
        }, ]
    }
}



let data = [
    { name: 'peter' }, { name: 'jack' }, { name: 'wood' }, { name: 'rose' }
]

app.use((req, res, next) => {
    if (!res.locals.partials) {
        res.locals.partials = {};
    }
    res.locals.partials.weather = getWeatherData();
    next();
});

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    let randomFortunes = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', { fortunes: randomFortunes });
});

app.get('/foo', (req, res) => {
    res.render('foo', { layout: 'microsite' });
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