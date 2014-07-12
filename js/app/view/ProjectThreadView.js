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

        projects: [],

        animatingDown: false,

        gestureManager: null,

        projectIndication: null,

        events: {

        },

        initialize: function(options) {
            this._super(options);

            console.log('### ProjectThreadView.initialize: ', arguments);

            this.$projectWrap = this.$el.find('#projectWrap')

            var $prjcts = this.$el.find('.project');

            var that = this;

            this.$body = $('body');

            $prjcts.each(function() {

                //console.log(that.displayModel);
                var project = new ProjectView({el:this, displayModel:that.displayModel, stateModel:that.stateModel, projectModel: new ProjectModel()});
                that.projects.push(project);
            });

            this.projectIndication = new ProjectIndicationView({el: $('#project-indicator'), displayModel:that.displayModel, stateModel:that.stateModel, projects: that.projects.length});

            this.$el.mousemove(function(e) {



                if (e.pageX > that.displayModel.get('width')/2) {
                    that.$body.removeClass('left').addClass('right');
//                    that.$body.css('cursor', 'url("./img/arrow-right.png"), auto');
                }
                else {
//                    that.$body.css('cursor', 'url("./img/arrow-left.png"), auto');
                    that.$body.removeClass('right').addClass('left');
                }
            });

            this.gestureManager = new GestureManager({$el: this.$el, autoEnable: true, autoStart: true});
            this.gestureManager.on('gesture', this.onGesture);

            this.stateModel.on('change:project', this.onProjectChange);

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

            console.log("project : "+oldProject);

            if (type == 'down') {
                if (!this.animatingDown && oldProject+1 <= this.projects.length-1) {
                    this.animatingDown = true;
                    this.stateModel.set('project',oldProject+1);

                    console.log("ANIAMTO TO: "+this.stateModel.get('project'));

                    console.log("DOWN");

                    for (var i=0;i<this.projects.length; i++) {
                        // SLIDE ALL OTHER PROJECTS

                        if (i != this.stateModel.get('project')) {
                            this.projects[i].projectModel.set('slide', 0);
                    }}
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
                            this.projects[i].projectModel.set('slide', 0);
                        }}
                }


            }
        },

        onProjectChange: function() {
            console.log("onProjectChange");

            TweenMax.to(this.$projectWrap, 0.9, {y: -this.stateModel.get('project')*this.displayModel.get('height'), ease: Cubic.easeInOut, force3D: true, onCompleteScope: this, onComplete: function() {
                this.animatingDown = false;

            }});
        }


    });

    return ProjectThreadView;
});