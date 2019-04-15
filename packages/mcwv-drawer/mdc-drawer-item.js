import { DispatchEventMixin, CustomLinkMixin } from '@mcwv/base';
import { RippleBase } from '@mcwv/ripple';

const template = `  <custom-link
    :link="link"
    :class="[classes, itemClasses]"
    :style="styles"
    class="mdc-drawer-item mdc-list-item"
    v-on="mylisteners"
  >
    <span v-if="hasStartDetail" class="mdc-list-item__graphic">
      <slot name="start-detail">
        <i class="material-icons" aria-hidden="true">{{ startIcon }}</i>
      </slot>
    </span>
    <slot/>
  </custom-link>`;

export default {
  name: 'mdc-drawer-item',
  template,
  inject: ['mdcDrawer'],
  mixins: [DispatchEventMixin, CustomLinkMixin],
  props: {
    startIcon: String,
    modalClose: {
      type: Boolean,
      default: true,
    },
    activated: Boolean,
    exactActiveClass: {
      type: String,
      default: 'mdc-list-item--activated',
    },
  },
  data() {
    return {
      classes: {},
      styles: {},
    };
  },
  computed: {
    mylisteners() {
      return {
        ...this.$listeners,
        click: e => {
          this.mdcDrawer.isModal && this.modalClose && this.mdcDrawer.close();
          this.dispatchEvent(e);
        },
      };
    },
    itemClasses() {
      return {
        'mdc-list-item--activated': this.activated,
      };
    },
    hasStartDetail() {
      return this.startIcon || this.$slots['start-detail'];
    },
  },
  mounted() {
    this.ripple = new RippleBase(this);
    this.ripple.init();
  },
  beforeDestroy() {
    this.ripple && this.ripple.destroy();
    this.ripple = null;
  },
};