import Vue from "vue";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
// @ts-ignore
import EvaIcons from "vue-eva-icons";
// @ts-ignore
import vSelect from "vue-select";
// @ts-ignore
import * as VueSpinnersCss from "vue-spinners-css";
// @ts-ignore
import countTo from "vue-count-to";
// @ts-ignore
import PrettyCheck from "pretty-checkbox-vue/check";

const requireComponent = require.context(
  // The relative path of the components folder
  "../components",
  // Whether or not to look in subfolders
  true,
  // The regular expression used to match base component filenames
  /Base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach((fileName) => {
  // Get component config
  const componentConfig = requireComponent(fileName);

  // Get PascalCase name of component
  const componentName = upperFirst(
    camelCase(
      // Gets the file name regardless of folder depth
      fileName
        ?.split("/")
        ?.pop()
        ?.replace(/\.\w+$/, "")
    )
  );

  // Register component globally
  Vue.component(
    componentName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig.default || componentConfig
  );
});

Vue.component("v-select", vSelect);
Vue.component("v-count-to", countTo);
Vue.component("base-checkbox", PrettyCheck);
Vue.use(EvaIcons);
Vue.use(VueSpinnersCss);
