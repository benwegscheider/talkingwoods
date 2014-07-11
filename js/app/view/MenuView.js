define([
    'view/PageBaseView',
    'common'
], function(PageBaseView) {
    var MenuView = PageBaseView.extend({

        events: {
            'click .menuBtn': 'clickMenu',
            'click': 'hideMenu'
        },

        initialize: function(options) {
            this._super(options);

            console.log('### MenuView.initialize: ', arguments);

            this.stateModel.on('change:menu', this.onChangeMenu);
            this.stateModel.on('change:status', this.onStatusChange);

            this.render();
        },

        render: function() {
            this._super();

            return this;
        },

        clickMenu: function(e) {
            console.log("click menu: "+ $(e.target).html());

            var btn = $(e.target).html();

            if (btn == 'Projekte') {
                this.stateModel.set('status', 'projekte');
                this.stateModel.trigger('status');
                this.stateModel.set('menu', false);

                this.stateModel.set('project', 0);
                this.stateModel.trigger('project');
            }

            else if (btn == 'Video') {
                this.stateModel.set('status', 'video');
                this.stateModel.set('menu', false);
            }

            else if (btn == 'Informationen') {
                this.stateModel.set('status', 'info');
                this.stateModel.set('menu', false);
            }

            else if (btn == 'Talking Woods') {
                this.stateModel.set('status', 'start');
                this.stateModel.set('project', 0);
            }

            return false;
        },

        onChangeMenu: function() {

            if (this.stateModel.get('menu') == 1) {

                console.log("STATUS: "+this.stateModel.get('status'));
                if (this.stateModel.get('status') != 'start' && this.stateModel.get('status') != 'video') {
                    TweenMax.to(this.$el, 0.3, {backgroundColor: 'rgba(255, 255, 255, 1)', opacity: 1, ease: Cubic.easeInOut});

                }
                else {
                    console.log("NONE");
                    TweenMax.to(this.$el, 0.3, {backgroundColor: 'none', opacity: 1});

                }
            }
        },

        hideMenu: function() {

            if (this.stateModel.get('status') != 'start') {
                this.stateModel.set('menu', 0);
            }

        },

        onStatusChange: function() {
            console.log("STATUS: "+this.stateModel.get('status'));
            if (this.stateModel.get('status') != 'start' && this.stateModel.get('status') != 'video') {
                TweenMax.to(this.$el, 0.3, {backgroundColor: 'rgba(255, 255, 255, 1)', opacity: 1, ease: Cubic.easeInOut});

            }
            else {
                console.log("NONE");
                TweenMax.to(this.$el, 0.3, {backgroundColor: 'none', opacity: 1});

            }
        }
    });

    return MenuView;
});
