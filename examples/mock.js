define(function (require) {
  var $ = require('../src/jquery')
  var chance = require('../src/chance')
  require('../src/jquery.mockjax')
  $.mockjax(function (requestSettings) {
    // Here is our manual URL matching...
    if (requestSettings.url === '/states_remote') {
      // We have a match, so we return a response callback...
      var data = []
      for (var i = 0; i < chance.natural({min: 1, max: 20}); i++) {
        data.push({
          'abbr': chance.state(),
          'name': chance.state({ full: true }),
          'slogan': 'The Heart of Dixie'
        })
      }
      return {
        response: function (origSettings) {
          this.responseText = data
        }
      }
    }
    // If you get here, there was no url match
    return
  })
})
