import Storage from "./storage";
function createStorage(opt = {}) {
  const options = {
    name: "ls",
    ...opt
  };
  const ls = new Storage(options);
  Object.keys(ls.data).forEach(key => {
    Object.defineProperty(ls, key, {
      value: ls.get(key)
    })
  })
  return ls;
}
export {
  createStorage
}