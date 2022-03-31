console.log(module === this) //false
console.log(this === exports) //true
console.log(this ===  module.exports) // true

module.exports = {name:'kong'};

console.log(exports ===  module.exports) // false
console.log(exports) // {}
console.log(module.exports) //{name:'kong'}
console.log(module)

/*
* Module {
  id: '.',
  path: '/Users/gongtaemin/Documents/노드에대한 모든것/4-console',
  exports: { name: 'kong' },
  filename: '/Users/gongtaemin/Documents/노드에대한 모든것/4-console/index.js',
  loaded: false,
  children: [],
  paths: [
    '/Users/gongtaemin/Documents/노드에대한 모든것/4-console/node_modules',
    '/Users/gongtaemin/Documents/노드에대한 모든것/node_modules',
    '/Users/gongtaemin/Documents/node_modules',
    '/Users/gongtaemin/node_modules',
    '/Users/node_modules',
    '/node_modules'
  ]
}

* */