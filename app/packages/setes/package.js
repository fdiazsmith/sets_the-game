Package.describe({
  name: 'app:setes',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'core setup for setes the game',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.addFiles('setes.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('app:setes');
  api.addFiles('setes-tests.js');
});
