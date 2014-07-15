define([
    'view/PageBaseView',
    'utils/GestureManager',
    'common'
], function(PageBaseView, GestureManager) {
    var MenuView = PageBaseView.extend({

        gestureManager: null,

        events: {
            'click .menuBtn': 'clickMenu',
            'click': 'hideMenu'
        },

        initialize: function(options) {
            this._super(options);

            console.log('### MenuView.initialize: ', arguments);

//            this.gestureManager = new GestureManager({$el: this.$el, autoEnable: true, autoStart: true});
//            this.gestureManager.on('gesture', this.onGesture);

            this.stateModel.on('change:menu', this.onChangeMenu);
//            this.stateModel.on('change:status', this.onStatusChange);

            this.render();
        },

        render: function() {
            this._super();

            return this;
        },


        onGesture: function(type, direction, $target) {
            var that = this;

            if (this.stateModel.get('status') == 'start') {
                if (type == 'down') {
                    if (!this.animatingDown) {
                        this.animatingDown = true;

                        this.stateModel.set('status', 'projekte');
                        this.stateModel.set('menu', false);


                        setTimeout(function() {that.animatingDown = false;}, 1000 );
                    }
                }
                else if (type == 'up') {
                    if (!this.animatingDown ) {
                        this.animatingDown = true;

                        setTimeout(function() {that.animatingDown = false;}, 1000 );
                    }
                }
            }


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

            else if (btn == 'Film') {
                this.stateModel.set('status', 'video');
                this.stateModel.set('menu', false);
            }

            else if (btn == 'Idee') {
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

                $('body').removeClass('left').removeClass('right');

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
