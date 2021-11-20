const express = require('express');
const app = express();
const router = express.Router();
const db = require("./db.json");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", (req, res) => {
    res.send({
        message: "Hello"
    })
})

app.get("/users", (req, res) => {
    res.send(200, db);
})
app.get("/user/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.status(400).send({
            message: "nope..."
        });
    } else {
        const user = db.find(user => user.id == req.params.id);
        if (user) {
            res.status(200).send(user)
        } else {
            res.status(400).send({
                message: "user Not found.."
            });
        }
    }
})

app.post("/users", (req, res) => {
    const saveData = {
        id: new Date().getTime(),
        full_name: req.body.full_name,
        country: req.body.country,
        email: req.body.email,
        created_at: new Date()
    }
    db.push(saveData);
    res.send(saveData);
})

app.patch("/users/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.status(400).send({
            message: "nope"
        });
    } else {
        const user = db.find(user => user.id == req.params.id);
        if (user) {
            Object.keys(req.body).forEach(key => {
                user[key] = req.body[key];
            })
            res.send(200, user);
        } else {
            res.status(200).send([
                message = "User nof found"
            ])
        }
    }
})

app.delete("/users/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.send(400, {
            message: "İşlenemeyen veri..."
        });
    } else {
        const userIndex = db.findIndex(u => u.id == req.params.id); // undefined
        if (userIndex > -1) {
            db.splice(userIndex, 1);
            res.status(201).send({
                message: "Kullanıcı Silindi.."
            });
        } else {
            res.status(400).send({
                message: "Kullanıcı bulunamadı.."
            });
        }
    }
});

app.listen(process.env.PORT || 8000, () => {
    console.log("Sunucu ayaktadır.. Çalışıyor...");
});