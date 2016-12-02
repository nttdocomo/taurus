/**
 * @author nttdocomo
 */
 /* global location*/
seajs.config({
  alias: {
    'button': 'taurus/button/button'/*,
    'fine-uploader': '../../src/fine-uploader',*/
  // 'backbone-pageable':'../../src/backbone-pageable'/*,
  // 'underscore':'../../src/backbone-pageable'
  },
  paths: {
    'taurus': './'
  },
  base: '../../src',
  charset: 'utf-8',
  vars: {
    'locale': (navigator.language || navigator.browserLanguage).toLowerCase()
  }
})
