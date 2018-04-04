const express = require("express");
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./Chinook_Sqlite_AutoIncrementPKs.sqlite");
const app = express();
const handlebars = require("express-handlebars").create({ defaultLayout: 'main' });
const bodyparser = require("body-parser");



app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

app.listen(3000, () => {
    console.log("Server is running on port 3000")
});

const query = 
`SELECT Album.Title AS Album, Artist.Name AS Artist 
FROM "Album" 
INNER JOIN "Artist" 
ON Album.ArtistId = Artist.ArtistId`;

let data = [];

db.each(query, (err, row) => {
    if (err) throw err;
  data.push(row);
  console.log(row);
  }),

app.get('/', (req, res) => {
    res.render('albums', {albums: data})
});


app.post('/albums', (req, res) => {
    let variable = db.prepare('insert into "Artist" (Name) values (?)')
    variable.run(req.body.name, (err) => {
        if (err) next (err)
        res.send("Artists Submitted");
    })
})
