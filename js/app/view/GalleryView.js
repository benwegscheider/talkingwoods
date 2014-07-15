define([
    'view/BaseView',
    'view/GalleryImageView',
    'common'
], function(BaseView, GalleryImageView, GestureManager) {
    var GalleryView = BaseView.extend({

        items: [],

        projectModel: null,

        $imagesWrap: null,
        animating: false,

        events: {
        },

        initialize: function(options) {
            this._super(options);

            this.projectModel = options.projectModel;

            console.log('### GalleryView.initialize: ', arguments);

            this.$imagesWrap = this.$el.find('.iamgesWrap');

            var that = this;

            this.items = [];

            var $imgs = this.$el.find('.element');
            $imgs.each(function() {
                that.items.push(new GalleryImageView({el: $(this), displayModel: that.displayModel, stateModel: that.stateModel, projectModel: that.projectModel}));
            });



            this.updateWidth();

//            this.gestureManager = new GestureManager({$el: this.$el, autoEnable: true, autoStart: true,  mouseWheelEnabled: true  });
//            this.gestureManager.on('gesture', this.onGesture);

            this.render();
        },

        render: function() {
            this._super();

            return this;
        },

        updateWidth: function() {
            this.$el.css('width', this.displayModel.get('width')*(this.items.length));
        }

//        onGesture: function(type, direction, $target) {
//
//            //type can be swipe, mouse wheel, keyboard, or click
//            //direction can left right up or down
//            var oldSlide = this.projectModel.get('slide');
//
//            console.log("slide : "+oldSlide+' '+type);
//
//            if (type == 'left') {
//                if (!this.animating && oldSlide+1 <= this.images.length) {
//                    this.animating = true;
//                    this.projectModel.set('slide',oldSlide+1);
//
//                    TweenMax.to(this.$imagesWrap, 0.9, {x: this.projectModel.get('slide')*this.displayModel.get('width'), ease: Cubic.easeInOut, force3D: true, onCompleteScope: this, onComplete: function() {
//                        this.animating = false;
//
//                    }});
//                    console.log("left");
//                }
//
//
//
//            }
//            else if (type == 'right') {
//                if (!this.animating && oldSlide-1 >= 0) {
//                    this.animating = true;
//                    this.projectModel.set('slide',oldSlide-1);
//
//                    TweenMax.to(this.$imagesWrap, 0.9, {x: this.projectModel.get('slide')*this.displayModel.get('width'), ease: Cubic.easeInOut, force3D: true, onCompleteScope: this, onComplete: function() {
//                        this.animating = false;
////                        this.stateModel.set('project', oldProject-1);
//                    }});
//                    console.log("Right");
//                }
//
//
//            }
//        }

    });

    return GalleryView;
});
