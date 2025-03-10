import { module, test } from 'qunit';
import { setupRenderingTest } from 'voyant-take-home/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | dog-list', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Dog::List />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <Dog::List>
        template block text
      </Dog::List>
    `);

    assert.dom().hasText('template block text');
  });
});
