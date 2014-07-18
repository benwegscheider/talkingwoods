define([
    'view/PageBaseView',
    'common'
], function(PageBaseView) {
    var GalleryImageView = PageBaseView.extend({

        $element: null,
        $manifest: null,

        projectModel: null,

        type: '',

        width: 0,

        $format: null,
        $sub: null,

        events: {

        },

        initialize: function(options) {
            this._super(options);

            this.projectModel = options.projectModel;
            this.type = options.type;

//            console.log('### GalleryImageView.initialize: ', arguments);

            this.type = this.$el.attr('data-type');

            console.log(this.type);

            if ( this.type  == 'image') {

                this.$element = this.$el.find('img');

                var structure = '<div class="centerwrap"><div class="center"></div></div>';
                var $ov = $(structure);
                var $currentOverlay = this.$el.append($ov);
                this.$element.appendTo($ov.find('.center'));
                this.$el.find('.item').remove();
                this.$element.addClass('item');
            }
            else if ( this.type  == 'manifest' || this.type  == 'text' ) {

                if (this.type == 'manifest') {
                    var $manifest = this.$el.find('h2');

                    this.$format = this.$el.find('.format');
                    this.$sub = this.$el.find('.sub');
                    this.projectModel.on('change:slide', this.checkSlide);

                    this.$element = this.$el.find('.manifest-wrap');

                    var structure = '<div class="centerwrap"><div class="center"></div></div>';
                    var $ov = $(structure);
                    var $currentOverlay = this.$element.append($ov);
                    $manifest.appendTo($ov.find('.center'));

                    this.$element = this.$el.find('.manifest-wrap');
                }
                else if (this.type == 'text') {
                    this.$element = this.$el.find('.item');

                    this.$element.css('width', 800);
                    this.$element.css('margin', '0 auto');

                    var structure = '<div class="centerwrap"><div class="center"></div></div>';
                    var $ov = $(structure);
                    var $currentOverlay = this.$el.append($ov);
                    this.$element.appendTo($ov.find('.center'));
                }

            }

            TweenMax.to(this.$el, 0, {x: this.displayModel.get('width'), autoAlpha: 0, ease: Cubic.easeInOut, force3D: true});


            this.adjustImageHeight();

            this.displayModel.on('change:height', this.adjustImageHeight);
            this.displayModel.on('change:width', this.adjustImageHeight);


            this.render();
        },

        render: function() {
            this._super();

            return this;
        },

        adjustImageHeight: function() {
            if (this.type == 'image') {
                if (this.displayModel.get('width')*0.6 < 1000) {
                    this.width =  this.displayModel.get('width')*0.6;
                    this.$element.css('width',this.width);
                }
            }
//            else if (this.type != null) {
//                this.$manifest.css('width', this.displayModel.get('width')*0.5);
//
//            }
        },

        checkSlide: function() {
            console.log(this.$format);
            if (this.projectModel.get('slide') != 0) {
                TweenMax.to(this.$format, 0.7, {autoAlpha:0});
                TweenMax.to(this.$sub, 0.7, {autoAlpha:0});
            }
            else {
                TweenMax.to(this.$format, 0.7, {autoAlpha:1});
                TweenMax.to(this.$sub, 0.7, {autoAlpha:1});
            }
        }


    });

    return GalleryImageView;
});
