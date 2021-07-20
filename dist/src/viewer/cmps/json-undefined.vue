<script>
import { defineComponent, h } from 'vue';
import { plantRenderPara } from '../../utils';

export default defineComponent({
    props: ['jsonValue'],
    setup(_props, _context) {
        const context = {
            ..._context,
            props: _props,
            data: _context.attrs,
            children: _context.slots,
        };
        const { props } = context;
        return () =>
            h(
                'span',
                plantRenderPara({
                    class: {
                        'jv-item': true,
                        'jv-undefined': true,
                    },
                    domProps: {
                        innerText: props.jsonValue === null ? 'null' : 'undefined',
                    },
                })
            );
    },
});
</script>
