<script>
import { defineComponent, h } from 'vue';
import { plantRenderPara } from '../../utils';

const REG_LINK = /^\w+:\/\//;

export default defineComponent({
    name: 'JsonString',
    props: {
        jsonValue: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            expand: true,
            canExtend: false,
        };
    },
    mounted() {
        if (this.$refs.itemRef.offsetHeight > this.$refs.holderRef.offsetHeight) {
            this.canExtend = true;
        }
    },
    methods: {
        toggle() {
            this.expand = !this.expand;
        },
    },
    render() {
        let value = this.jsonValue;
        const islink = REG_LINK.test(value);
        let domItem;

        if (!this.expand) {
            domItem = {
                class: {
                    'jv-ellipsis': true,
                },
                on: {
                    click: this.toggle,
                },
                domProps: {
                    innerText: '...',
                },
            };
        } else {
            domItem = {
                class: {
                    'jv-item': true,
                    'jv-string': true,
                },
                ref: 'itemRef',
            };
            if (islink) {
                value = `<a href="${value}" target="_blank" class="jv-link">${value}</a>`;
                domItem.domProps = {
                    innerHTML: `"${value.toString()}"`,
                };
            } else {
                domItem.domProps = {
                    innerText: `"${value.toString()}"`,
                };
            }
        }

        return h('span', {}, [
            this.canExtend &&
                h(
                    'span',
                    plantRenderPara({
                        class: {
                            'jv-toggle': true,
                            open: this.expand,
                        },
                        on: {
                            click: this.toggle,
                        },
                    })
                ),
            h(
                'span',
                plantRenderPara({
                    class: {
                        'jv-holder-node': true,
                    },
                    ref: 'holderRef',
                })
            ),
            h('span', plantRenderPara(domItem)),
        ]);
    },
});
</script>
