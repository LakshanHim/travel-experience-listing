// const express = require('express');
// const app = express();
// const cors = require('cors');
// const controller = require("./controller");

// app.use(cors());

// app.use(
//     express.urlencoded({
//         extended: true,
//     })
// );

// app.use(express.json());

// // GET users
// app.get("/users", (req, res) => {
//     controller.getUsers((error, result) => {
//         if (error) {
//             res.status(500).json({ message: error.message });
//         } else {
//             res.json(result);
//         }
//     });
// });

// // CREATE user
// app.post("/createusers", (req, res) => {
//     controller.addUser(req.body, (error, result) => {
//         if (error) {
//             res.status(500).json({ message: error.message });
//         } else {
//             res.json(result);
//         }
//     });
// });

// // UPDATE user
// app.put("/updateusers", (req, res) => {
//     controller.updateUser(req.body, (error, result) => {
//         if (error) {
//             res.status(500).json({ message: error.message });
//         } else {
//             res.json(result);
//         }
//     });
// });

// // DELETE user
// app.delete("/deleteusers", (req, res) => {
//     controller.deleteUser(req.body, (error, result) => {
//         if (error) {
//             res.status(500).json({ message: error.message });
//         } else {
//             res.json(result);
//         }
//     });
// });

// module.exports = app;