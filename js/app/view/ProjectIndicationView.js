define([
    'view/BaseView',
    'common'
], function(BaseView) {
    var ProjectIndicationView = BaseView.extend({

        $text: null,
        projectAmount: 0,

        events: {
        },

        initialize: function(options) {
            this._super(options);

            this.projectAmount = options.projects;

            //console.log('### ProjectIndicationView.initialize: ', arguments);

            this.$text = this.$el.find('span');

            this.stateModel.on('change:project', this.onProjectChange);

            this.onProjectChange();

            this.render();
        },

        render: function() {
            this._super();

            return this;
        },
        onProjectChange: function() {
            this.$text.text((this.stateModel.get('project')+1)+' / '+this.projectAmount);
        }

    });

    return ProjectIndicationView;
});
