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

            if (this.projectModel.get('slide') != 0) {
                this.stateModel.set('inproject', true);
                TweenMax.to(this.$descr, 0.9, {x: -this.displayModel.get('width'), ease: Cubic.easeInOut, force3D: true, onCompleteScope: this, onComplete: function() {
                }});

                TweenMax.to(this.gallery.items[this.projectModel.get('slide')].$element, 0.9, {x: 0, ease: Cubic.easeInOut, force3D: true});

            }
            else {
                this.stateModel.set('inproject', false);
//                TweenMax.to(this.$descr, 0.9, {x: 0, ease: Cubic.easeInOut, force3D: true, onCompleteScope: this, onComplete: function() {
//                }});
            }

            TweenMax.to(this.gallery.el, 0.9, {x: -this.projectModel.get('slide')*this.displayModel.get('width'), ease: Cubic.easeInOut, force3D: true, onCompleteScope: this, onComplete: function() {
                this.animating = false;

            }});

            if (this.projectModel.get('slide')+1 < this.gallery.items.length) {

                //rechts
                TweenMax.to(this.gallery.items[this.projectModel.get('slide')+1].$element, 0.9, {x: -(this.displayModel.get('width') - this.gallery.items[this.projectModel.get('slide')+1].$element.width())/2 - 100, ease: Cubic.easeInOut, force3D: true});
            }
            if (this.projectModel.get('slide')-1 > 0) {

                //links
                TweenMax.to(this.gallery.items[this.projectModel.get('slide')-1].$element, 0.9, {x: (this.displayModel.get('width') - this.gallery.items[this.projectModel.get('slide')-1].$element.width())/2 + 100, ease: Cubic.easeInOut, force3D: true});

            }
//            else {
//                console.log("ZERO");
//                TweenMax.to(this.gallery.items[this.gallery.items.length-1].$element, 0.9, {x: (this.displayModel.get('width') - this.gallery.items[this.gallery.items.length-1].$element.width())/2 + 100, ease: Cubic.easeInOut, force3D: true});
//
//            }
//            else if (this.projectModel.get('slide') == 0) {
//                TweenMax.to(this.gallery.items[this.gallery.items.length-1].$element, 0.9, {x: (this.displayModel.get('width') - this.gallery.items[this.gallery.items.length-1].$element.width())/2 - 100, ease: Cubic.easeInOut, force3D: true});
//            }
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

            console.log(e);

            var oldSlide = this.projectModel.get('slide');

            console.log("slide : "+oldSlide);

            if (e.pageX > this.displayModel.get('width')/2) {
                if (!this.animating && oldSlide+1 <= this.gallery.items.length-1) {

                    console.log("LENGTH: "+this.gallery.items.length);
                    this.animating = true;
                    this.projectModel.set('slide',oldSlide+1);


                }
            }
            else {
                if (!this.animating && oldSlide-1 >=0) {

                    console.log("LENGTH: "+this.gallery.items.length);
                    this.animating = true;
                    this.projectModel.set('slide',oldSlide-1);


                }
            }

        }


    });

    return ProjectView;
});
