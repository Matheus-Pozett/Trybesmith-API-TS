import 'express-async-errors';
import express from 'express';
import ProductsRouter from './routes/products.routes';
import UserRouter from './routes/user.routes';
import loginRouter from './routes/login.routes';
import globalError from './middleware/globalErrors.middleware';

const app = express();

app.use(express.json());

app.use('/login', loginRouter);
app.use('/products', ProductsRouter);
app.use('/users', UserRouter);
app.use(globalError);

export default app;
