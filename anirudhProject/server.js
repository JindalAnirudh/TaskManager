const express = require('express') // Express for routing and middleware management
const path = require('path') // Path to handle file paths
const app = express()
//middleware
const cors=require('cors');
const bodyParser = require('body-parser');
const helmet=require('helmet');
const morgan = require('morgan'); // Logging middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'))
//app.use(helmet());

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://cdnjs.cloudflare.com",
          "https://kit.fontawesome.com",
          "https://cdn.jsdelivr.net",
        ],
        scriptSrcAttr: ["'self'", "'unsafe-inline'"], // ✅ Allow inline event handlers
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://cdnjs.cloudflare.com",
          "https://fonts.googleapis.com",
          "https://cdn-uicons.flaticon.com",
          "https://cdn.jsdelivr.net" // ✅ Allow Bootstrap
        ],
        fontSrc: [
          "'self'",
          "https://fonts.gstatic.com",
          "https://cdnjs.cloudflare.com",
          "https://cdn-uicons.flaticon.com",
          "https://ka-f.fontawesome.com",
        ],
        imgSrc: ["'self'", "data:", "https://cdn.jsdelivr.net"],
        connectSrc: [
          "'self'",
          "https://ka-f.fontawesome.com",
          "https://cdn.jsdelivr.net",
        ],
        objectSrc: ["'none'"],
        frameSrc: [
          "'self'", 
          "https://www.google.com"
        ],
      },
    },
    crossOriginEmbedderPolicy: false,
    referrerPolicy: { policy: "no-referrer" },
    frameguard: { action: "deny" },
    dnsPrefetchControl: { allow: false },
    hidePoweredBy: true,
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
    ieNoOpen: true,
    noSniff: true,
    xssFilter: true,
  })
);


const PORT = 3000

// Import middlewares
const logger = require('./middlewares/logger') // Import logger middleware
const errorHandler = require('./middlewares/errorHandler') // Import error handler middleware
// Middleware to handle JSON and URL-encoded data in POST requests
app.use(express.json()) // To parse JSON bodies
app.use(express.urlencoded({ extended: true })) // To parse URL-encoded data
// Use logger middleware for all incoming requests
app.use(logger) // Log each request
// Serve static files (HTML, CSS, JS) from the /public directory

// app.use(express.static(path.join(__dirname, 'hospital website')))
//
app.use(express.static(path.join(__dirname, 'public')))

// app.use(express.static(path.join(__dirname, 'Hospital-project backend')))

// Import API routes from apiRoutes.js
const apiRoutes = require('./api/apiRoutes') // Import the API routes for login and register functionality
app.use('/api', apiRoutes) // Mount the API routes on /api path
// Serve login.html at the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'singlepage-main', 'login.html')) // Serve the login page at root URL
})
// Serve dashboard.html when user is authenticated
app.get('/api/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'singlepage-main', 'index.html')) // Serve the dashboard HTML file
})
app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'singlepage-main', 'index.html')) // Serve the dashboard HTML file
})

// Serve register.html when user needs to register
app.get('/api/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'singlepage-main', 'register.html')) // Serve the register HTML file
})
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'singlepage-main', 'register.html')) // Serve the register HTML file
})
// Serve login.html at the root URL
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'singlepage-main', 'login.html')) // Serve the register HTML file
})
// Use error handler middleware for catching and handling errors
app.use(errorHandler) // Handle errors globally
// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})