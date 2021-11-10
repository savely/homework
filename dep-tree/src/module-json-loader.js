const coreModulesArray =  require("../data/core-modules.json");
const nameResolverModule = require("./module-name-resolver");
const path = require("path");
const fs = require("fs");
const process = require("process");

const metaFileName = "META.json";

const coreModules = coreModulesArray.reduce((acc, moduleName) => {
    acc[moduleName] = true;
    return acc;
}, {});

const cache = {};

const moduleLoader = (moduleName) => {

    if(coreModules[moduleName] !== undefined) return {'core' : true, 'deps' : {}};

    const resolve = nameResolverModule();

    const distrName = resolve(moduleName);

    if(cache[distrName] !== undefined) return {"core" : false, "deps" : cache[distrName]};

    const meta = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", distrName, metaFileName)));

    if(meta["prereqs"] === undefined || meta["prereqs"]["runtime"] === undefined) throw new Error("invalid json schema!");

    const requires = meta["prereqs"]["runtime"]["requires"];

    cache[distrName] = Object.keys(requires);

    return {"core" : false, deps : cache[distrName]};
};

module.exports = moduleLoader;