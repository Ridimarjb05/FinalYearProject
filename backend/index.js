const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./routes/AuthRouter');
const UserRouter = require('./routes/UserRouter');
const ProductRouter = require('./routes/ProductRouter');
const PartyRouter = require('./routes/PartyRouter');
const ImageRouter = require('./routes/ImageRouter');
const TransactionRouter = require('./routes/TransactionRouter');
const HistoryRouter = require('./routes/HistoryRouter');
const InvoiceRouter = require('./routes/InvoiceRouter');
const PurchaseRouter = require('./routes/PurchaseRouter');
const ExpenseRouter = require('./routes/ExpenseRouter');
const AccountRouter = require('./routes/AccountRouter');
const VatBillRouter = require('./routes/VatBillRouter');
const ReportsRouter = require('./routes/ReportsRouter');


const connectDB = require('./config/db');

require('dotenv').config();

const PORT = process.env.PORT || 8080;

connectDB();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());

app.use('/auth', AuthRouter);
app.use('/users', UserRouter);
app.use('/products', ProductRouter);
app.use('/parties', PartyRouter);
app.use('/images', ImageRouter);
app.use('/transactions', TransactionRouter);
app.use('/history', HistoryRouter);
app.use('/invoices', InvoiceRouter);
app.use('/purchases', PurchaseRouter);
app.use('/expenses', ExpenseRouter);
app.use('/accounts', AccountRouter);
app.use('/vat_bills', VatBillRouter);
app.use('/reports', ReportsRouter);



app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.listen(PORT, () => {
})
