import { DispatchEventMixin, CustomButtonMixin } from '@mcwv/base';
import { RippleMixin } from '@mcwv/ripple';

const template = `  <custom-button
    :class="classes"
    :style="styles"
    :href="href"
    :link="link"
    class="mdc-fab"
    v-on="listeners"
  >
    <span class="mdc-fab__icon">
      <slot>{{ icon }}</slot>
    </span>
  </custom-button>`;

export default {
  name: 'mdc-fab',
  template,
  mixins: [DispatchEventMixin, CustomButtonMixin, RippleMixin],
  props: {
    icon: String,
    mini: Boolean,
    absolute: Boolean,
    fixed: Boolean,
  },
  data() {
    return {
      classes: {
        'material-icons': this.icon,
        'mdc-fab--mini': this.mini,
        'mdc-fab--absolute': this.absolute,
        'mdc-fab--fixed': this.fixed,
      },
      styles: {},
    };
  },
  watch: {
    icon() {
      this.$set(this.classes, 'material-icons', this.icon);
    },
    mini() {
      this.$set(this.classes, 'mdc-fab--mini', this.mini);
    },
  },
};