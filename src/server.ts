import app from "./app";

const PORT: number = parseInt(<string> process.env.PORT) || 5000

app.listen(PORT, () => {
  console.log('Server is listinening')
})