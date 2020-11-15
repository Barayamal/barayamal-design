[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

# Barayamal

A CraftCMS based multi-site network / design system for the Indigenous charity, Barayamal. Designed to be flexible, scalable, and easy to collaborate on.

## Table of Contents

* Getting Started
  * Prerequisites
  * Installation
* Usage
* Roadmap
* Contributing

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
More information is available on the [CraftCMS website](https://docs.craftcms.com/v3/requirements.html "CraftCMS Server Requirements"). However, your development environment should contain:
 - PHP 7.2+
 - MariaDB 5.5+
 - At least 256MB of memory allocated to PHP
 - At least 200MB of free disk space

### Installation
This project uses Composer for installing PHP dependencies, and NPM for javascript dependencies. Once you have cloned this repository to your local machine, install the dependencies by running: 
1. ``composer install`` to install CraftCMS and other server dependencies.
2. ``npm install --save-dev`` to install GulpJS and front-end dependencies.

Whilst NGINX is used in production for Barayamal, CraftCMS will still run on Apache and Microsoft IIS instances. Remember to set ``/public`` as the webroot, otherwise files won't be served by CraftCMS. The ``.env`` file is where you configure your database settings. Whilst this site can run on PostgreSQL, it has been designed primarily for a MariaDB deployment.

In production, minification and concatenation of files is handled by a Gulp task run on deploy. Please do not commit production 'minified' files to the repository and use Gulp to automate these processes.

## Roadmap
See [open issues](https://github.com/Barayamal/barayamal-design/issues) for a list of proposed features (and known issues).

## Contributing
CraftCMS uses the Twig templating library which seperates templating from PHP's rendering engine. Styles, scripts, and theme images are stored in the ``public/src`` directory. Running ``gulp`` will create a watcher which will build these assets when changes are made.

Where possible, attempt to link styles and script references to an individual 'module' rather than to a page. This makes the modules easier to reuse in other parts of the site if required. A good example of this can be seen in the testimonials module:

### _block.testimonials.twig
~~~ Twig
<section class="module bg--grey" data-module="testimonials">
    <div class="testimonials">
        {% for block in block.testimonial.all() %}
            <blockquote class="testimonial-entry t-centre" itemprop="review" itemscope itemtype="https://schema.org/Review">
                <p itemprop="reviewBody">{{ block.testimonialText }}</p>

                <cite itemprop="author" itemscope itemtype="https://schema.org/Person">
                    <strong itemprop="name">{{ block.author }}</strong>

                    {% if block.authorAffiliation %}
                        <span itemprop="affiliation">{{ block.authorAffiliation }}</span>
                    {% endif %}
                </cite>
            </blockquote>
        {% endfor %}
    </div>

    {{ siteMacros.css('css/modules/block-testimonials.css') }}
</section>
~~~

### block-testimonials.scss
~~~ scss
/*------------------------------------*\
  # TESTIMONIALS
\*------------------------------------*/

.testimonials {
    @include for-size('tablet') {
        max-width: $inner_content-width;
        margin-left: auto;
        margin-right: auto;
    }
}

.testimonial-entry {
    width: 100%;
    padding: 0 ($rhythm * 3) 0 ($rhythm * 3);

    span {
        display: block;
    }
}
~~~

As you can see, this example uses Twig to generate the markup in context of the 'testimonials' being a standalone module rather than part of a page. Both the styles and markup use features to maintain consistency across all modules. 

Similar to WordPress, fields used across all sites are referred to as 'network fields', whereas site only fields are 'site fields.' Consider whether your field should be for a single site you're developing, or will be used across the entire network of Barayamal websites. Remember, this design system is used across a large collection of sites, so changes to network fields affect more than just your site!

### Vertical Rhythm & Mixins
A number of SCSS mixins are available to keep consistent spacing and rhythm throughout the site. These are available in the ``utils/_mixins.scss`` and ``utils/_variables.scss`` files. Please consider using these rather than spinning your own.

The BEM (Block, Element, Modifier) Methodology is used for naming classes. The preference is to include these in full, rather than obstructing them in a SCSS function. This makes it easier to search for classes in larger stylesheets.

## License
All rights reserved unless otherwise indicated. Copr. Barayamal Limited.



<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Barayamal/repo.svg?style=flat-square
[contributors-url]: https://github.com/Barayamal/barayamal-design/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Barayamal/repo.svg?style=flat-square
[forks-url]: https://github.com/Barayamal/barayamal-design/network/members
[stars-shield]: https://img.shields.io/github/stars/Barayamal/repo.svg?style=flat-square
[stars-url]: https://github.com/Barayamal/barayamal-design/stargazers
[issues-shield]: https://img.shields.io/github/issues/Barayamal/repo.svg?style=flat-square
[issues-url]: https://github.com/Barayamal/barayamal-design/issues