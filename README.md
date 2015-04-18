# Sortes

This bot uses the [Aeneid API](http://aeneid.eu) to reply to mentions on Twitter by posting random lines from Vergil's Aeneid, to perform the "Sortes Vergilianae," a kind of ancient bibliomancy by which people could obtain a fortune from Vergil's epic poem.

The resulting bot is [@LotsByVergil](https://twitter.com/LotsByVergil/).

The bot is invoked by including a colon after it's name, e.g., "@LotsByVergil: What's my fortune?" This allows people to talk about the bot without triggering a response.

## Installation

You'll need NPM, NodeJS, and the twit and request modules:

```sudo npm install --save twit```
```sudo npm install --save request```

You'll also need your Twitter API keys.
1. Log in to Twitter on the web and add your mobile or Google Voice number to your account:
 * Settings > Mobile
 * You can delete it once your keys are generated
2. Visit [Twitter Apps](https://apps.twitter.com/) and create your app keys

For running locally, you can keep a simple shell script (added to .gitignore to ensure it isn't committed) that passes your keys when it executes:


```
#!/path/to/shell
CONSUMER_KEY='…' CONSUMER_SECRET='…' ACCESS_TOKEN='…' ACCESS_TOKEN_SECRET='…' node index.js
```

Replace the ellipses with the keys obtained from Twitter. I named mine `local.sh`.

## Usage

If you build something from this bot, you'll probably deployit through Heroku, and there are some things you should know.

1. You don't need to pay for dynos. One dyno is enough.
2. Heroku scales a web dyno by default, but your Twitter bot will use a single worker dyno. You'll need to scale it yourself on the command line:  
```heroku ps:scale worker=1```
3. You don't want to put your Twitter keys in anything committed. They should be stored as environment variables and added on the command line with the following commands (replacing the ellipses with your Twitter keys):

```
heroku config:set CONSUMER_KEY=…
heroku config:set CONSUMER_SECRET=…
heroku config:set ACCESS_TOKEN=…
heroku config:set ACCESS_TOKEN_SECRET=…
```

Alternatively, you can pull the .env file from Heroku, edit it locally in your editor of choice (it's a hidden file, but a good editor should see it), and then push the new .env file back to Heroku:

```
heroku config:pull
heroku config:push
```