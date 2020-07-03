import { MDCLineRippleFoundation } from '@material/line-ripple/foundation';
import {
  onBeforeUnmount,
  onMounted,
  reactive,
  toRefs,
} from '@vue/composition-api';

export default {
  name: 'mcw-line-ripple',

  props: {
    rippleCenter: { type: [Number, String], default: 0 },
    active: Boolean,
  },
  setup(props, { slots }) {
    const uiState = reactive({
      lineClasses: { 'mdc-line-ripple': 1 },
      lineStyles: {},
    });

    let foundation_;

    const adapter = {
      addClass: className =>
        (uiState.lineClasses = {
          ...uiState.lineClasses,
          [className]: true,
        }),

      removeClass: className => {
        // eslint-disable-next-line no-unused-vars
        const { [className]: removed, ...rest } = uiState.lineClasses;
        uiState.lineClasses = rest;
      },

      hasClass: className => {
        return Boolean(uiState.lineClasses[className]);
      },
      setStyle: (name, value) =>
        (uiState.lineStyles = {
          ...uiState.lineStyles,
          [name]: value,
        }),
    };

    const setRippleCenter = xCoordinate => {
      foundation_.setRippleCenter(xCoordinate);
    };

    const activate = () => {
      foundation_.activate();
    };

    const deactivate = () => {
      foundation_.deactivate();
    };

    const onTransitionEnd = evt => foundation_.handleTransitionEnd(evt);

    onMounted(() => {
      // note: do not call the property 'foundation' as the tests will then
      // expext all methods to be implemented, and we handle transitionend locally
      foundation_ = new MDCLineRippleFoundation(adapter);
      foundation_.init();
    });

    onBeforeUnmount(() => {
      foundation_.destroy();
    });

    return {
      ...toRefs(uiState),
      setRippleCenter,
      activate,
      deactivate,
      onTransitionEnd,
    };
  },
};
