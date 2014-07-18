define([
    'view/BaseView'
], function(BaseView) {
    var PageBaseView = BaseView.extend({

        initialize: function(options) {
            this._super(options);

            this.displayModel.on('change:width', $.proxy(this.render, this));
            this.displayModel.on('change:height', $.proxy(this.render, this));

            this.render();
        },

        render: function() {
            ////console.log('PageBaseView -> resize');
            var w = this.displayModel.get('width');
            var h = this.displayModel.get('height');
            this.$el.width(w);
            this.$el.height(h);

            return this;
        },

        dispose: function() {
            this.displayModel.off('change:width', this.render);
            this.displayModel.off('change:height', this.render);
        }


    });

    return PageBaseView;
});
