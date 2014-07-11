(function() {
    var extend = function(_, Backbone) {
        var functions = {
            autoBind: function() {
                var self = this,
                    funcs = _.functions(this.constructor.prototype),
                    protoFuncs = ['autoBind', 'constructor', 'render'].concat(
                        _.functions(Backbone.Collection.prototype),
                        _.functions(Backbone.Model.prototype),
                        _.functions(Backbone.View.prototype),
                        _.functions(Backbone.Router.prototype)
                    );

                _.each(funcs, function(f) {
                    if (f.charAt(0) !== '_' && _.indexOf(protoFuncs, f) === -1) {
                        self[f] = _.bind(self[f], self);
                    }
                });
            }
        };

        _.each('Collection,Model,View,Router'.split(','), function(component) {
            _.extend(Backbone[component].prototype, functions);
        });
    };

    if (typeof define === 'function' && define.amd) {
        define(['underscore', 'backbone'], function(_, Backbone) {
            return extend(_, Backbone);
        });
    }
    else {
        extend(_, Backbone);
    }

})();
