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

            this.BV.getPlayer().on("loadedalldata", function(){
                console.log('LOADED VIDEO');
                //app.player.play();
            });


            this.BV.show('video/loop.mp4', {ambient:true});

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
