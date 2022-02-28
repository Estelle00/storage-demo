import Storage from "./storage";
function createStorage(opt = {}) {
  const options = {
    name: "ls",
    ...opt
  };
  return new Storage(options);
}
export {
  createStorage
}
