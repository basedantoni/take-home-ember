'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // Add options here
    'ember-cli-babel': { enableTypeScriptTransform: true },

    'ember-bootstrap': {
      bootstrapVersion: 5,
      importBootstrapCSS: true
    }
  });

  return app.toTree();
};
