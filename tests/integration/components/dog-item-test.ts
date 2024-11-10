import { module, test } from 'qunit';
import { setupRenderingTest } from 'voyant-take-home/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | dog-item', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<DogItem />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <DogItem>
        template block text
      </DogItem>
    `);

    assert.dom().hasText('template block text');
  });
});
