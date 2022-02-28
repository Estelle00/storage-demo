### install

#### NPM

```shell script
npm install uni-local-storage --save
```

#### YARN

```shell script
yarn add uni-local-storage
```

### Usage

uni storage API

```javascript
import { createStorage } from "uni-local-storage";
// 实例化存储
const config = {
  version: "0.0.1", // 当前存储版本号 推荐动态读取manifest.json文件版本名称（versionName）
  namespace: "__ls__", // 当前存储key前缀 推荐动态读取manifest.json文件中AppID（appid）
  name: "ls" // 可选 自定义全局变量名称
}
// name 默认 ls；
const storage = createStorage(config);
// #ifdef VUE2
Vue.use(storage);
// #endif
// #ifdef VUE3
const app = createSSRApp(App);
app.use(storage);
// #endif

new Vue({
    el: '#app',
    created() {
        Vue.ls.set('foo', 'boo');
        //Set expire for item
        Vue.ls.set('foo', 'boo', 60 * 60); //expiry 1 hour
        Vue.ls.get('foo');
        Vue.ls.remove('foo');
    },
})
```
#### Context
```javascript
this.$ls
```

### API
```javascript
Vue.ls.get(name, version);
```
返回key为name的本地存储数据。
- `version` 默认为0.0.1，返回大于当前版本数据
> 小于当前版本数据会自动删除

```javascript
Vue.ls.set(name, value, expire);
```
存储`name`下的`value`。
- `expire` 默认null，数据有效秒

```javascript
Vue.ls.getAll(version)
```
返回所以存储数据
- `version` 默认为0.0.1，返回大于当前版本数据
> 小于当前版本数据会自动删除

```javascript
Vue.ls.remove(name);
```
删除`name`数据，成功返回`true`；

```javascript
Vue.ls.on(name, callback);
```
添加`name`发生变化时的监听

```javascript
Vue.ls.once(name, callback);
```
添加`name`发生变化时的一次监听

```javascript
Vue.ls.off(name, callback);
```
关闭`name`发生变化的回调
> `callback` 不填写清空当前`name`的所有监听事件
