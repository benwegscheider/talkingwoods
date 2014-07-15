define([
    'view/BaseView',
    'view/ProjectView',
    'view/ProjectIndicationView',
    'model/ProjectModel',
    'utils/GestureManager',
    'common'
], function(BaseView, ProjectView, ProjectIndicationView, ProjectModel, GestureManager) {
    var ProjectThreadView = BaseView.extend({

        $logo: null,
        $input: null,

        $body: null,
        $border: null,

        projects: [],

        animatingDown: false,

        gestureManager: null,

        projectIndication: null,

        events: {
            'click': 'nextProject'
        },

        initialize: function(options) {
            this._super(options);

            console.log('### ProjectThreadView.initialize: ', arguments);

            this.$projectWrap = this.$el.find('#projectWrap')

            var $prjcts = this.$el.find('.project');

            var that = this;

            this.$body = $('body');
//            this.$border = $('#border');

            $prjcts.each(function() {

                //console.log(that.displayModel);
                var project = new ProjectView({el:this, displayModel:that.displayModel, stateModel:that.stateModel, projectModel: new ProjectModel()});
                that.projects.push(project);
            });

            this.projectIndication = new ProjectIndicationView({el: $('#project-indicator'), displayModel:that.displayModel, stateModel:that.stateModel, projects: that.projects.length});

            this.$el.mousemove(function(e) {
//                if (e.pageX > that.displayModel.get('width')) {
//                    that.$body.removeClass('left').addClass('right');
////                    that.$body.css('cursor', 'url("./img/arrow-right.png"), auto');
//                }
//                else {
////                    that.$body.css('cursor', 'url("./img/arrow-left.png"), auto');
//                    that.$body.removeClass('right bottom top').addClass('left');
//                }

                if (e.pageX < that.displayModel.get('width')/4 && e.pageY > that.displayModel.get('height')/4 && e.pageY < (that.displayModel.get('height')/4)*3) {
                    // links
                    that.$body.removeClass('right').removeClass('top').removeClass('bottom').addClass('left');
                }
                else if (e.pageX > (that.displayModel.get('width')/4)*3 && e.pageY > that.displayModel.get('height')/4 && e.pageY < (that.displayModel.get('height')/4)*3) {
                    // rechts
                    that.$body.removeClass('left').removeClass('bottom').removeClass('top').addClass('right');
                }
                else if (e.pageY < that.displayModel.get('height')/4 && e.pageX > that.displayModel.get('width')/4 && e.pageX < (that.displayModel.get('width')/4)*3) {
                    // oben
                    if (that.stateModel.get('project') != 0) {
                        that.$body.removeClass('left').removeClass('right').removeClass('bottom').addClass('top');
                    }
                    else {
                        that.$body.removeClass('top');
                    }
                }
                else if (e.pageY > (that.displayModel.get('height')/4)*3 && e.pageX > that.displayModel.get('width')/4 && e.pageX < (that.displayModel.get('width')/4)*3) {
                    // unten
                    if (that.stateModel.get('project') != that.projects.length-1) {
                        that.$body.removeClass('left').removeClass('right').removeClass('top').addClass('bottom');
                    }
                    else {
                        that.$body.removeClass('bottom');
                    }
                }
                else {
                    that.$body.removeClass('left').removeClass('right').removeClass('top').removeClass('bottom');
                }


            });

            this.gestureManager = new GestureManager({$el: this.$el, autoEnable: true, autoStart: true});
            this.gestureManager.on('gesture', this.onGesture);

            this.stateModel.on('change:project', this.onProjectChange);
//            this.stateModel.on('change:inproject', this.onInProjectChange);

            console.log("projects lenght: "+this.projects.length);

            this.render();
        },

        render: function() {
            this._super();

            return this;
        },


        onGesture: function(type, direction, $target) {

            //type can be swipe, mouse wheel, keyboard, or click
            //direction can left right up or down
            var oldProject = this.stateModel.get('project');

//            console.log("project : "+oldProject);

            if (type == 'down') {
                if (!this.animatingDown && oldProject+1 <= this.projects.length-1) {
                    this.animatingDown = true;
                    this.stateModel.set('project',oldProject+1);

                    console.log("ANIAMTO TO: "+this.stateModel.get('project'));

                    console.log("DOWN");

                    for (var i=0;i<this.projects.length; i++) {
                        // SLIDE ALL OTHER PROJECTS

                        if (i != this.stateModel.get('project')) {
                            this.projects[i].resetSlides();
                        }
                    }
                    var that = this;
                    setTimeout(function() {that.animatingDown = false;}, 1300 );
                }



            }
            else if (type == 'up') {
                if (!this.animatingDown && oldProject-1 >= 0) {
                    this.animatingDown = true;
                    this.stateModel.set('project',oldProject-1);

                    console.log("UP");

                    for (var i=0;i<this.projects.length; i++) {
                        // SLIDE ALL OTHER PROJECTS

                        if (i != this.stateModel.get('project')) {
                            this.projects[i].resetSlides();
                        }
                    }
                    var that = this;
                    setTimeout(function() {that.animatingDown = false;}, 1300 );
                }
            }

        },

        onProjectChange: function() {
            console.log("onProjectChange");

            TweenMax.to(this.$projectWrap, 0.9, {y: -this.stateModel.get('project')*this.displayModel.get('height'), ease: Cubic.easeInOut, force3D: true, onCompleteScope: this, onComplete: function() {
//                this.animatingDown = false;

            }});
        },

        onInProjectChange: function() {
            if (this.stateModel.get('inproject')) {
                TweenMax.to(this.projectIndication.$el, 0.6, {autoAlpha: 0});
            }
            else {
                TweenMax.to(this.projectIndication.$el, 0.6, {autoAlpha: 1});
            }
        },

        nextProject: function(e) {
            var that = this;
            console.log("CLICK");
            if (e.pageY < that.displayModel.get('height')/4 && e.pageX > that.displayModel.get('width')/4 && e.pageX < (that.displayModel.get('width')/4)*3) {
                // oben
                this.onGesture('up');
            }
            else if (e.pageY > (that.displayModel.get('height')/4)*3 && e.pageX > that.displayModel.get('width')/4 && e.pageX < (that.displayModel.get('width')/4)*3) {
                // unten
                this.onGesture('down');
            }
        }


    });

    return ProjectThreadView;
});
