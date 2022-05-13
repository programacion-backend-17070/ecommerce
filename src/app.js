module.exports = (async () => {
  const express = require('express');
  const path = require('path')
  const http = require('http')
  const mongoose = require("mongoose")
  const cookieParser = require("cookie-parser")
  const session = require("express-session")
  const MongoStore = require("connect-mongo")
  const passport = require('passport')
  const flash = require('express-flash')

  const templateEngine = require('./engine')
  const { mongoConfig } = require("./config")
  const initializePassport = require("./passport/local")
  
  const homeRouter = require("./routes/home.route")
  const loginRouter = require("./routes/login.route")
  const adminRouter = require("./routes/admin.route")
  const apiProductsRouter = require("./routes/api.products.route")
  const apiCartRouter = require("./routes/api.cart.route")
  const apiUserRouter = require("./routes/api.user.route")
  const apiSmsRouter = require("./routes/api.sms.route")

  const { HOSTNAME, SCHEMA, DATABASE, USER, PASSWORD, OPTIONS } = mongoConfig
  const app = express()
  const server = http.createServer(app)

  const PORT = process.env.PORT || 8080
  const MONGO_URI = `${SCHEMA}://${USER}:${PASSWORD}@${HOSTNAME}/${DATABASE}?${OPTIONS}`
  console.log(MONGO_URI)
  try {
    await mongoose.connect(MONGO_URI)

    initializePassport(passport)

    templateEngine(app)

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(flash())
    app.use(cookieParser("esto es un secreto")) // req.cookies = {}
    app.use(session({
      secret: "secret",
      resave: true,
      saveUninitialized: true,

      store: new MongoStore({
        mongoUrl: MONGO_URI,
        ttl: 24 * 60 * 60,
        expires: 24 * 1000 * 60 * 60,
        autoRemove: "native"
      })
    }))

    app.use(passport.initialize())
    app.use(passport.session())

    app.use("/static", express.static(path.join(__dirname, '../public')))

    app.use("/", homeRouter)
    app.use("/", loginRouter)
    app.use("/admin", adminRouter)

    // API
    app.use("/api/products", apiProductsRouter)
    app.use("/api/cart", apiCartRouter)
    app.use("/api/user", apiUserRouter)
    app.use("/api/sms", apiSmsRouter)

    server.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`))
    return server
  } catch (e) {
    console.log("Error", e)
  }
})()
