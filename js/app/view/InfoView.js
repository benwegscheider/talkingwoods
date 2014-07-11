define([
    'view/BaseView',
    'common'
], function(BaseView) {
    var InfoView = BaseView.extend({

        events: {
            'click #closeInfo': 'closeInfo'
        },

        initialize: function(options) {
            this._super(options);

            console.log('### InfoView.initialize: ', arguments);

            this.render();
        },

        render: function() {
            this._super();

            return this;
        },


        in: function() {

        },

        out: function() {

        },

        closeInfo: function() {
            this.stateModel.set('info', 0);

            return false;
        }

    });

    return InfoView;
});
