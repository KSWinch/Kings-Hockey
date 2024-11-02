import app from "./app.js";

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
