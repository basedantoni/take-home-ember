import { module, test } from 'qunit';
import { setupTest } from 'voyant-take-home/tests/helpers';

module('Unit | Controller | dog', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    const controller = this.owner.lookup('controller:dog');
    assert.ok(controller);
  });
});
