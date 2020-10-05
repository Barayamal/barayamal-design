// Mobile Navigation
// http://www.a11ymatters.com/pattern/mobile-nav/#use-a-semantic-element-for-the-toggle-button
const toggle = document.querySelector('#js-navToggle'),
      menu = document.querySelector('#js-navMenu');

toggle.addEventListener('click', function () {
    if (menu.classList.contains('is-visible')) {
        menu.classList.remove('is-visible');
        toggle.classList.remove('is-visible');
    } else {
        menu.classList.add('is-visible');
        toggle.classList.add('is-visible');
    }
});

// Load resources lazily with progressive enhancement
import LazyLoad from 'vanilla-lazyload';

new LazyLoad({
    elements_selector: '[loading=lazy]',
    use_native: true
})

// Load modules dynamically
// https://www.viget.com/articles/managing-css-js-http-2/
const moduleElements = document.querySelectorAll('[data-module]');

for (var i = 0; i < moduleElements.length; i++) {
    const el = moduleElements[i];
    const name = el.getAttribute('data-module');

    import(`./modules/${name}.js`);
}