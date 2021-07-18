<script>
import * as Vue from 'vue';
import { plantRenderPara } from '../utils';

export default function render(_props, _context) {
    const context = {
        ..._context,
        props: _props,
        data: _context.attr,
        children: _context.slots,
    };
    const { props } = context;
    return Vue.h(
        'span',
        plantRenderPara({
            class: {
                'jv-item': true,
                'jv-boolean': true,
            },
            domProps: {
                innerText: props.jsonValue.toString(),
            },
        })
    );
}
</script>
