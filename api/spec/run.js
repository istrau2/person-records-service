/**
 * Created by istrauss on 10/16/2016.
 */

require('aurelia-polyfills');
const di = require('aurelia-dependency-injection');
const Jasmine = require('jasmine');

const rootContainer = new di.Container();
rootContainer.makeGlobal();

const jasmine = new Jasmine();
jasmine.loadConfigFile('jasmine.json');
jasmine.execute();
