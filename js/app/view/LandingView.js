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

            //console.log('### VideoView.initialize: ', arguments);

            this.BV = new $.BigVideo({useFlashForFirefox:false, container: this.$el.find('.video'), controls: true});
            this.BV.init();

            var that = this;

            this.BV.getPlayer().on("loadedalldata", function(){
//                that.stateModel.set('startVideoLoading', false);
//
//                if (!that.stateModel.get('imagesLoading')) {
//                    that.stateModel.set('loading', false);
//                }
                //app.player.play();
            });

            var video = 'video/loop.mp4';

            if (navigator.userAgent.search("Firefox")) {
                video = 'video/loop.ogv';
            }


            this.BV.show(video, {ambient:true});

//            videojs("example_video_1").ready(function(){
//                var myPlayer = this;
//
//                // EXAMPLE: Start playing the video.
//                myPlayer.play();
//
//            });


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
