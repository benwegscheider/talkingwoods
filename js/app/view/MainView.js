define([
    'view/BaseView',
    'view/OverView',
    'model/DisplayModel',
    'model/StateModel',
    'common'
], function(BaseView, OverView, DisplayModel, StateModel) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            "/info": "changeToInfoView",
            "/project/:id": "changeToProject",
            "*actions": "defaultRoute" // matches http://example.com/#anything-here
        }
    });


    var MainView = BaseView.extend({

        el: 'body',
        overView: null,

        initialize: function(options) {
            this._super();

            console.log('### Main.initialize: ', arguments);

            this.appRouter = new AppRouter();
            this.appRouter.on('route:changeToInfoView', this.routerChangeToInfo);
            this.appRouter.on('route:changeToProject', this.routerToProject);
            this.appRouter.on('route:defaultRoute', this.routerDefault);

            this.displayModel = new DisplayModel();
            this.stateModel = new StateModel();

            $(window).resize(this.onResize);
            this.onResize();

            this.overView = new OverView({el:this.el, displayModel:this.displayModel, stateModel:this.stateModel});

            this.render();
        },

        render: function() {

            return this;
        },

        onResize: function() {
            var w = $(window).width();
            var h = $(window).height();

            this.displayModel.set('width', w);
            this.displayModel.set('height', h);
            this.displayModel.set('ar', (w/h));

        },

        routerToProject: function() {

        },

        routerChangeToInfo: function() {

        },

        routerDefault: function() {
            this.stateModel.set('status', 'start');
        }



    });

    return MainView;
});
