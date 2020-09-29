const Express = require('express');
const Helmet = require('helmet');
const Fs = require('fs');

const p = JSON.parse(Fs.readFileSync('private.json'));

const app = Express();

app.use(Helmet());
app.use(function(req, res, next){
  console.log((req.query.k == p.query_k && cfIps.includes(req.ip)));
  console.log(req.ip);
  console.log(req.query.k == p.query_k);
  if (req.get('Authorization') == p.auth || (req.query.k == p.query_k)) {
    next(); // move on to next middleware
  } else {
    res.status(401).end(); // 401 unauthed
  }
});

app.use('/mc', require('./routes/mc'));
app.use('/reddit', require('./routes/reddit'));

app.listen(80, () => {
  console.log(`Server running on port ${80}.`);
});
