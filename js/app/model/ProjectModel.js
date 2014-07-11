define([
    'common'
], function(common) {
    var ProjectModel = Backbone.Model.extend({

        defaults: {
            slide: 0
        }
    });

    return ProjectModel;
});
