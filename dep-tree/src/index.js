
const path = require("path");
const loaderResolver = require("./module-json-loader");
const builder = require("./dependency-builder");


const coreModuleName = "Carp::Heavy";
const moduleName = "Path::Tiny";
let distrName = 'Package-Stash';
distrName = 'Moose';

console.log(__dirname);


console.log(builder(distrName, loaderResolver(path.join(__dirname, '..', 'data'))));