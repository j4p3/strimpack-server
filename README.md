# Strimpack

*Web server for strimpack service.*

Express server rendering React app, authenticating requests, & processing payments.


## npm commands:

* start:
* sync:
* seed:
* build:
* serve:

## config

### .env
Expects env vars:
NODE_ENV
TWITCH_CLIENT_ID
TWITCH_CLIENT_SECRET
TWITCH_CALLBACK_URI
DB_USER
DB_PASSWORD
DB_NAME
DB_HOST
DB_PORT
POSTGRES_USER
POSTGRES_PASSWORD
POSTGRES_DB
SERVER_HOST
SERVER_PORT
SESSION_SECRET
STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY

### config.json
A convenient place to store config options to avoid hitting the DB for them every request. See `config.default.json` for full example.

```
{
  "title":
  "description":
  "channel": <Twitch.tv channel name>
  "navItems":
      "text": <what the nav link should say>
      "href": <where the nav link should go>
    }],
  "logo": <name of logo file e.g. logo.png>
  "themeColor": <hex or rgba value e.g. #fff>
  "subscriptionTiers":
    {
      "level": <arbitrary number to differentiate tiers>
      "stripe_id": <corresponds to Stripe plan ID>
      "title":
      "cost": <corresponds to Stripe plan cost>
    }]
}
```

## made with:

* node
* express
* babel
* passport
* postgres/sequelize
* react
* stripe