<script lang="ts">
import { DefineComponent, defineComponent, h, inject } from 'vue';
import { plantRenderPara } from '../utils';

import JsonString from './cmps/json-string.vue';
import JsonUndefined from './cmps/json-undefined.vue';
import JsonNumber from './cmps/json-number.vue';
import JsonBoolean from './cmps/json-boolean.vue';
import JsonObject from './cmps/json-object.vue';
import JsonArray from './cmps/json-array.vue';
import JsonFunction from './cmps/json-function.vue';
import JsonDate from './cmps/json-date.vue';

export default defineComponent({
    name: 'JsonBox',
    props: {
        value: {
            type: [Object, Array, String, Number, Boolean, Function, Date],
            default: null,
        },
        keyName: {
            type: String,
            default: '',
        },
        sort: Boolean,
        depth: {
            type: Number,
            default: 0,
        },
        previewMode: Boolean,
    },
    data() {
        return {
            expand: true,
            expandDepth: inject('expandDepth'),
        };
    },
    mounted() {
        this.expand = this.previewMode || !(this.depth >= (this.expandDepth as number));
    },
    methods: {
        toggle() {
            this.expand = !this.expand;

            try {
                this.$el.dispatchEvent(new Event('resized'));
            } catch (e) {
                // handle IE not supporting Event constructor
                const evt = document.createEvent('Event');
                evt.initEvent('resized', true, false);
                this.$el.dispatchEvent(evt);
            }
        },
    },
    render() {
        const elements = [];
        let dataType: unknown;
        if (this.value === null || this.value === undefined) {
            dataType = JsonUndefined;
        } else if (Array.isArray(this.value)) {
            dataType = JsonArray;
        } else if (Object.prototype.toString.call(this.value) === '[object Date]') {
            dataType = JsonDate;
        } else if (typeof this.value === 'object') {
            dataType = JsonObject;
        } else if (typeof this.value === 'number') {
            dataType = JsonNumber;
        } else if (typeof this.value === 'string') {
            dataType = JsonString;
        } else if (typeof this.value === 'boolean') {
            dataType = JsonBoolean;
        } else if (typeof this.value === 'function') {
            dataType = JsonFunction;
        }
        const complex =
            this.keyName &&
            this.value &&
            (Array.isArray(this.value) ||
                (typeof this.value === 'object' &&
                    Object.prototype.toString.call(this.value) !== '[object Date]'));

        if (!this.previewMode && complex) {
            elements.push(
                h(
                    'span',
                    plantRenderPara({
                        class: {
                            'jv-toggle': true,
                            open: !!this.expand,
                        },
                        on: {
                            click: this.toggle,
                        },
                    })
                )
            );
        }

        if (this.keyName) {
            elements.push(
                h(
                    'span',
                    plantRenderPara({
                        class: {
                            'jv-key': true,
                        },
                        domProps: {
                            innerText: `${this.keyName}:`,
                        },
                    })
                )
            );
        }

        elements.push(
            h(
                dataType as DefineComponent,
                plantRenderPara({
                    class: {
                        'jv-push': true,
                    },
                    props: {
                        jsonValue: this.value,
                        keyName: this.keyName,
                        sort: this.sort,
                        depth: this.depth,
                        expand: this.expand,
                        previewMode: this.previewMode,
                    },
                    on: {
                        'update:expand': (value: boolean) => {
                            this.expand = value;
                        },
                    },
                })
            )
        );

        return h(
            'div',
            plantRenderPara({
                class: {
                    'jv-node': true,
                    'jv-key-node': Boolean(this.keyName) && !complex,
                    toggle: !this.previewMode && complex,
                },
            }),
            elements
        );
    },
});
</script>

<style lang="less">
.jv-node {
    position: relative;

    &:after {
        content: ',';
    }
    &:last-of-type {
        &:after {
            content: '';
        }
    }

    &.toggle {
        margin-left: 13px !important;
    }

    & .jv-node {
        margin-left: 25px;
    }
    & .jv-key-node {
        display: flex;
    }
}
</style>
