<script>
import * as Vue from 'vue';
import { defineComponent } from 'vue';
import JsonBox from '../json-box.vue';
import { plantRenderPara } from '../utils';

export default defineComponent({
    name: 'JsonObject',
    props: {
        jsonValue: {
            type: Object,
            required: true,
        },
        keyName: {
            type: String,
            default: '',
        },
        depth: {
            type: Number,
            default: 0,
        },
        expand: Boolean,
        sort: Boolean,
        previewMode: Boolean,
    },
    data() {
        return {
            value: {},
        };
    },
    computed: {
        ordered() {
            if (!this.sort) {
                return this.value;
            }

            const ordered = {};
            Object.keys(this.value)
                .sort()
                .forEach((key) => {
                    ordered[key] = this.value[key];
                });
            return ordered;
        },
    },
    watch: {
        jsonValue(newVal) {
            this.setValue(newVal);
        },
    },
    mounted() {
        this.setValue(this.jsonValue);
    },
    methods: {
        setValue(val) {
            setTimeout(() => {
                this.value = val;
            }, 0);
        },
        toggle() {
            this.$emit('update:expand', !this.expand);
            this.dispatchEvent();
        },
        dispatchEvent() {
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

        if (!this.previewMode && !this.keyName) {
            elements.push(
                Vue.h(
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

        elements.push(
            Vue.h(
                'span',
                plantRenderPara({
                    class: {
                        'jv-item': true,
                        'jv-object': true,
                    },
                    domProps: {
                        innerText: '{',
                    },
                })
            )
        );

        if (this.expand) {
            for (const key in this.ordered) {
                if (Object.prototype.hasOwnProperty.call(this.ordered, key)) {
                    const value = this.ordered[key];

                    elements.push(
                        Vue.h(
                            JsonBox,
                            plantRenderPara({
                                key,
                                style: {
                                    display: !this.expand ? 'none' : undefined,
                                },
                                props: {
                                    sort: this.sort,
                                    keyName: key,
                                    depth: this.depth + 1,
                                    value,
                                    previewMode: this.previewMode,
                                },
                            })
                        )
                    );
                }
            }
        }

        if (!this.expand && Object.keys(this.value).length) {
            elements.push(
                Vue.h(
                    'span',
                    plantRenderPara({
                        style: {
                            display: this.expand ? 'none' : undefined,
                        },
                        class: {
                            'jv-ellipsis': true,
                        },
                        on: {
                            click: this.toggle,
                        },
                        attrs: {
                            title: `click to reveal object content (keys: ${Object.keys(
                                this.ordered
                            ).join(', ')})`,
                        },
                        domProps: {
                            innerText: '...',
                        },
                    })
                )
            );
        }

        elements.push(
            Vue.h(
                'span',
                plantRenderPara({
                    class: {
                        'jv-item': true,
                        'jv-object': true,
                    },
                    domProps: {
                        innerText: '}',
                    },
                })
            )
        );

        return Vue.h('span', elements);
    },
    emits: ['update:expand'],
});
</script>
