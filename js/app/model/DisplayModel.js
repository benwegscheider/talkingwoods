define([
    'common'
], function(common) {
    var DisplayModel = Backbone.Model.extend({


        defaults: {
            width: -1,
            height: -1,
            scroll: -1,
            ar: -1
        }
    });

    return DisplayModel;
});
