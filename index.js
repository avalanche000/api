const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const Database = require("@replit/database");
const db = new Database();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/userAccess", (req, res) => {

});

app.get("/document", (req, res) => {
    if (req.headers.referer == "https://sharkcoding.repl.co/" || req.headers.referer == "https://b57bb65d-fe7c-4f33-9fc0-45d699b4335b.id.repl.co/") res.sendFile(__dirname + "/bypass/script.js");
    else res.send("<h1>Error 404: File not found.</h1>");
});

app.get("/file/*", cors(), (req, res) => {
    let file_path = req.path.slice(6);
    if (file_path.includes("..")) {
        res.send("<h1>That file path is not allowed<h1>");
        return;
    }
    fs.lstat(__dirname + "/files/" + file_path, (err, stat) => {
        if (err) {
            // console.log(err);
            res.send("<h1>Path not found: \"" + file_path + "\"</h1>");
            return;
        }
        if (stat.isDirectory()) {
            fs.readdir(__dirname + "/files/" + file_path, (err, files) => {
                // console.log("DIR");
                let html = "<h3><a href=\"/file/\">/</a>";
                let total = ""
                let dirs = file_path.split("/");
                dirs.forEach((dir, i) => {
                    let idx = dirs.length - 1 - i;
                    if (idx == 0) return;
                    total += dir + (idx == 1 ? "" : " /");
                    html += `<a href="/file/${total}"> ${total}</a>`;
                });
                html += "</h3>";
                let prefix = file_path.endsWith("/") ? "" : "/";
                files.forEach(file => {
                    html += `<a href="/file/${file_path + prefix + file}">${file}</a><br>`;
                });
                res.send(html);
            });
        } else {
            // console.log("FILE");
            res.sendFile(__dirname + "/files/" + file_path);
        }
    });
});

// app.listen(3000, () => {
//     console.log("server started");
// });
