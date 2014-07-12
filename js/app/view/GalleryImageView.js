define([
    'view/PageBaseView',
    'common'
], function(PageBaseView) {
    var GalleryImageView = PageBaseView.extend({

        $element: null,
        $manifest: null,

        type: '',

        events: {

        },

        initialize: function(options) {
            this._super(options);

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

                    var structure = '<div class="centerwrap"><div class="center"></div></div>';
                    var $ov = $(structure);
                    var $currentOverlay = this.$el.append($ov);
                    $manifest.appendTo($ov.find('.center'));

                    this.$element = this.$el;
                }
                else if (this.type == 'text') {
                    this.$element = this.$el.find('.item');

                    this.$element.css('width', 700);
                    this.$element.css('margin', '0 auto');

                    var structure = '<div class="centerwrap"><div class="center"></div></div>';
                    var $ov = $(structure);
                    var $currentOverlay = this.$el.append($ov);
                    this.$element.appendTo($ov.find('.center'));
                }

            }

            TweenMax.to(this.$element, 0, {x: this.displayModel.get('width'), autoAlpha: 0, ease: Cubic.easeInOut, force3D: true});


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
            if (this.$img != null) {
                this.$img.css('width', this.displayModel.get('width')*0.7);
            }
            else if (this.$manifest != null) {
                this.$manifest.css('width', this.displayModel.get('width')*0.5);

            }
        }

    });

    return GalleryImageView;
});
