define([
    'view/PageBaseView',
    'bigvideojs',
    'common'
], function(PageBaseView) {
    var LandingView = PageBaseView.extend({

        $logo: null,

        BV: null,

        events: {
        },

        initialize: function(options) {
            this._super(options);

            console.log('### VideoView.initialize: ', arguments);

            this.BV = new $.BigVideo({useFlashForFirefox:false, container: this.$el.find('.video'), controls: true});
            this.BV.init();
            this.BV.show('video/MVI_0594.mp4',{ambient:true});

//            $("#big-video-wrap").animate({
//                opacity: 1
//            }, 1000, "linear", function() {
//            });

//            this.$el.append($("#big-video-wrap"));



            this.render();
        },

        render: function() {
            this._super();

            return this;
        },

        play: function() {
            this.BV.getPlayer().play();
        },

        pause: function() {
            this.BV.getPlayer().pause();
        }

    });

    return LandingView;
});
