
const moduleFromDistr = (distr) => distr.replace('-', '::');

const builder = (distributiveName, loader) => {

    const dependecies = {};

    try {
        const {core, deps} = loader(moduleFromDistr(distributiveName));

        if(core) return {};

        for(const dep of deps) {

            dependecies[dep] = buildRecursive(dep, loader);
        }
    } catch(e) {
        console.log(e.message);
    }

    return dependecies;
};

const buildRecursive = (moduleName, loader) => {

    const res = {};

    const {core, deps} = loader(moduleName);

    if(core) return null;

    for(const dep of deps) {
        
        res[dep] = buildRecursive(dep, loader);
    }
    return res;
}

module.exports = builder;