<script lang="ts">
import { defineComponent, h, inject } from 'vue';
import { plantRenderPara } from '../utils';

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
        const showFunctionBody = inject('showFunctionBody');
        return () =>
            h(
                'span',
                plantRenderPara({
                    class: {
                        'jv-item': true,
                        'jv-function': true,
                    },
                    attrs: {
                        title: props.jsonValue.toString(),
                    },
                    domProps: {
                        innerHTML: showFunctionBody
                            ? props.jsonValue.toString()
                            : '&lt;function&gt;',
                    },
                })
            );
    },
});
</script>
