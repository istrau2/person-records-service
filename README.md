# person-records-service

## Getting started

Before you start, make sure you have a recent version of [NodeJS](http://nodejs.org/) environment *>=6.0*.

From the project folder, execute the following commands:

```shell
npm install
cd person-recrods-service
npm run start
```

The server should now be running on localhost:1337

## Running the unit tests

Before you can run the unit tests you need to install jasmine-node globally:

```shell
npm install jasmine-node -g
```

Then run the tests:
```shell
npm run test
```

## Understanding the project

This is a sailsJS webserver. Most of the code is boilerplate sails code.
Please note the following:

1. config/routes - this sets up the routing (see http://sailsjs.org/documentation/concepts/routes for more info.)
2. api/controllers contains the RecordController referenced in the routes.
3. api/services contains most of the business logic.
4. api/hooks contains a hook that seeds the db on startup.
5. config/connections sets the db as sails-disk (which is available out of the box)
6. api/spec contains the unit tests.
7. api/mocks contains any mocks (used in testing).
8. aurelia-dependency-injection is used for di. See app.js for setup.
