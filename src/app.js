import ratelimit from 'express-rate-limit';
import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import fs from 'fs';

dotenv.config(); // Add keys/private data to process.env

// Import routes
import routeRedditGimme from './routes/reddit/gimme.js';

import routeMinecraftStatus from './routes/mc/status.js';
import routeMinecraftFavicon from './routes/mc/favicon.js';
import routeMinecraftCard from './routes/mc/card.js';
import routeMinecraftAchieve from './routes/mc/achievement.js';
import routeMinecraftSplash from './routes/mc/splash.js';

function keyGenerator(req) { // Handles requests coming through cloudflare as the default keygen would mess up here
  let cfConnecting = req.get('CF-Connecting-IP');

  if (cfConnecting) {
    return cfConnecting;
  } else {
    return req.ip;
  }
}

function limitHandler(req, res) { // Handler for if/when a rate limit is reached
  res.status(429).json({
    success: false,
    message: 'Too many requests! You have hit the rate limit.',
    limit: req.ratelimit.limit,
    current: req.ratelimit.current,
    remaining: req.ratelimit.remaining
  });
}

function skipHandler(req, res) { // Tell rate limiter whether to ignore that req or not
  return (process.env.BYPASS == req.get('Authorization'));
}

function makeRateLimit(limit, per) { // Function for easily adding a ratelimit, simply for ease of use
  return ratelimit({
    windowMs: per*1000,
    max: limit,
    keyGenerator: keyGenerator,
    skip: skipHandler,
    handler: limitHandler
  });
}

const app = express();

// Load middleware
app.use(helmet());

// Load routes
app.use('/reddit/gimme', routeRedditGimme);

app.use('/mc/mcstatus', routeMinecraftStatus);
app.use('/mc/favicon', routeMinecraftFavicon);
app.use('/mc/statuscard', routeMinecraftCard);
app.use('/mc/achievement', routeMinecraftAchieve);
app.use('/mc/splash', routeMinecraftSplash);

app.get('/', (req, res) => {
  res.status(200).json({
    'Hello There!': 'GENERAL KENOBIIIIIIIII',
    'documentation': 'https://github.com/Villager-Dev/Villager-API'
  });
});

app.use((req, res) => { // Handle 404s, must be last to work
  res.status(404).json({message: 'Endpoint not found or method not supported for this endpoint'});
});

app.listen(process.env.PORT, () => { // Run the app
  console.log(`Server running on port ${process.env.PORT}.`);
});
