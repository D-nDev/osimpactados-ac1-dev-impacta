import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import PublicPurchaseRoutes from '../routes/public/PublicPurchaseRoutes';
import PrivatePurchaseRoutes from '../routes/private/PrivatePurchaseRoutes';
import mercadopago from 'mercadopago';

mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESSTOKEN as unknown as string,
});

/* const preference = {
  items: [
    {
      title: 'Meu produto',
      unit_price: 1,
      quantity: 1,
    },
  ],
}; */

/* mercadopago.preferences
  .create(preference)
  .then(function (response) {
    // Este valor substituirá a string "<%= global.id %>" no seu HTML
    console.log(response);
    global.id = response.body.id;
  })
  .catch(function (error) {
    console.log(error);
  });

/* mercadopago.payment.update({ id: 1309430620, status: 'approved' }, {}, () => {
  console.log('ok');
}); */

dotenv.config();

const corsConfig = {
  origin: true,
  credentials: true,
  exposedHeaders: ['set-cookie'],
};

const app = express();
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Set-Cookie');
  res.header('Access-Control-Allow-Origin', process.env.FRONT_URL);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, X-PINGOTHER',
  );
  next();
});
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(compression());
app.use(helmet());

const userRoutes = new PublicPurchaseRoutes();
const privateUserRoutes = new PrivatePurchaseRoutes();

app.disable('x-powered-by');

app.use(cookieParser());
app.use(userRoutes.router);
app.use(privateUserRoutes.router);

export { app };
