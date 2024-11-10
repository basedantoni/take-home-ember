import { setupTest } from 'voyant-take-home/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Model | dog', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    const store = this.owner.lookup('service:store');
    const model = store.createRecord('dog', {});
    assert.ok(model, 'model exists');
  });
});
