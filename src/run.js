//

let log = console.log
let str = process.argv.slice(2)[0] || 'བརྗོད་པ་'
let cumul = process.argv.slice(3)[0]

import jolog from './index'

let result = jolog(str.trim(), cumul)

log('JOLOG:', str, '-', result)
