//
import _ from 'lodash'
import {letter, lower, ralasa, yaralaa, vowel, wasur, kanatanapamaaralasa, kanapamara, tanalasa, tasa, umlaut, sa, sama, maa, la, a, voiced, nasalHigh, up2rows} from './lib/data'
let log = console.log
let tsek = '་'
let shad = '།'
export default function cholok(str, cumul) {
  let result  = []
  let sgs = segments(str)
  sgs.forEach(seg=> {
    if (seg.tib) {
      let res = syllable(seg)
      let trl = translit(res, cumul)
      result.push(trl)
    } else {
      result.push(seg.space)
    }
  })
  return result.join('')
}

function syllable(seg) {
  let point
  let letters = seg.tib
  let main, mains = []
  let prefix, superfix, prefs = []
  let suffix, secsuf, avow
  let sufs = []

  let ult = letters[letters.length-1]
  if (letters.length > 3 && _.keys(vowel).includes(ult)) {
    let penult = letters[letters.length-2]
    if (a == penult) {
      avow = ult
      letters.pop()
    }
  }

  let vows = _.intersection(letters, _.keys(vowel))
  let vow, indexVow
  if (vows.length == 1) vow = vows[0], indexVow = letters.indexOf(vow)
  else if (vows.length > 1) throw new Error('TOO MANY VOWELS')

  let isWasur = letters.includes(wasur)

  let lowers = _.intersection(letters, _.keys(lower))
  let subfixes = _.intersection(letters, yaralaa)
  let subfix, indexSubfix
  if (subfixes.length == 1) subfix = subfixes[0], indexSubfix = letters.indexOf(subfix)

  if (isWasur) { // རྭ་ // རྩྭ་
    let indWasur = letters.indexOf(wasur)
    point = 'wasur'
    main = letters[indWasur - 1]
    prefix = letters[indWasur - 2]
    sufs = letters.slice(indWasur+1)
  } else if (lowers.length) {
    point = 1
    let firstLow = lowers[0]
    let indexFirstLow = letters.indexOf(firstLow)
    prefs = letters.slice(0, indexFirstLow)
    if (vow && subfix) { // ex: རྡྱོག་ ; འརྡྱོག་
      point = 'vow&&sub'
      subfix = letters[indexVow - 1]
      main = letters[indexVow - 2]
      prefs = letters.slice(0, indexVow - 2)
      sufs = letters.slice(indexVow+1)
    } else if (vow) { // superfix: // ex: རྡོག་
      point = 3
      main = letters[indexVow - 1]
      prefs = letters.slice(0, indexVow - 1)
      sufs = letters.slice(indexVow+1)
    } else if (subfix) { // ex:     // ex: ཤསྟྲ་
      point = 'sub'
      main = letters[indexSubfix - 1]
      prefs = letters.slice(0, indexSubfix - 1)
      sufs = letters.slice(indexSubfix+1)
    } else { // superfixes:  // རྐ་ // རྡག་ // འརྡག་ // རྣ་ // ལྒ་ // ཤྰསྟྲ
      point = 4
      let lowLast = lowers.slice(-1)[0]
      let indexLowLast = letters.indexOf(lowLast)
      main = letters[indexLowLast]
      prefs = letters.slice(0, indexLowLast)
      sufs = letters.slice(indexLowLast+1)
    }
  } else if (subfix) { // no lowers // ex: ཁྱི་ ka-yatak-kiku // but not གིྱ ka-kiku-yatak // ཁྱིས་ //  འཁྱིས་  // ex: ཁྱ་ // སྲ་ // མྲ་
    point = 8
    main = letters[indexSubfix - 1]
    prefs = letters.slice(0, indexSubfix - 1)
    if (vow) {
      sufs = letters.slice(indexVow+1)
    } else {
      sufs = letters.slice(indexSubfix+1)
    }
    if (main == a) { // བྱའུ་
    }
  } else { // no lowers, no subfixed, no superfix
    if (vow) { // ex: དོགས་
      point = 5
      main = letters[indexVow-1]
      prefs = letters.slice(0, indexVow-1) // up to vow
      sufs = letters.slice(indexVow+1)
      if (main == a) { // དགའོ་
      }
    } else { // ex: དགས་
      point = 6
      if (letters.length > 4) throw new Error('TOO MANY LETTERS IN PLAIN WF')
      if (letters.length == 1) main = letters[0] // ex: ད་
      else if (letters.length == 2) { //  དས་ // རག་ // གད་// མས་
        point = 7
        main = letters[0]
        suffix = letters[1]
      } else if (letters.length == 3 || letters.length == 4) { // prefixes: // ex: འདགས་
        point = 9
        prefix = letters[0]
        main = letters[1]
        sufs = letters.slice(2)
      }
    }
  }

  if (prefs && prefs.length) {
    if (prefs.length == 2) {
      prefix = prefs[0]
      if (ralasa.includes(prefs[1])) superfix = prefs[1]
    }

    else if (prefs && prefs.length == 1) {
      if (ralasa.includes(prefs[0])) superfix = prefs[0]
      else prefix = prefs[0]
    }
  }

  if (sufs && sufs.length) {
    if (sufs.length == 2) suffix = sufs[0], secsuf = sufs[1]
    else if (sufs.length == 1) suffix = sufs[0]
  }

  let data = {point: point, prefix: prefix, superfix: superfix, main: main, subfix: subfix, vow: vow, suffix: suffix, secsuf: secsuf} // , isWasur: isWasur
  if (isWasur) data.wasur = true
  if (avow) data.avow = avow

  for (let key in data) {
    if (!data[key]) delete data[key]
  }
  if (prefs && prefs.length > 2) {
    log(data)
    throw new Error('TOO MANY PREFS')
  }
  if (subfixes.length > 1) {
    log(data)
    throw new Error('TOO MANY SUBFIXES')
  }

  if (sufs.length > 2) {
    log(data)
    throw new Error('TOO MANY SUFFIXES')
  }
  if (!main) {
    log(data)
    throw new Error('NO MAIN!')
  }

  return data
}

function translit(data, cumul) {
  // log('=========DATA:', data)
  let res = {}
  let stack = []
  let main
  if (data.prefix) {
    let pref = letter[data.prefix]
    // if (!pref) log('=====', data)

    main = getLetter(data.main)
    if (main.col == 3) main.trl = voiced[main.row]
    else if (main.col == 4 && main.row < 5) main.trl = nasalHigh[main.row]
    let apref = [pref.trl, 'ao'].join('')
    if (maa.includes(data.prefix)) {
      main.trl = ['n', main.trl].join('')
    }
    if (a == data.prefix) {
      apref = [pref.trl, 'o'].join('')
    } else {
      apref = [pref.trl, 'ao'].join('')
    }
    if (data.prefix == 'ད' && data.main == 'བ') main.trl = 'w' // excl: p->w
    stack.push(apref)
  }

  if (data.superfix) {
    let superfix = letter[data.superfix]
    let asuperfix = [superfix.trl, 'a'].join('')
    stack.push(asuperfix)
    main = getLower(data.main)
    if (main.col == 3) main.trl = voiced[main.row]
    else if (main.col == 4) main.trl = nasalHigh[main.row]
    let amain = [main.trl, 'a'].join('')
    let maintak = [amain, 'tak'].join('')
    stack.push(maintak)
    if (superfix.trl == 'ḷ' && main.trl == 'h') main.trl = 'hḷ' // excl: l-h -> h-l
  } else {
    if (!main) main = getLetter(data.main)
  }

  res.main = main
  let amain = [main.trl, 'a'].join('')
  stack.push(amain)

  if (data.wasur) stack.push('wasur')

  if (data.subfix) {
    let subfix = lower[data.subfix]
    let asub = [subfix.trl, 'a'].join('')
    let asubtak = [asub, 'tak'].join('')
    stack.push(asubtak)
    if (data.subfix == 'ྱ') { // YA
      if (main.row == 4) {
        res.main.trl = up2rows[main.col]
        if (data.prefix == 'ད' && data.main == 'བ') { // excl: p->w->ya
          main.trl = 'y'
        }
      } else {
        res.main.trl = [res.main.trl, subfix.trl].join('')
      }
    } else if (data.subfix ==   'ླ') { // LA
      if (data.main == 'ཟ') res.main.trl = 'nd'
      else res.main.trl = 'l'
    } if (data.subfix == 'ྲ') { // RA
      if (sama.includes(data.main)) {
        //
      } else if ([1,3].includes(main.row)) {
        res.main.trl = 'ṫ'
      }
    }
    stack.push(pretty(res))
  }
  if (data.vow) {
    let vow = _.clone(vowel[data.vow])
    stack.push(vow.descr)
    if (data.prefix == 'ད' && data.main == 'བ' && !data.subfix) main.trl = '' // excl: p->w->u
    let mainvow = [main.trl, vow.trl].join('')
    res.vow = vow
    stack.push(mainvow)
  } else {
    res.vow = {trl: 'a'}
  }
  if (data.suffix) {
    let suffix = getLetter(data.suffix) //_.clone(letter[data.suffix])
    res.suffix = suffix
    let asuf = [suffix.trl, 'a'].join('')
    if (kanapamara.includes(data.suffix)) {
    } else if (tanalasa.includes(data.suffix)) {
      res.vow.trl = umlaut[res.vow.trl] || res.vow.trl
    } else if (a == data.suffix) {
      asuf = suffix.trl
    } else {
      log('IMPOSSIMBLE SUFFIX', data)
    }
    stack.push(asuf)
    if (data.avow) {
      let avow = vowel[data.avow]
      stack.push(avow.descr)
      stack.push(avow.trl)
      res.suffix.trl = avow.trl
    } else if (a == data.suffix) {
      res.suffix = null
    }
    if (tasa.includes(data.suffix)) res.suffix = null
    if (data.secsuf) {
      let secsuf = letter[data.secsuf]
      let asecsuf = [secsuf.trl, 'a'].join('')
      stack.push(asecsuf)
    }
    stack.push(pretty(res))
  }

  let trl = (cumul) ? stack.join('-') : pretty(res)
  return trl
}

function pretty(res) {
  if (!res.vow) res.vow = {trl: 'a'}
  let str = res.main.trl
  str = [str, res.vow.trl].join('')
  if (res.suffix) str = [str, res.suffix.trl].join('')
  return str
}

function getLetter(str) {
  let tmp =letter[str]
  let res
  if (tmp) res = _.clone(tmp)
  else res = {trl: str}
  return res
}

function getLower(str) {
  let tmp =lower[str]
  let res
  if (tmp) res = _.clone(tmp)
  else res = {trl: str}
  return res
}

function segments (str) {
  let syms = str.split('')
  let segs = []
  let seg = []
  let other = []
  syms.forEach(sym=> {
    if (letter[sym] || lower[sym] || vowel[sym]) {
      seg.push(sym)
    } else {
      if (seg.length) segs.push({tib: seg})
      seg = []
      let space
      if (sym == tsek) space =  {space: '.'}
      else if (sym == shad) space =  {space: '|'}
      else space = {space: sym}
      segs.push(space)
    }
  })
  if (seg.length) segs.push({tib: seg})
  return segs
}
