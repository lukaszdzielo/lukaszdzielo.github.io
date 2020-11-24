/**
 * Swiper 6.3.2
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * http://swiperjs.com
 *
 * Copyright 2014-2020 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: October 3, 2020
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Swiper = _interopDefault(require('./components/core/core-class'));
var virtual = _interopDefault(require('./components/virtual/virtual'));
var keyboard = _interopDefault(require('./components/keyboard/keyboard'));
var mousewheel = _interopDefault(require('./components/mousewheel/mousewheel'));
var navigation = _interopDefault(require('./components/navigation/navigation'));
var pagination = _interopDefault(require('./components/pagination/pagination'));
var scrollbar = _interopDefault(require('./components/scrollbar/scrollbar'));
var parallax = _interopDefault(require('./components/parallax/parallax'));
var zoom = _interopDefault(require('./components/zoom/zoom'));
var lazy = _interopDefault(require('./components/lazy/lazy'));
var controller = _interopDefault(require('./components/controller/controller'));
var a11y = _interopDefault(require('./components/a11y/a11y'));
var history = _interopDefault(require('./components/history/history'));
var hashNavigation = _interopDefault(require('./components/hash-navigation/hash-navigation'));
var autoplay = _interopDefault(require('./components/autoplay/autoplay'));
var effectFade = _interopDefault(require('./components/effect-fade/effect-fade'));
var effectCube = _interopDefault(require('./components/effect-cube/effect-cube'));
var effectFlip = _interopDefault(require('./components/effect-flip/effect-flip'));
var effectCoverflow = _interopDefault(require('./components/effect-coverflow/effect-coverflow'));
var thumbs = _interopDefault(require('./components/thumbs/thumbs'));

// Swiper Class
var components = [];
Swiper.use(components);

exports.Swiper = Swiper;
exports.default = Swiper;
exports.Virtual = virtual;
exports.Keyboard = keyboard;
exports.Mousewheel = mousewheel;
exports.Navigation = navigation;
exports.Pagination = pagination;
exports.Scrollbar = scrollbar;
exports.Parallax = parallax;
exports.Zoom = zoom;
exports.Lazy = lazy;
exports.Controller = controller;
exports.A11y = a11y;
exports.History = history;
exports.HashNavigation = hashNavigation;
exports.Autoplay = autoplay;
exports.EffectFade = effectFade;
exports.EffectCube = effectCube;
exports.EffectFlip = effectFlip;
exports.EffectCoverflow = effectCoverflow;
exports.Thumbs = thumbs;
