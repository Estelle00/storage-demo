> 数据均为双向绑定与vue视图一直无需手动刷新 for vue3
### install
#### NPM

```shell script
npm uni-local-storage --save
```

#### YARN

```shell script
yarn add uni-local-storage
```

### Usage

uni storage API

```javascript
import { createStorage } from "@/uni_modules/suixin-uni-local-storage"; // or import { createStorage } from "uni-local-storage";

// 实例化存储
const config = {
  namespace: "__ls__", // 当前存储key前缀 推荐动态读取manifest.json文件中AppID（appid）
  name: "ls" // 可选 自定义全局变量名称
}
// name 默认 ls；
const storage = createStorage(config);
// #ifdef VUE3
const app = createSSRApp(App);
app.use(storage);
// #endif
```
#### Context
```javascript
  import { useStore } from "uni-local-storage";
  const store = useStore("foo");
  store.setEffectiveTime(10) // 设置数据有效时间 s
  console.log(store.state) // 数据内容；
  store.state = "any" // 设置数据内容
```

### API
```javascript
const store = useStore(name)
```
返回key为`name`的本地存储数据`store`。
```javascript
store.setEffectiveTime(time);
```
设置当前`store`的有效时间（单位秒）。
- 不设置表示永久生效，每次更新数据会重新倒计时

```javascript
store.removeEffectiveTime();
```
移除`store`的有效时间，永久有效

```javascript
store.state = undefined;
```
删除当前`store`本地存储数据

```javascript
store.state = "any";
```
设置当前`store`数据
> 仅支持uni支持的数据类型
