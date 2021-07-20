<script lang="ts">
import { defineComponent, h, inject } from 'vue';
import { plantRenderPara } from '../utils';

type GreetFunction = (a: Date) => string;

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
        const value = props.jsonValue;
        const timeformat: GreetFunction =
            inject('timeformat') || ((a: Date): string => a.toLocaleString());

        return () =>
            h(
                'span',
                plantRenderPara({
                    class: {
                        'jv-item': true,
                        'jv-string': true,
                    },
                    domProps: {
                        innerText: `"${timeformat(value)}"`,
                    },
                })
            );
    },
});
</script>
