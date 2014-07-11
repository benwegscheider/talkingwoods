define([
    'common'
], function(common) {
    var BaseView = Backbone.View.extend({

        displayModel: null,
        stateModel: null,

        appRouter: null,

        initialize: function(options) {
            this.autoBind();

            if(options && options.displayModel) {
                this.displayModel = options.displayModel;
            }

            if(options && options.stateModel) {
                this.stateModel = options.stateModel;
            }
//
//            if(options && options.appRouter) {
//                this.appRouter = options.appRouter;
//            }
        }

    });

    return BaseView;
});
