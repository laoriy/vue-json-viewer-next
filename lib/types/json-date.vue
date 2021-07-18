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
  const value = props.jsonValue;
  const timeformat = Vue.inject("timeformat");

  return Vue.h(
    "span",
    plantRenderPara({
      class: {
        "jv-item": true,
        "jv-string": true,
      },
      domProps: {
        innerText: `"${timeformat(value)}"`,
      },
    })
  );
}
</script>
