const express = require("express");
const html_routes = require("./routes/html-routes");
const api_routes = require("./routes/api-routes");
const PORT = process.env.PORT || 3001;
// dynamically set the port
const app = express();

// Express middleware will always run the operation in the order from top to bottom "order matters"
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(html_routes);
app.use(api_routes);

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
