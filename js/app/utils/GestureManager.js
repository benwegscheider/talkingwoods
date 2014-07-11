define([
    'common'
], function(common) {

    return Backbone.View.extend({

        SWIPE: 'swipe',
        MOUSEWHEEL: 'mousewheel',
        CLICK: 'click',
        KEYBOARD: 'keyboard',
        ALL: 'all',
        NONE: 'none',

        swipeEnabled: false,
        mouseWheelEnabled: false,
        clickEnabled: false,
        keyboardEnabled: false,

        paused: false,
        updateDelay: 0.25,
        preventUpdates: false,

        lastGestureType: this.NONE,

        initialize: function(options) {

            _.extend(this, Backbone.Events);
            this.autoBind();

            this.$el = options.$el;

            if (options.autoEnable) this.enableGesture(this.ALL, true);
            if (options.autoStart) this.resume();
            else this.pause();
        },

        enableGesture: function(gesture, enabled) {

            switch (gesture) {

                case this.SWIPE:
                    if (enabled) this.initSwipe(true);
                    else this.initSwipe(false);
                    break;

                case this.MOUSEWHEEL:
                    if (enabled) this.initMouseWheel(true);
                    else this.initMouseWheel(false);
                    break;

                case this.CLICK:
                    if (enabled) this.initClick(true);
                    else this.initClick(false);
                    break;

                case this.KEYBOARD:
                    if (enabled) this.initKeyboard(true);
                    else this.initKeyboard(false);
                    break;

                case this.ALL:
                    if (enabled) {

                        this.initSwipe(true);
                        this.initMouseWheel(true);
                        this.initClick(true);
                        this.initKeyboard(true);
                    }
                    else {

                        this.initSwipe(false);
                        this.initMouseWheel(false);
                        this.initClick(false);
                        this.initKeyboard(false);
                    }
                    break;
            }
        },

        pause: function() {

            this.paused = true;
        },

        resume: function() {

            this.paused = false;
        },

        preventDefault: function(e) {

            e.preventDefault();
        },

        delayUpdates: function() {

            this.preventUpdates = true;
            TweenMax.delayedCall(this.updateDelay, this.onUpdateDelayComplete);
        },

        onUpdateDelayComplete: function() {

            this.preventUpdates = false;
        },

        initSwipe: function(enabled) {

            if (enabled && !this.swipeEnabled) {

                this.$el.on('dragstart', this.preventDefault);
                this.$el.on('touchmove', this.preventDefault);

                Hammer(this.$el[0]).on('swipeup', this.onSwipe);
                Hammer(this.$el[0]).on('swipedown', this.onSwipe);
                Hammer(this.$el[0]).on('swipeleft', this.onSwipe);
                Hammer(this.$el[0]).on('swiperight', this.onSwipe);

                this.swipeEnabled = true;
            }
            else if (!enabled && this.swipeEnabled) {

                this.$el.off('dragstart', this.preventDefault);
                this.$el.off('touchmove', this.preventDefault);

                Hammer(this.$el[0]).off('swipeup', this.onSwipe);
                Hammer(this.$el[0]).off('swipedown', this.onSwipe);
                Hammer(this.$el[0]).off('swipeleft', this.onSwipe);
                Hammer(this.$el[0]).off('swiperight', this.onSwipe);

                this.swipeEnabled = false;
            }
        },

        onSwipe: function(e) {

            if (this.paused || this.preventUpdates) return;

            this.lastGestureType = 'swipe';

            switch (e.type) {

                case 'swipeup':
                    this.trigger('swipe', 'up');
                    this.trigger('gesture', 'down');
                    this.delayUpdates();
                    break;

                case 'swipedown':
                    this.trigger('swipe', 'down');
                    this.trigger('gesture', 'up');
                    this.delayUpdates();
                    break;

                case 'swipeleft':
                    this.trigger('swipe', 'left');
                    this.trigger('gesture', 'right');
                    this.delayUpdates();
                    break;

                case 'swiperight':
                    this.trigger('swipe', 'right');
                    this.trigger('gesture', 'left');
                    this.delayUpdates();
                    break;
            }
        },

        initMouseWheel: function(enabled) {

            if (enabled && !this.mouseWheelEnabled) {

                this.$el.on('mousewheel', this.onMouseWheel);
                this.mouseWheelEnabled = true;
            }
            else if (!enabled && this.mouseWheelEnabled) {

                this.$el.off('mousewheel', this.onMouseWheel);
                this.mouseWheelEnabled = false;
            }
        },

        onMouseWheel: function(e) {

            e.preventDefault();
            e.originalEvent.preventDefault();

            if (this.paused || this.preventUpdates) return;

            this.lastGestureType = 'mousewheel';

            var direction;
            if (e.originalEvent.wheelDelta / 120 > 0) direction = 'up';
            else direction = 'down';


            this.trigger('mousewheel', direction);
            this.trigger('gesture', direction);

            this.delayUpdates();
        },

        initClick: function(enabled) {

            if (enabled && !this.clickEnabled) {

                Hammer(this.$el[0]).on('tap', this.onClick);
                this.clickEnabled = true;
            }
            else if (!enabled && this.clickEnabled) {

                Hammer(this.$el[0]).off('tap', this.onClick);
                this.clickEnabled = false;
            }
        },

        onClick: function(e) {

            if (this.paused || this.preventUpdates) return;

            this.lastGestureType = 'click';

            this.trigger('click', null, $(e.target));
            this.trigger('gesture', null, $(e.target));

            this.delayUpdates();
        },

        initKeyboard: function(enabled) {

            if (enabled && !this.keyboardEnabled) {

                $(document).on('keydown', this.onKeyboard);
                this.keyboardEnabled = true;
            }
            else if (!enabled && this.keyboardEnabled) {

                $(document).off('keydown', this.onKeyboard);
                this.keyboardEnabled = false;
            }
        },

        onKeyboard: function(e) {

            if (this.paused || this.preventUpdates) return;

            this.lastGestureType = 'keyboard';

            switch (e.keyCode) {

                case 37: // arrow left
                    this.trigger('keyboard', 'left');
                    this.trigger('gesture', 'left');
                    this.delayUpdates();
                    break;

                case 38: // arrow up
                    this.trigger('keyboard', 'up');
                    this.trigger('gesture', 'up');
                    this.delayUpdates();
                    break;

                case 39: // arrow right
                    this.trigger('keyboard', 'right');
                    this.trigger('gesture', 'right');
                    this.delayUpdates();
                    break;

                case 40: // arrow down
                    this.trigger('keyboard', 'down');
                    this.trigger('gesture', 'down');
                    this.delayUpdates();
                    break;

            }
        }
    });

});