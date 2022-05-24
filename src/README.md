# SnapClass

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.3.

## Database setup

Run `apt-get update -y`
Run `apt-get install mariadb-server`
### For macOS run `brew services start mariadb `
### To create database and tables:
Run `sudo mysql -u root snapclass < snapclass.sql`
### To insert mock data in the snapclass db after running previous command:
Run `sudo mysql -u root snapclass < mockdata.sql`
### Check tables:
Run `sudo mysql -u root -p snapclass`
#### In mysql :
Run `SELECT * FROM table_name_here`

## Build

Run `npm install express --save`
Run `npm install body-parser --save`
Run `npm install mysql-json --save`

Run `ng build` to build the project. The build artifacts will be stored in the `dist/snapclass-ui/` directory.

## Start server

Run `node server.js`

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Run compodoc for code comment coverage

Run `npm run compodoc` to run compodoc and serve on `localhost:8081`

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
