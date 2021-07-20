import { createApp } from 'vue';
import JsonViewer from '../lib/index';

import App from './App.vue';

const app = createApp(App);

app.use(JsonViewer).mount('#app');
