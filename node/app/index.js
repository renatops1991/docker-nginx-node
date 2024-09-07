const express = require('express');
const mysql = require('mysql2/promise');

const port = 3000;
const app = express();

app.get('/', async (req, res) => {
    try {
        const connection = await mysql.createConnection({
            host: "mysqlDb",
            user: "root",
            password: "root",
            database: "full-cycle-db"
        });

        await connection.query('INSERT INTO people (name, email) VALUES ("Full Cycle", "fullcycle@gmail.com")');
        const [people] = await connection.query('SELECT * FROM people');

        const fullCycleCompleteBody = `
            <h1>Full Cycle</h1>
            <h2>People</h2>
            <ul>
                ${people.map(person => `<li>${person.name} - ${person.email}</li>`).join('')}
            </ul>`;

        res.send(fullCycleCompleteBody);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


app.listen(port, () => {
    console.log(`listening on port ${port}!`);
});

