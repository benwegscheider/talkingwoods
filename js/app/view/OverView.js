define([
    'view/BaseView',
    'view/LandingView',
    'view/PreloaderView',
    'view/InfoView',
    'view/ProjectThreadView',
    'view/VideoView',
    'view/MenuView',
    'utils/ImageAssetPreloader',
    'common'
], function(BaseView, LandingView, PreloaderView, InfoView, ProjectThreadView, VideoView, MenuView) {
    var OverView = BaseView.extend({

        preloaderView: null,
        overlayView: null,

        landingView: null,
        playView: null,
        infoView: null,
        projectThreadView: null,
        videoView: null,

        $border: null,

        menuView: null,
        $menuLink: null,

        imageAssetPreloader: null,

        events: {
            'click #menuLink': 'menuLinkClick'
        },

        initialize: function(options) {
            this._super(options);

            console.log('### ViewManagerView.initialize: ', arguments);

            this.preloaderView = new PreloaderView({el:$('#loader'), displayModel:this.displayModel, stateModel:this.stateModel});
            this.preloaderView.$el.fadeIn();

            this.stateModel.set('currentView', this.preloaderView);


            this.imageAssetPreloader = new ImageAssetPreloader();

            var $images = this.$el.find('img');

            for (var i = 0; i < $images.length; i++) {
                var $image = $($images[i]);
                this.imageAssetPreloader.addImageURL($image.attr('src'), $image);
            }

//            $(this.imageAssetPreloader).on('imageloaded', $.proxy(this.onImageLoaded, this));
            $(this.imageAssetPreloader).on('complete', $.proxy(this.onAssetsPreloaded, this));
//            $(this.imageAssetPreloader).on('progress', $.proxy(this.onProgress, this));

            this.imageAssetPreloader.start();


            this.landingView = new LandingView({el:$('#start'), displayModel:this.displayModel, stateModel:this.stateModel});
            this.projectThreadView = new ProjectThreadView({el:$('#projects'), displayModel:this.displayModel, stateModel:this.stateModel});
            this.videoView = new VideoView({el: $('#video'), displayModel:this.displayModel, stateModel:this.stateModel});

            this.menuView = new MenuView({el: $('#menuWrap'), displayModel:this.displayModel, stateModel:this.stateModel})
            this.$menuLink = $('#menuLink');

            this.$border = this.$el.find('#border');

            this.infoView = new InfoView({el:$('#info'), displayModel:this.displayModel, stateModel:this.stateModel});

            this.stateModel.on('change:status', this.statusChange);
            this.stateModel.on('change:menu', this.menuChange);
            this.stateModel.on('change:loading', this.loadingChange);

            this.stateModel.on('change:project', this.onProjectChange);
            this.stateModel.on('change:inproject', this.onInProjectChange);

            this.render();
        },

        render: function() {

            return this;
        },

        statusChange: function() {
            console.log("Overview -> statusChange: "+this.stateModel.get('status'));

            var status = this.stateModel.get('status');

//            if (status == 'start') {
//                if (this.landingView.css('display') == 'block') {
//                    return;
//                }
//                else {
//                    this.stateModel.get('currentView').out();
//
//                }
//                this.stateModel.set('currentView', this.landingView);
//            }
//            else if (status == 'video') {
//                if (this.videoView.css('display') == 'block') {
//                    return;
//                }
//                else {
//                    this.stateModel.get('currentView').out();
//
//                }
//                this.stateModel.set('currentView', this.videoView);
//            }
//            else if (status == 'projekte') {
//                if (this.projectThreadView.css('display') == 'block') {
//                    return;
//                }
//                else {
//                    this.stateModel.get('currentView').out();
//
//                }
//                this.stateModel.set('currentView', this.projectThreadView);
//            }
//            else if (status == 'info') {
//                if (this.infoView.css('display') == 'block') {
//                    return;
//                }
//                else {
//                    this.stateModel.get('currentView').out();
//
//                }
//                this.stateModel.set('currentView', this.infoView);
//            }

            if (status == 'start') {
                $('body').css('overflow', 'none');

                this.landingView.$el.fadeIn(1000);
                this.landingView.play();

                TweenMax.to(this.$border, 1, {borderColor: '#fff', opacity: 1, ease: Linear.easeNone});
                TweenMax.to(this.$border, 1, {autoAlpha: 1, opacity: 1, ease: Linear.easeNone});

                TweenMax.to(this.menuView.$el.find('h1, a'), 0, {css: {color: '#fff'}, opacity: 1, ease: Linear.easeNone});


                if (this.infoView.$el.css('display') == 'block') {
                    this.infoView.$el.fadeOut();
                }


                if (this.projectThreadView.$el.css('display') == 'block') {
                    this.projectThreadView.$el.fadeOut();
                    this.$el.removeClass('left').removeClass('right');
                }

                if (this.videoView.$el.css('display') == 'block') {
                    this.videoView.$el.fadeOut();
                    this.videoView.pause();
                }


            }

            else if (status== 'projekte') {
                $('body').css('overflow', 'none');

                for (var i = 0; i < this.projectThreadView.projects.length; i++) {
                    this.projectThreadView.projects[i].projectModel.set('slide', 0);
                }

                TweenMax.to(this.menuView.$el.find('h1, a'), 0, {css: {color: this.projectThreadView.projects[this.stateModel.get('project')].$el.attr('data-color')}, opacity: 1, ease: Linear.easeNone});

                TweenMax.to(this.projectThreadView.projectIndication.$text, 1, {css: {color: this.projectThreadView.projects[this.stateModel.get('project')].$el.attr('data-color')}, opacity: 1, ease: Linear.easeNone});
                TweenMax.to(this.$menuLink, 1, {css: {color: this.projectThreadView.projects[this.stateModel.get('project')].$el.attr('data-color'), borderColor: this.projectThreadView.projects[this.stateModel.get('project')].$el.attr('data-color')}, opacity: 1, ease: Linear.easeNone});
                TweenMax.to(this.$border, 1, {borderColor: this.projectThreadView.projects[0].$el.attr('data-color'), opacity: 1, ease: Linear.easeNone});
                TweenMax.to(this.$border, 1, {autoAlpha: 1, opacity: 1, ease: Linear.easeNone});


                if (this.landingView.$el.css('display') == 'block') {
                    this.landingView.$el.fadeOut(1000);
                    this.landingView.pause();
                }
                if (this.infoView.$el.css('display') == 'block') {
                    this.infoView.$el.fadeOut();
                }
                if (this.videoView.$el.css('display') == 'block') {
                    this.videoView.$el.fadeOut();
                    this.videoView.pause();
                }

                this.projectThreadView.$el.css('opacity', 0);
                this.projectThreadView.$el.css('display', 'block');

                TweenMax.to(this.projectThreadView.$el, 1, {autoAlpha: 1, opacity: 1, ease: Linear.easeNone});

//                this.projectThreadView.$el.fadeIn();
            }

            else if (status == 'info') {
                this.infoView.$el.fadeIn(1000);
                $('body').css('overflow', 'auto');

                TweenMax.to(this.$menuLink, 1, {css: {color: this.infoView.$el.attr('data-color'), borderColor: this.infoView.$el.attr('data-color')}, opacity: 1, ease: Linear.easeNone});
                TweenMax.to(this.$border, 1, {autoAlpha: 0, opacity: 1, ease: Linear.easeNone});

                TweenMax.to(this.menuView.$el.find('h1, a'), 0, {css: {color: this.infoView.$el.attr('data-color')}, ease: Linear.easeNone});
                TweenMax.to(this.$border, 1, {borderColor: this.infoView.$el.attr('data-color'), ease: Linear.easeNone});

                TweenMax.to(this.infoView.$el.find('h1, p, a'), 0, {css: {color: this.infoView.$el.attr('data-color')}, ease: Linear.easeNone});


//                TweenMax.to(this.$el, 1, {backgroundColor: this.infoView.$el.attr('data-color'), opacity: 1, ease: Linear.easeNone});

                if (this.landingView.$el.css('display') == 'block') {
                    this.landingView.$el.fadeOut();
                    this.landingView.pause();

                }
                if (this.projectThreadView.$el.css('display') == 'block') {
                    this.projectThreadView.$el.fadeOut();
                    this.$el.removeClass('left').removeClass('right');
                }
                if (this.videoView.$el.css('display') == 'block') {
                    this.videoView.$el.fadeOut();
                    this.videoView.pause();
                }

            }

            else if (status == 'video') {
                $('body').css('overflow', 'none');
                var that = this;
                this.videoView.$el.fadeIn(1000, function() {
                    that.videoView.play();

                    if (that.landingView.$el.css('display') == 'block') {
                        that.landingView.$el.fadeOut(1000);
                        that.landingView.pause();
                    }
                    if (that.projectThreadView.$el.css('display') == 'block') {
                        that.projectThreadView.$el.fadeOut();
                        that.$el.removeClass('left').removeClass('right');
                    }
                    if (that.infoView.$el.css('display') == 'block') {
                        that.infoView.$el.fadeOut();
                    }
                });

                TweenMax.to(this.$border, 1, {borderColor: '#fff', opacity: 1, ease: Linear.easeNone});
                TweenMax.to(this.$border, 0.6, {autoAlpha: 0, ease: Linear.easeNone});
                TweenMax.to(this.$menuLink, 1, {css: {color: '#fff', borderColor: '#fff'}, opacity: 1, ease: Linear.easeNone});

                TweenMax.to(this.menuView.$el.find('h1, a'), 0, {css: {color: '#fff'}, opacity: 1, ease: Linear.easeNone});

            }

        },

        menuChange: function() {
            if (this.stateModel.get('menu') == false) {
                TweenMax.to(this.menuView.$el, 0.3, {autoAlpha: 0, onCompleteScope: this.menuView.$el, onComplete: function() {
                    this.css('display', 'none');
                }});

                this.$menuLink.css('opacity', 0);
                this.$menuLink.css('display', 'block');
                TweenMax.to(this.$menuLink, 0.6, {autoAlpha:1});

            }
            else if (this.stateModel.get('menu') == true) {

                this.menuView.$el.css('display', 'block');
                TweenMax.to(this.menuView.$el, 0.6, {autoAlpha: 1, onCompleteScope: this.menuView.$el, onComplete: function() {

                }});

                TweenMax.to(this.$border, 1, {autoAlpha: 1, opacity: 1, ease: Linear.easeNone});

//
//                if (this.stateModel.get('status') == 'projekte') {
//                    //TweenMax.to(this.$border, 1, {borderColor: '#fff', opacity: 1, ease: Linear.easeNone});
//                }
//                else {
//                    TweenMax.to(this.$border, 1, {borderColor: '#fff', opacity: 1, ease: Linear.easeNone});
//                }

                TweenMax.to(this.$menuLink, 0.3, {autoAlpha:0, onCompleteScope: this, onComplete: function() {
                    this.$menuLink.css('display', 'block');
                }});
            }
        },

        menuLinkClick: function() {
            this.stateModel.set('menu', true);

            return false;
        },

        onAssetsPreloaded: function() {
            this.stateModel.set('loading', false);
        },

        loadingChange: function() {
            if (this.stateModel.get('loading') == false) {
                this.landingView.$el.fadeIn(1000);
                this.menuView.$el.fadeIn(1200);
                this.$border.fadeIn(2000);
                TweenMax.to(this.preloaderView.$el, 0.6, {autoAlpha: 0, ease: Power1.easeInOut, onCompleteScope: this, onComplete: function() {
                    this.preloaderView.$el.css('display', 'none');

                }});
            }
            else if (this.stateModel.get('loading') == true) {
                this.preloaderView.$el.css('opacity', 0);
                this.preloaderView.$el.css('display', 'block');
                TweenMax.to(this.preloaderView.$el, 0.6, {autoAlpha: 1});
            }
        },

        onProjectChange: function() {
            if (this.stateModel.get('status') == 'projekte') {
                TweenMax.to(this.$border, 1, {borderColor: this.projectThreadView.projects[this.stateModel.get('project')].$el.attr('data-color'), opacity: 1, ease: Linear.easeNone});
                TweenMax.to(this.$menuLink, 1, {css: {color: this.projectThreadView.projects[this.stateModel.get('project')].$el.attr('data-color'), borderColor: this.projectThreadView.projects[this.stateModel.get('project')].$el.attr('data-color')}, opacity: 1, ease: Linear.easeNone});
                TweenMax.to(this.menuView.$el.find('h1, a'), 0, {css: {color: this.projectThreadView.projects[this.stateModel.get('project')].$el.attr('data-color')}, opacity: 1, ease: Linear.easeNone});
                TweenMax.to(this.projectThreadView.projectIndication.$text, 1, {css: {color: this.projectThreadView.projects[this.stateModel.get('project')].$el.attr('data-color')}, opacity: 1, ease: Linear.easeNone});

            }
        },
        onInProjectChange: function() {

            if (this.stateModel.get('inproject')) {
                TweenMax.to(this.$border, 0.4, {autoAlpha: 0, ease: Linear.easeNone});

            }

            else {
                TweenMax.to(this.$border, 0.7, {autoAlpha: 1, delay: 0.5, ease: Linear.easeNone});

            }
        }


    });

    return OverView;
});
