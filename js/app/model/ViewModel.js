define([
    'common'
], function(common) {
    var ViewModel = Backbone.Model.extend({

        defaults: {
            view: null,
            page: -1,
            loading: true
        }
    });

    return ViewModel;
});
