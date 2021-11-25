const distributives = require ("../data/module-distro-map.json");

const getResolver = () => {

    return (moduleName) => {
        const distr =  distributives[moduleName];

        if(distr === undefined) throw new Error(`Distributive not found for module "${moduleName}"`);

        return distr;
    };
};

module.exports = getResolver;