define([
    'view/PageBaseView',
    'common'
], function(PageBaseView) {
    var VideoView = PageBaseView.extend({

        $logo: null,

        video: null,

        events: {
        },

        initialize: function(options) {
            this._super(options);

            console.log('### VideoView.initialize: ', arguments);


            this.video = videojs("talkingwoods-full", {}, function(){
                // Player (this) is initialized and ready.
            });

            this.render();
        },

        render: function() {
            this._super();

            return this;
        },

        play: function() {
            this.video.play();
        },

        pause: function() {
            this.video.pause();
            if (this.video.currentTime() != 0) {
                this.video.currentTime(0);
            }
        }


    });

    return VideoView;
});
