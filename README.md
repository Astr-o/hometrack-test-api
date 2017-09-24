# hometrack-test-api

This is my solution to the Hometrack Interview problem.

[Problem definition](https://github.com/Hometrack/codetest)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* NodeJS 6.11.4+
* Heroku CLI - (Deployment only)

### Installing

Install dependcies

```bash
npm install
```

Run express server locally

```bash
npm start
```

## Running the tests

This project uses mocha to for testing. Install mocha globally to access it directly from the terminal

```bash
npm -g install mocha
```

Then run the test suite using.

```bash
npm test
```

## Deployment

This project is configured to be deployed to heroku for futher instructions see - [Getting Started Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app)

To deploy first login to your heroku account by running the command below and following the prompts

```bash
heroku login
```

Then create a Heroku app for the project

```bash
heroku create
```

This will add the heroku remote configuration to your local git repository, you can deploy by pushing to this remote

```bash
git push heroku master
```

## Built With

* [Express](https://expressjs.com/) - The web framework used

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
