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
        $border: null,

        gestureManager: null,

        events: {
            'click': 'nextSlide'
        },

        initialize: function(options) {
            this._super(options);

            this.projectModel = options.projectModel;
            this.$border = $('#border');

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
            var $mid = this.gallery.items[this.projectModel.get('slide')];

            if (this.projectModel.get('slide') == 0) {
              // start
                this.stateModel.set('inproject', false);

                $left = this.gallery.items[this.gallery.items.length-1];
                $lleft =  this.gallery.items[this.gallery.items.length-2];
                $right = this.gallery.items[this.projectModel.get('slide')+1];
                $rright = this.gallery.items[this.projectModel.get('slide')+2];
//                TweenMax.to(this.$border, 0.9, {x: 0, force3D:true, ease: Cubic.easeInOut});


            }
            else if (this.projectModel.get('slide') == this.gallery.items.length-1 ) {
              // end
                this.stateModel.set('inproject', true);

                $left = this.gallery.items[this.projectModel.get('slide')-1];
                $lleft =  this.gallery.items[this.projectModel.get('slide')-2];
                $right = this.gallery.items[0];
                $rright = this.gallery.items[1];
//                TweenMax.to(this.$border, 0.9, {x: (this.displayModel.get('width')-this.$border.width()/2), force3D:true, ease: Cubic.easeInOut});
            }
            else if (this.projectModel.get('slide') == 1 ) {
                // end
                this.stateModel.set('inproject', true);

                $left = this.gallery.items[0];
                $lleft =  this.gallery.items[this.gallery.items.length-1];
                $right = this.gallery.items[this.projectModel.get('slide')+1];
                $rright = this.gallery.items[this.projectModel.get('slide')+2];
//                TweenMax.to(this.$border, 0.9, {x: -(this.displayModel.get('width')-this.$border.width()/2), force3D:true, ease: Cubic.easeInOut});


            }
            else if (this.projectModel.get('slide') == this.gallery.items.length-2 ) {
                // end
                this.stateModel.set('inproject', true);

                $left = this.gallery.items[this.projectModel.get('slide')-1];
                $lleft =  this.gallery.items[this.projectModel.get('slide')-2];
                $right = this.gallery.items[this.gallery.items.length-1];
                $rright = this.gallery.items[0];
            }
            else if (this.projectModel.get('slide') > 1 && this.projectModel.get('slide') < this.gallery.items.length-2 ) {
              // inbetween
                this.stateModel.set('inproject', true);


                $left = this.gallery.items[this.projectModel.get('slide')-1];
                if (this.projectModel.get('slide') == 1) {
                    $lleft =  this.gallery.items[this.gallery.items.length-1];
                }
                else {
                    $lleft =  this.gallery.items[this.projectModel.get('slide')-2];
                }

                $right = this.gallery.items[this.projectModel.get('slide')+1];
                if (this.projectModel.get('slide') == this.gallery.items.length-2) {
                    $rright =  this.gallery.items[this.gallery.items.length-1];
                }
                else {
                    $rright =  this.gallery.items[this.projectModel.get('slide')+2];
                }
            }



            if ($mid.$element.hasClass('main')) {
                $mid.$el.css('z-index', 101);
                TweenMax.to($mid.$element, 0.9, {css: {height: '700'}, ease: Cubic.easeInOut});
            }
            if ($left.$element.hasClass('main')) {
                TweenMax.to($left.$element, 0.9, {css: {height: '533'}, ease: Cubic.easeInOut});
            }
            if ($right.$element.hasClass('main')) {
                TweenMax.to($right.$element, 0.9, {css: {height: '533'}, ease: Cubic.easeInOut});
            }



            var that = this;


            TweenMax.to($left.$el, 0.9, {x: -this.displayModel.get('width'), autoAlpha: 0.5, ease: Cubic.easeInOut, force3D: true, onCompleteScope: this, onComplete: function() {
                $left.$el.css('z-index', 99);
            }});
//            TweenMax.to($left.$element, 0.9, {x: (this.displayModel.get('width') - $left.$element.width())/2 + 150, ease: Cubic.easeInOut, force3D: true});

            if ($left.type == 'image') {
                TweenMax.to($left.$element, 0.9, {x: (this.displayModel.get('width') - 800)/2 + 150, ease: Cubic.easeInOut, force3D: true});

            }
            else {
                TweenMax.to($left.$element, 0.9, {x: (this.displayModel.get('width') - $left.$element.width())/2 + 150, ease: Cubic.easeInOut, force3D: true});

            }



            TweenMax.to($mid.$el, 0.9, {x: 0, autoAlpha: 1, ease: Cubic.easeInOut, force3D: true, onCompleteScope: this, onComplete: function() {
                that.animating = false;
                $mid.$el.css('z-index', 100);
            }});
            TweenMax.to($mid.$element, 0.9, {x: 0, ease: Cubic.easeInOut, force3D: true});

//            if ($img.hasClass('main')) {
//                TweenMax.to($img, 0.9, {css: {width: '80%'}, ease: Cubic.easeInOut});
//            }


            TweenMax.to($right.$el, 0.9, {x: this.displayModel.get('width'), autoAlpha: 0.5, ease: Cubic.easeInOut, force3D: true, onCompleteScope:this, onComplete: function() {
                $right.$el.css('z-index', 99);
            }});
//            TweenMax.to($right.$element, 0.9, {x: -(this.displayModel.get('width') - $right.$element.width())/2 - 150, ease: Cubic.easeInOut, force3D: true});
            if ($right.type == 'image') {
                TweenMax.to($right.$element, 0.9, {x: -(this.displayModel.get('width') - 800)/2 - 150, ease: Cubic.easeInOut, force3D: true});

            }
            else {
                TweenMax.to($right.$element, 0.9, {x: -(this.displayModel.get('width') - $right.$element.width())/2 - 150, ease: Cubic.easeInOut, force3D: true});

            }


            TweenMax.to($rright.$el, 0.9, {x: this.displayModel.get('width'), autoAlpha: 0, ease: Cubic.easeInOut, force3D: true});
            TweenMax.to($rright.$element, 0.9, {x: 0, ease: Cubic.easeInOut, force3D: true});

            TweenMax.to($lleft.$el, 0.9, {x: -this.displayModel.get('width'), autoAlpha: 0, ease: Cubic.easeInOut, force3D: true});
            TweenMax.to($lleft.$element, 0.9, {x: 0, ease: Cubic.easeInOut, force3D: true});



        },

        resetSlides: function() {

            var that = this;

            this.stateModel.set('inproject', false);


            for (var i = 0; i < this.gallery.items.length; i++) {
                if (i != this.gallery.items.length-1 && i != this.gallery.items.length-2 && i != 1 && i != 2 && i != 0) {
                    TweenMax.to(this.gallery.items[i].$el, 0.6, {x: this.displayModel.get('width'), autoAlpha: 0, ease: Cubic.easeInOut, force3D: true});

                }
            }


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
            this.$el.find('h1, h2, h3, p, span').css('color', this.$el.attr('data-color'));
        },

        nextSlide: function(e) {

            var oldSlide = this.projectModel.get('slide');

            console.log("slide : "+oldSlide);

            var that = this;
            if (e.pageX > (that.displayModel.get('width')/4)*3 && e.pageY > that.displayModel.get('height')/4 && e.pageY < (that.displayModel.get('height')/4)*3
                ) {
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
            else if (e.pageX < that.displayModel.get('width')/4 && e.pageY > that.displayModel.get('height')/4 && e.pageY < (that.displayModel.get('height')/4)*3){
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
