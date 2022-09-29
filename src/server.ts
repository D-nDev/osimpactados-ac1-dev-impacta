import 'tracing';
import { app } from './main/config/app';

const bootStrap = (): void => {
  try {
    app.listen(process.env.PORT ?? 3001, () => {
      console.log(`UserMicroservices listening on port ${process.env.PORT ?? 3001}`);
    });
  } catch (err: any) {
    console.log(err.message || 'Cannot start server');
  }
};

bootStrap();

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  console.log('Closing http server.');
});
