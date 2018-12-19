//

let log = console.log
let wf = process.argv.slice(2)[0] || 'བརྗོད་པ་';

import hello from './index';

let result = hello(wf);

log('HERE', result)
