import { module, test } from 'qunit';
import { setupTest } from 'voyant-take-home/tests/helpers';

module('Unit | Route | dogs', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:dogs');
    assert.ok(route);
  });
});
