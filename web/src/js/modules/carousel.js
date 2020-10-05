// Hero Carousel
import Flickity from 'flickity';
import FlickityFade from 'flickity-fade';

const FlkBanner = new Flickity( '.banner--carousel', {
    wrapAround: true,
    autoPlay: true,
    prevNextButtons: false,
    pageDots: false,
    fade: true
});