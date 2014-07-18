define([
    'common'
], function(common) {
    var StateModel = Backbone.Model.extend({

        defaults: {
            status: "start", // start, video, projekte, info
            loading: true,
            menu: true,
            project: 0,
            inproject: false,
            currentView: null,
            imagesLoading: true,
            startVideoLoading: true
        }
    });

    return StateModel;
});
