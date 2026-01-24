const app = require("./src/app");


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
process.on("SIGINT", (err) => {
    server.close(() => {
        console.log("Process terminated");
        process.exit(0);
    });
});