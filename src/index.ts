import { App } from 'vue';
import JsonView from './viewer/json-viewer.vue';

const install = (app: App) => {
    app.component('JsonViewer', JsonView);
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
export default Object.assign(JsonView, { install });
