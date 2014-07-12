define([
    'view/PageBaseView',
    'view/GalleryView',
    'view/GalleryImageView',
    'utils/GestureManager',
    'common'
], function(PageBaseView, GalleryView, GalleryImageView, GestureManager) {
    var ProjectView = PageBaseView.extend({

        gallery: null,
        projectModel: null,

        $descr: null,

        gestureManager: null,

        events: {
            'click': 'nextSlide'
        },

        initialize: function(options) {
            this._super(options);

            this.projectModel = options.projectModel;

            console.log('### ProjectView.initialize: ', arguments);

            this.gallery = new GalleryView({el: this.$el.find('.elements'), displayModel:this.displayModel, stateModel:this.stateModel, projectModel: this.projectModel});

//            this.gallery.images.push(new GalleryImageView({el: this.$el.find('.manifest'), displayModel:this.displayModel, stateModel:this.stateModel, projectModel:this.projectModel}));

            this.$descr = this.$el.find('.descr');

            this.colorText();

            this.projectModel.on('change:slide', this.onSlideChange);

//            this.gestureManager = new GestureManager({$el: this.$el, autoEnable: true, autoStart: true, mouseWheelEnabled: true, swipeEnabled: true  });
//            this.gestureManager.on('gesture', this.onGesture);

            this.onSlideChange();

            this.render();
        },

        render: function() {
            this._super();

            return this;
        },

        onSlideChange: function() {

            console.log("SLIDE LENGTH:" +this.gallery.items.length);
            console.log("SLIDE: "+this.projectModel.get('slide'));


            var $left, $right, $lleft, $rright;
            var $mid = this.gallery.items[this.projectModel.get('slide')].$element;

            if (this.projectModel.get('slide') == 0) {
              // start
                this.stateModel.set('inproject', false);

                $left = this.gallery.items[this.gallery.items.length-1].$element;
                $lleft =  this.gallery.items[this.gallery.items.length-2].$element;
                $right = this.gallery.items[this.projectModel.get('slide')+1].$element;
                $rright = this.gallery.items[this.projectModel.get('slide')+2].$element;

            }
            else if (this.projectModel.get('slide') == this.gallery.items.length-1 ) {
              // end
                this.stateModel.set('inproject', true);

                $left = this.gallery.items[this.projectModel.get('slide')-1].$element;
                $lleft =  this.gallery.items[this.projectModel.get('slide')-2].$element;
                $right = this.gallery.items[0].$element;
                $rright = this.gallery.items[1].$element;

            }
            else if (this.projectModel.get('slide') == 1 ) {
                // end
                this.stateModel.set('inproject', true);

                $left = this.gallery.items[0].$element;
                $lleft =  this.gallery.items[this.gallery.items.length-1].$element;
                $right = this.gallery.items[this.projectModel.get('slide')+1].$element;
                $rright = this.gallery.items[this.projectModel.get('slide')+2].$element;

            }
            else if (this.projectModel.get('slide') == this.gallery.items.length-2 ) {
                // end
                this.stateModel.set('inproject', true);

                $left = this.gallery.items[this.projectModel.get('slide')-1].$element;
                $lleft =  this.gallery.items[this.projectModel.get('slide')-2].$element;
                $right = this.gallery.items[this.gallery.items.length-1].$element;
                $rright = this.gallery.items[0].$element;

            }
            else if (this.projectModel.get('slide') > 1 && this.projectModel.get('slide') < this.gallery.items.length-2 ) {
              // inbetween
                this.stateModel.set('inproject', true);


                $left = this.gallery.items[this.projectModel.get('slide')-1].$element;
                if (this.projectModel.get('slide') == 1) {
                    $lleft =  this.gallery.items[this.gallery.items.length-1].$element;
                }
                else {
                    $lleft =  this.gallery.items[this.projectModel.get('slide')-2].$element;
                }

                $right = this.gallery.items[this.projectModel.get('slide')+1].$element;
                if (this.projectModel.get('slide') == this.gallery.items.length-2) {
                    $rright =  this.gallery.items[this.gallery.items.length-1].$element;
                }
                else {
                    $rright =  this.gallery.items[this.projectModel.get('slide')+2].$element;
                }
            }

            var that = this;

            TweenMax.to($left, 0.9, {x: - this.displayModel.get('width') + (this.displayModel.get('width') - $left.width())/2 + 150, autoAlpha: 0.5, ease: Cubic.easeInOut, force3D: true});

            TweenMax.to($mid, 0.9, {x: 0, autoAlpha: 1, ease: Cubic.easeInOut, force3D: true, onCompleteScope: this, onComplete: function() {
                that.animating = false;
            }});

//            if ($img.hasClass('main')) {
//                TweenMax.to($img, 0.9, {css: {width: '80%'}, ease: Cubic.easeInOut});
//            }

            TweenMax.to($right, 0.9, {x: this.displayModel.get('width') - (this.displayModel.get('width') - $right.width())/2 - 150, autoAlpha: 0.5, ease: Cubic.easeInOut, force3D: true});


            TweenMax.to($rright, 0.9, {x: this.displayModel.get('width'), autoAlpha: 0, ease: Cubic.easeInOut, force3D: true});
            TweenMax.to($lleft, 0.9, {x: -this.displayModel.get('width'), autoAlpha: 0, ease: Cubic.easeInOut, force3D: true});



        },

        resetSlides: function() {

            var that = this;

            this.stateModel.set('inproject', false);

//
//            var $mid = this.gallery.items[0].$element;
//            var $left = this.gallery.items[this.gallery.items.length-1].$element;
//            var $lleft =  this.gallery.items[this.gallery.items.length-2].$element;
//            var $right = this.gallery.items[1].$element;
//            var $rright = this.gallery.items[2].$element;


            for (var i = 0; i < this.gallery.items.length; i++) {
                if (i != this.gallery.items.length-1 && i != this.gallery.items.length-2 && i != 1 && i != 2 && i != 0) {
                    TweenMax.to(this.gallery.items[i].$element, 0.6, {x: this.displayModel.get('width'), autoAlpha: 0, ease: Cubic.easeInOut, force3D: true});

                }
            }

//            TweenMax.to($left, 0.9, {x: - this.displayModel.get('width') + (this.displayModel.get('width') - $left.width())/2 + 150, autoAlpha: 0.5, ease: Cubic.easeInOut, force3D: true});
//
//            TweenMax.to($mid, 0.9, {x: 0, autoAlpha: 1, ease: Cubic.easeInOut, force3D: true, onCompleteScope: this, onComplete: function() {
//                that.animating = false;
//            }});
//            TweenMax.to($right, 0.9, {x: this.displayModel.get('width') - (this.displayModel.get('width') - $right.width())/2 - 150, autoAlpha: 0.5, ease: Cubic.easeInOut, force3D: true});
//
//
//            TweenMax.to($rright, 0.9, {x: this.displayModel.get('width'), autoAlpha: 0, ease: Cubic.easeInOut, force3D: true});
//            TweenMax.to($lleft, 0.9, {x: -this.displayModel.get('width'), autoAlpha: 0, ease: Cubic.easeInOut, force3D: true});


            this.projectModel.set('slide', 0);
        },

        onGesture: function(type, direction, $target) {

            //type can be swipe, mouse wheel, keyboard, or click
            //direction can left right up or down
            var oldSlide = this.projectModel.get('slide');

            console.log("slide : "+oldSlide+' '+type);

            if (type == 'right') {
                if (!this.animating && oldSlide+1 <= this.gallery.items.length-1) {

                    console.log("LENGTH: "+this.gallery.items.length);
                    this.animating = true;
                    this.projectModel.set('slide',oldSlide+1);

                    console.log("left");
                }



            }
            else if (type == 'left') {
                if (!this.animating && oldSlide-1 >= 0) {
                    this.animating = true;
                    this.projectModel.set('slide',oldSlide-1);

                    console.log("Right");
                }


            }
        },

        colorText: function() {
            this.$el.find('h2, h3, p, span').css('color', this.$el.attr('data-color'));
        },

        nextSlide: function(e) {

            var oldSlide = this.projectModel.get('slide');

            console.log("slide : "+oldSlide);

            if (e.pageX > this.displayModel.get('width')/2) {
                if (!this.animating && oldSlide+1 <= this.gallery.items.length-1) {

                    console.log("LENGTH: "+this.gallery.items.length);
                    this.animating = true;
                    this.projectModel.set('slide',oldSlide+1);
                }
                else if (!this.animating) {
                    this.animating = true;
                    this.projectModel.set('slide', 0);
                }
            }
            else {
                if (!this.animating && oldSlide-1 >=0) {

                    console.log("LENGTH: "+this.gallery.items.length);
                    this.animating = true;
                    this.projectModel.set('slide',oldSlide-1);


                }
                else if (!this.animating) {
                    this.animating = true;
                    this.projectModel.set('slide',this.gallery.items.length-1);
                }
            }

        }


    });

    return ProjectView;
});
