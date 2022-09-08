import { app } from "./main/config/app";

const bootStrap = () => {
  try {
    app.listen(process.env.PORT || 3001, () => {
      console.log(`Server listening on port ${process.env.PORT || 3001}`)
    })
  } catch (err: any) {
    console.log(err.message || "Cannot start server")
  }
}

bootStrap();

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  console.log('Closing http server.');
});
