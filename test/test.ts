

import Entity from '../src/Entity';

let test2 = new Entity('test');

console.log('Empty: ', test2.exists());

let test = new Entity('company', 1234);

console.log(test.exists());
test.set('test', 123);
test.set('kita', 'foo');

console.log(test);

test.dirty().keys();

