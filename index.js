const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const routerAuth = require('./routers/authRoute');
const routerUser = require('./routers/userRoute');
const routerAdmin = require('./routers/adminRoute');
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin : "http://localhost:3001", credentials : true}));

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads/rar/')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads/thumbnail/')));

// auto update limit user download


app.use(session({
  name: process.env.COOKIE, // Nama sesi cookie
  secret: process.env.SECRET_KEY,     // Kunci rahasia untuk penandatanganan sesi
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,    // Atur ke true jika hanya menggunakan HTTPS
    httpOnly: true,   // Tidak dapat diakses oleh JavaScript di sisi klien
    maxAge: 3600000,  // Waktu kadaluarsa dalam milidetik (contoh: 1 jam)
    sameSite: 'strict' // Atur ke 'strict' untuk keamanan sesi yang lebih tinggi
  }
}));

routerAdmin(app);
routerAuth(app);
routerUser(app);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
