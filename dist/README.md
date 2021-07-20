## aqara-json-viewer-next

> A json viewer component based on Vue 3.x.

### Introduction

-   A json viewer component based on Vue 3.x.

### Install

```
npm install aqara-json-viewer-next
```

### Usage

```
// 入口文件main.ts(js)
import JsonViewer from 'aqara-json-viewer-next';

app.use(JsonViewer);

// 或者xxx.vue

import { JsonViewer } from 'aqara-json-viewer-next';

components:{
    JsonViewer
}



// *.vue文件
 <json-viewer value={this.jsonData}></json-viewer>
```

### Change logs

-   Publish v1.0.0 2021/7/21
