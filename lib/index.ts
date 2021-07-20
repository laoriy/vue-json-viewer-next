import { App } from 'vue';
import JsonView from './json-viewer.vue';

const install = (app: App) => {
    app.component('JsonViewer', JsonView);
};

export default Object.assign(JsonView, { install });
