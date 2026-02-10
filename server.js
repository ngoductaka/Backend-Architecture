import app from "./src/app.js";

const PORT = process.env.PORT || 3100;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
process.on("SIGINT", (err) => {
  server.close(() => {
    console.log("Process terminated");
    process.exit(0);
  });
});
