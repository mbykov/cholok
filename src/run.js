//

let log = console.log
let str = process.argv.slice(2)[0] || 'བརྗོད་པ་'
let cumul = process.argv.slice(3)[0]

import cholok from './index'

let result = cholok(str.trim(), cumul)

log('cholok:', str, '-', result)
