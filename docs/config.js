/**
 * @author nttdocomo
 */
 /* global location*/
seajs.config({
  alias: {
    'backbone': 'taurus/backbone',
    'underscore': 'taurus/underscore',
    'backbone.paginator':'taurus/backbone.paginator',
    'backbone-pageable':'taurus/backbone-pageable',
    'taurus':'taurus/taurus',
    'backbone-super':'taurus/backbone-super',
    'class':'taurus/class',
    'jquery':'taurus/jquery',
    'i18n/zh-cn':'taurus/i18n/zh-cn'
  },
  paths: {
    'taurus': '/src'
  },
  base: '/docs/js',
  charset: 'utf-8',
  vars: {
    'locale': (navigator.language || navigator.browserLanguage).toLowerCase()
  }
})
