const moduleLoader = require("./module-json-loader");

const coreModuleName = "Carp::Heavy";
const moduleName = "Path::Tiny";

const moduleDeps = moduleLoader(moduleName);
const moduleDeps2 = moduleLoader(moduleName);

console.log(moduleDeps2);