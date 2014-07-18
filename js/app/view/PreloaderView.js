define([
    'view/PageBaseView',
    'common'
], function(PageBaseView) {
    var PreloaderView = PageBaseView.extend({


        initialize: function(options) {
            this._super(options);

            //console.log('### PreloaderView.initialize: ', arguments);

            this.render();
        },

        render: function() {
            this._super();

            return this;
        }

    });

    return PreloaderView;
});
