const express = require("express");
const connection = require("./config/connection");

const routes = require("./routes");

// import sequelize connection
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
const start = async () => {
  try {
    await connection.sync({ force: false });

    console.log(`[INFO]: DB connection successful`);

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(`[ERROR]: DB connection failed | ${error.message}`);
  }
};

start();
