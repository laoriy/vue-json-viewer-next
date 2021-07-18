<script>
import * as Vue from "vue";
import { plantRenderPara } from "../utils";

export default function render(_props, _context) {
  const context = {
    ..._context,
    props: _props,
    data: _context.attr,
    children: _context.slots,
  };
  const { props } = context;
  const showFunctionBody = Vue.inject("showFunctionBody");
  return Vue.h(
    "span",
    plantRenderPara({
      class: {
        "jv-item": true,
        "jv-function": true,
      },
      attrs: {
        title: props.jsonValue.toString(),
      },
      domProps: {
        innerHTML: showFunctionBody
          ? props.jsonValue.toString()
          : "&lt;function&gt;",
      },
    })
  );
}
</script>
