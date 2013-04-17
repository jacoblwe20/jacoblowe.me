var SLIDE_CONFIG = {
  // Slide settings
  settings: {
    title: 'http://jacoblowe.me/slides/',
    subtitle: 'Heres my slides',
    useBuilds: true, // Default: true. False will turn off slide animation builds.
    usePrettify: true, // Default: true
    enableSlideAreas: true, // Default: true. False turns off the click areas on either slide of the slides.
    enableTouch: true, // Default: true. If touch support should enabled. Note: the device must support touch.
    //analytics: 'UA-XXXXXXXX-1', // TODO: Using this breaks GA for some reason (probably requirejs). Update your tracking code in template.html instead.
    favIcon: 'images/parkinglot_logo.png',
    fonts: [
      'Open Sans:regular,semibold,italic,italicsemibold',
      'Source Code Pro'
    ],
    theme: ['foothilljs'] // Add your own custom themes or styles in /theme/css. Leave off the .css extension.
  },

  // Author information
  presenters: [{
    name: 'Jacob Lowe',
    company: 'Frontend Developer, Egood.com',
    gplus: 'https://plus.google.com/102589001946394459745/posts',
    twitter: '@jacob2dot0',
    www: 'http://jacoblowe.me',
    github: 'http://github.com/jacoblwe20'
  }]
};

