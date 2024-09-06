const express = require('express');
const mysql = require('mysql2');

const port = 3000;
const app = express();

const connection = mysql.createConnection({
    host: "mysqlDb",
    user: "root",
    password: "root",
    database: "full-cycle-db"
});

const query = 'INSERT INTO people (name, email) VALUES ("Full Cycle", "fullcycle@gmail.com")'
connection.query(query)

app.get('/', (req, res) => {
    connection.query('SELECT * FROM people', (err, results) => {
        const people = results.map(person => ({
                name: person.name,
                email: person.email
        }))

        const fullCycleCompleteBody =`
            <h1>Full Cycle</h1>
            <h2>People</h2>
            <ul>
                ${people.map(person => `<li>${person.name} - ${person.email}</li>`).join('')}
            </ul>`
        connection.end();
        res.send(fullCycleCompleteBody);
    });
});

app.listen(port, () => {
    console.log(`listening on port ${port}!`);
});
