import _ from 'lodash'
import jolog from '../dist'

const forEach = require('mocha-each')
const assert = require('assert')
let log = console.log


let tests = [
  ['vowel', 'ཀི་', 'ka-kiku-ki.'],
  ['vowel', 'ཀུ་', 'ka-ŝapkyu-ku.'],
  ['vowel', 'ཀེ་', 'ka-ḋeŋbu-ke.'],
  ['vowel', 'ཀོ་', 'ka-naro-ko.'],
  ['superfix', '', ''],
  ['superfix', 'རྐ་རྕ་', 'ra-katak-ka.ra-catak-ca.'],
  ['superfix', 'རྒ་སྡ་', 'ra-gatak-ga.sa-datak-da.'],
  ['superfix', 'རྣ་', 'ra-natak-na.'],
  ['superfix', 'ལྐ་སྐ་', 'la-katak-ka.sa-katak-ka.'],
  ['superfix', 'ལྒ་', 'la-gatak-ga.'],
  ['superfix', 'སྒི་', 'sa-gatak-ga-kiku-gi.'],
  ['superfix', 'སྒ་', 'sa-gatak-ga.'],
  ['superfix', 'སྣོ་', 'sa-natak-na-naro-no.'],
  ['superfix', 'ལྷ་ས་', 'la-hatak-hla.sa.'],
  ['subfix', '', ''],
  ['subfix', 'ཀྱ་', 'ka-yatak-kya.'],
  ['subfix', 'ཁྱ་', 'kʰa-yatak-kʰya.'],
  ['subfix', 'གྱ་', 'ḳʰa-yatak-ḳʰya.'],
  ['subfix', 'པྱ་', 'pa-yatak-ca.'],
  ['subfix', 'མྱ་', 'ma-yatak-ṇ̃a.'],
  // ['subfix', 'དབྱེར་', '.'], // exception
  // ======================== HERE ========================
  ['subfix', 'ཀྲ་ཁྲ་གྲ་', 'ka-ratak-ṫa.kʰa-ratak-ṫa.ḳʰa-ratak-ṫa.'],
  ['subfix', 'ཏྲ་ཐྲ་དྲ་', 'ta-ratak-ṫa.tʰa-ratak-ṫa.ṭʰa-ratak-ṫa.'],
  ['subfix', 'སྲ་', 'sa-ratak-sa.'], // exception
  ['subfix', 'མྲ་', 'ma-ratak-ma.'], // exception
  ['subfix', 'ཀླ་', 'ka-latak-la.'],
  ['subfix', 'གླུ་', 'ḳʰa-latak-la-ŝapkyu-lu.'],
  ['subfix', 'བླ་', 'p̣ʰa-latak-la.'],
  ['subfix', 'རླ་', 'ra-latak-la.'],
  ['subfix', 'སླུ་', 'sa-latak-la-ŝapkyu-lu.'],
  ['subfix', 'རྡོག་', 'ra-datak-da-naro-do-ḳʰa-doḳʰ.'],
  ['subfix', 'དོགས་', 'ṭʰa-naro-ṭʰo-ḳʰa-sa-ṭʰoḳʰ.'],
  ['subfix', 'ཟླ་', 'ṣa-latak-nda.'],
  ['subfix', 'སྐུ་ཟླ་', 'sa-katak-ka-ŝapkyu-ku.ṣa-latak-nda.'],
  ['subfix', '', ''],
  ['subfix', '', ''],
  ['suffix', 'རག་', 'ra-ḳʰa-raḳʰ.'],
  ['suffix', 'རིག་', 'ra-kiku-ri-ḳʰa-riḳʰ.'],
  ['suffix', 'རང་', 'ra-ŋa-raŋ.'],
  ['suffix', 'རུང་', 'ra-ŝapkyu-ru-ŋa-ruŋ.'],
  ['suffix', 'རོབ་', 'ra-naro-ro-p̣ʰa-rop̣ʰ.'],
  ['suffix', 'རེར་', 'ra-ḋeŋbu-re-ra-rer.'],
  ['suffix', 'གད་', 'ḳʰa-ṭʰa-ḳʰä.'], // should be short
  ['suffix', 'ལན་', 'la-na-län.'],
  ['suffix', 'དལ་', 'ṭʰa-la-ṭʰäl.'],
  ['suffix', 'མས་', 'ma-sa-mä.'], // shold be long
  ['suffix', '', ''],
  ['suffix', 'བྱའུ་', 'p̣ʰa-yatak-c̣ʰa-a-ŝapkyu-u-c̣ʰau.'],
  ['suffix', 'བྱའི་', 'p̣ʰa-yatak-c̣ʰa-a-kiku-i-c̣ʰä:.'],
  ['suffix', 'དགའ་', 'ṭʰao-ga-a-ga.'],
  ['suffix', 'དག་', 'ṭʰa-ḳʰa-ṭʰaḳʰ.'],
  ['suffix', 'རྗེས་འཇུག་', 'ra-jatak-ja-ḋeŋbu-je-sa-je.ao-`ja-ŝapkyu-`ju-ḳʰa-`juḳʰ.'], // suffix
  ['secsuf', 'རིགས་', 'ra-kiku-ri-ḳʰa-sa-riḳʰ.'],
  // ['secsuf', 'རིཌ་', '.'],
  ['secsuf', 'གསུང་', 'ḳʰao-sa-ŝapkyu-su-ŋa-suŋ.'],
  ['secsuf', 'གསུངས་', 'ḳʰao-sa-ŝapkyu-su-ŋa-sa-suŋ.'],
  ['secsuf', '', ''],
  ['suffix', '', ''],
  ['prefix', '', ''],
  ['prefix', 'སྔོན་འཇུག་', 'sa-ŋatak-ŋa-naro-ŋo-na-ŋön.ao-`ja-ŝapkyu-`ju-ḳʰa-`juḳʰ.'],
  ['prefix', 'གནས་', 'ḳʰao-na-sa-nä.'],
  ['prefix', 'གཏོང་', 'ḳʰao-ta-naro-to-ŋa-toŋ.'],
  ['prefix', 'གཅོད་', 'ḳʰao-ca-naro-co-ṭʰa-cö.'],
  ['prefix', 'དགར་', 'ṭʰao-ga-ra-gar.'],
  ['prefix', '', ''],
  ['prefix', '', ''],
  ['prefix', 'འཇལ་', 'ao-`ja-la-`jäl.'],
  ['prefix', 'འགའ་', 'ao-`ga-a-`ga.'],
  ['prefix', 'མཇལ་', 'mao-`ja-la-`jäl.'],
  ['prefix', 'གདའ་', 'ḳʰao-da-a-da.'],
  ['prefix', 'འབའ་', 'ao-`ba-a-`ba.'],
  ['prefix', 'མཛོ་', 'mao-`dza-naro-`dzo.'],
  ['prefix', 'འགའ་', 'ao-`ga-a-`ga.'],
  ['prefix', 'ཆོས་མཇལ་', 'cʰa-naro-cʰo-sa-cʰö.mao-`ja-la-`jäl.'], //  cʰönjäl
  ['prefix', 'འདའ་', 'ao-`da-a-`da.'],
  ['prefix', 'མདའ་', 'mao-`da-a-`da.'],
  ['prefix', 'མེ་མདའ་', 'ma-ḋeŋbu-me.mao-`da-a-`da.'], // menda
  ['prefix', 'མཛའ་', 'mao-`dza-a-`dza.'],
  ['prefix', 'དབང་', 'ṭʰao-wa-ŋa-waŋ.'],
  ['prefix', 'དབྱར་', 'ṭʰao-wa-yatak-ya-ra-yar.'],
  ['prefix', 'གཡར་', 'ḳʰao-ya-ra-yar.'],
  ['prefix', 'དབུ་', 'ṭʰao-wa-ŝapkyu-u.'],
  ['prefix', 'དབུ་མ་', 'ṭʰao-wa-ŝapkyu-u.ma.'],
  ['prefix', 'དབྱིངས་', 'ṭʰao-wa-yatak-ya-kiku-yi-ŋa-sa-yiŋ.'],
  ['prefix', 'འགྱུར་', 'ao-`ga-yatak-`gya-ŝapkyu-`gyu-ra-`gyur.'],
  ['prefix', '', ''],
  ['prefix', 'འདོག་', 'ao-`da-naro-`do-ḳʰa-`doḳʰ.'],
  ['prefix', 'གྱུརཏ་', 'ḳʰa-yatak-ḳʰya-ŝapkyu-ḳʰyu-ra-ta-ḳʰyur.'], // ancient spelling

  // ['other', 'ནས་ - ནེ་ - ནཏ་', '.'], - ne (long, means from), ne (middle), ne (short)
  ['other', '', ''],
  ['other', '', ''],
  ['other', '', ''],

]

forEach(tests)
  .it('test %s %s %s ', (name, tib, cumexp) => {
    if (!tib) return
    let cum = jolog(tib, true)
    assert.equal(cum, cumexp)
    let trl = jolog(tib)
    let trlexp = cumexp.split('.').map(str=>{return _.last(str.split('-'))} ).join('.')
    assert.equal(trl, trlexp)
  })
