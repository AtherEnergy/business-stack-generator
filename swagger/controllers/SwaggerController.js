var swaggerConfig = sails.config.swagger;

function deepEach(obj, action) {
    if (typeof (obj) == 'object') {
        _.each(obj, function (value, key) {
            action(value, key);
            deepEach(value, action);
        });
    }
}

function swaggerJson(req, res, predicate) {
    var swaggerJsonObj = sails.config.globals.swaggerJsonObj

    if (swaggerJsonObj == null) {
        res.status(500).json({
            status: 'failure',
            message: 'Swagger JSON is still not set, try again later'
        });
    } else {

        //filter out routes
        var paths = _.pickBy(swaggerJsonObj.paths, predicate);

        //filter out models
        // look through paths for "$ref" key whose value begins with "component/schemas", store only everything after "component/schemas"
        // make this into a Set 
        var usedSchemas = new Set();
        var prefix = '#/components/schemas/';
        deepEach(paths, function (value, key) {
            if (key == '$ref') {
                if (value.startsWith(prefix)) {
                    var schema = value.replace(prefix, '');
                    usedSchemas.add(schema);
                }
            }
        });

        var components = swaggerJsonObj.components;
        var schemas = _.pickBy(components.schemas,
            function (value, key) {
                return usedSchemas.has(key);
            }
        );
        components = { ...components, schemas };

        //filter out empty routes
        var usedTags = new Set();
        _.each(paths, function (value, key) {
            if (value.tags) {
                _.each(value.tags, function (t) {
                    usedTags.add(t)
                });
            }
        });

        var tags = _.pickBy(swaggerJsonObj.paths, function (tag) {
            return usedTags.has(tags);
        });

        res.json({ ...swaggerJsonObj, components, tags, paths })
    }
}

module.exports = {

    jsonDisplay: function (req, res) {
        var name = req.params.name;
        if (name != 'all') {
            var filterSet = swaggerConfig[name];
            if (filterSet) {
                return swaggerJson(req, res, function (pathObj, path) {
                    return filterSet.has(path);
                });
            } else {
                console.log("Missing swagger configuration for " + JSON.stringify(name))
                return res.notFound();
            }
        } else {
            return swaggerJson(req, res, function (pathObj, path) {
                return true;
            });
        }
    },

    docsDisplay: function (req, res) {
        var name = req.params.name;
        return res.view('docs/swagger', {
            templateName: '../swagger/' + name,
            layout: false,
        })
    }

}