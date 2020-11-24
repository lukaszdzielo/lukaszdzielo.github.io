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

import Swiper from './components/core/core-class';
export { default as Swiper, default } from './components/core/core-class';
export { default as Virtual } from './components/virtual/virtual';
export { default as Keyboard } from './components/keyboard/keyboard';
export { default as Mousewheel } from './components/mousewheel/mousewheel';
export { default as Navigation } from './components/navigation/navigation';
export { default as Pagination } from './components/pagination/pagination';
export { default as Scrollbar } from './components/scrollbar/scrollbar';
export { default as Parallax } from './components/parallax/parallax';
export { default as Zoom } from './components/zoom/zoom';
export { default as Lazy } from './components/lazy/lazy';
export { default as Controller } from './components/controller/controller';
export { default as A11y } from './components/a11y/a11y';
export { default as History } from './components/history/history';
export { default as HashNavigation } from './components/hash-navigation/hash-navigation';
export { default as Autoplay } from './components/autoplay/autoplay';
export { default as EffectFade } from './components/effect-fade/effect-fade';
export { default as EffectCube } from './components/effect-cube/effect-cube';
export { default as EffectFlip } from './components/effect-flip/effect-flip';
export { default as EffectCoverflow } from './components/effect-coverflow/effect-coverflow';
export { default as Thumbs } from './components/thumbs/thumbs';

// Swiper Class
var components = [];
Swiper.use(components);
