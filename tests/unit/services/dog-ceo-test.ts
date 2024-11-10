import { module, test } from 'qunit';
import { setupTest } from 'voyant-take-home/tests/helpers';

module('Unit | Service | dog-ceo', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    const service = this.owner.lookup('service:dog-ceo');
    assert.ok(service);
  });
});
