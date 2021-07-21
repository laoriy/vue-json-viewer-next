## vue-json-viewer-next

> A json viewer component based on Vue 3.x.

### Introduction

-   A json viewer component based on Vue 3.x.

### Install

```
npm install vue-json-viewer-next
```

### Usage

```
// 入口文件main.ts(js)
import JsonViewer from 'vue-json-viewer-next';

app.use(JsonViewer);

// 或者xxx.vue

import JsonViewer from 'vue-json-viewer-next';

components:{
    JsonViewer
}



// *.vue文件
 <json-viewer value={this.jsonData}></json-viewer>
```
