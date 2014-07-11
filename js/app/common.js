require.config({
    paths: {
        'text': '../vendor/requirejs.text/text',
        'jquery': '../vendor/jquery/jquery',
        'jquery-ui': './utils/jquery-ui',
        'underscore': '../vendor/underscore/underscore',
        'backbone': '../vendor/backbone/backbone',
        'backbone.super': '../vendor/backbone.super/backbone.super',
        'backbone.extensions': '../vendor/backbone.extensions/backbone.extensions',
        'modernizr.tests': '../vendor/plugins/modernizr-tests',
        'TweenMax' : '../vendor/greensock/TweenMax',
        'Hammer': '../vendor/hammer-js/hammer-1.0.5.min',
        'videojs': './utils/video',
        'bigvideojs': './utils/bigvideo',
        'imagesloaded': './utils/imagesloaded.pkgd',

        'templates': '../templates',
        'vendor': '../vendor'
    },

    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'modernizr.tests': {
            deps: ['jquery']
        },
        'jquery-ui': {
            deps: ['jquery']
        },
        'videojs': {
            exports: 'videojs'
        },
        'bigvideojs': {
            deps: ['jquery', 'jquery-ui', 'imagesloaded', 'videojs']
        }

    }
});

define([
    'jquery',
    'jquery-ui',
    'TweenMax',
    'underscore',
    'Hammer',
    'backbone',
    'backbone.super',
    'backbone.extensions',
    'modernizr.tests',
    'vendor/plugins/console',
    'vendor/devicejs/device'
], function($, _, Backbone) {
});
