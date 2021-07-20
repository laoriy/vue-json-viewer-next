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
        const isInteger = Number.isInteger(props.jsonValue);

        return () =>
            h(
                'span',
                plantRenderPara({
                    class: {
                        'jv-item': true,
                        'jv-number': true,
                        'jv-number-integer': isInteger,
                        'jv-number-float': !isInteger,
                    },
                    domProps: {
                        innerText: props.jsonValue.toString(),
                    },
                })
            );
    },
});
</script>
