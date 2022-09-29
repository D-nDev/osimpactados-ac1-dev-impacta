import 'tracing';
import { app } from './main/config/app';

const bootStrap = (): void => {
  try {
    app.listen(process.env.PORT ?? 3002, () => {
      console.log(`EstablishmentMicroservices listening on port ${process.env.PORT ?? 3002}`);
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
