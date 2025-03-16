const app = require("./app");
const dbConnection = require("./src/configs/dbConnection.config");
const config = require("./src/configs/config");

dbConnection();

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
