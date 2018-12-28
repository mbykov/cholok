import _ from 'lodash'
import jolog from '../dist'

const forEach = require('mocha-each')
const assert = require('assert')
let log = console.log


let tests = [
  ['vowel', 'ཀི་', 'ka-kiku-ki'],
  ['vowel', 'ཀུ་', 'ka-ŝapkyu-ku'],
  ['vowel', 'ཀེ་', 'ka-ḋeŋ̣bu-ke'],
  ['vowel', 'ཀོ་', 'ka-naro-ko'],
  ['superfix', '', ''],
  ['superfix', 'རྐ་རྕ་', 'ṛa-katak-ka.ṛa-catak-ca'],
  ['superfix', 'རྒ་སྡ་', 'ṛa-gatak-ga.sa-datak-da'],
  ['superfix', 'རྣ་', 'ṛa-natak-na'],
  ['superfix', 'ལྐ་སྐ་', 'ḷa-katak-ka.sa-katak-ka'],
  ['superfix', 'ལྒ་', 'ḷa-gatak-ga'],
  ['superfix', 'སྒི་', 'sa-gatak-ga-kiku-gi'],
  ['superfix', 'སྒ་', 'sa-gatak-ga'],
  ['superfix', 'སྣོ་', 'sa-natak-na-naro-no'],
  ['superfix', 'ལྷ་ས་', 'ḷa-hatak-hḷa.sa'],
  ['subfix', '', ''],
  ['subfix', 'ཀྱ་', 'ka-yatak-kya'],
  ['subfix', 'ཁྱ་', 'kʰa-yatak-kʰya'],
  ['subfix', 'གྱ་', 'ḳʰa-yatak-ḳʰya'],
  ['subfix', 'པྱ་', 'pa-yatak-ca'],
  ['subfix', 'མྱ་', 'ṃa-yatak-ṇ̃a'],
  // ['subfix', 'དབྱེར་', ''], // exception
  // ======================== HERE ========================
  ['subfix', 'ཀྲ་ཁྲ་གྲ་', 'ka-ṛatak-ṫa.kʰa-ṛatak-ṫa.ḳʰa-ṛatak-ṫa'],
  ['subfix', 'ཏྲ་ཐྲ་དྲ་', 'ta-ṛatak-ṫa.tʰa-ṛatak-ṫa.ṭʰa-ṛatak-ṫa'],
  ['subfix', 'སྲ་', 'sa-ṛatak-sa'], // exception
  ['subfix', 'མྲ་', 'ṃa-ṛatak-ṃa'], // exception
  ['subfix', 'ཀླ་', 'ka-ḷatak-la'],
  ['subfix', 'གླུ་', 'ḳʰa-ḷatak-la-ŝapkyu-lu'],
  ['subfix', 'བླ་', 'p̣ʰa-ḷatak-la'],
  ['subfix', 'རླ་', 'ṛa-ḷatak-la'],
  ['subfix', 'སླུ་', 'sa-ḷatak-la-ŝapkyu-lu'],
  ['subfix', 'རྡོག་', 'ṛa-datak-da-naro-do-ḳʰa-doḳʰ'],
  ['subfix', 'དོགས་', 'ṭʰa-naro-ṭʰo-ḳʰa-sa-ṭʰoḳʰ'],
  ['subfix', 'ཟླ་', 'ṣa-ḷatak-nda'],
  ['subfix', 'སྐུ་ཟླ་', 'sa-katak-ka-ŝapkyu-ku.ṣa-ḷatak-nda'],
  ['subfix', '', ''],
  ['subfix', '', ''],
  ['suffix', 'རག་', 'ṛa-ḳʰa-ṛaḳʰ'],
  ['suffix', 'རིག་', 'ṛa-kiku-ṛi-ḳʰa-ṛiḳʰ'],
  ['suffix', 'རང་', 'ṛa-ŋ̣a-ṛaŋ̣'],
  ['suffix', 'རུང་', 'ṛa-ŝapkyu-ṛu-ŋ̣a-ṛuŋ̣'],
  ['suffix', 'རོབ་', 'ṛa-naro-ṛo-p̣ʰa-ṛop̣ʰ'],
  ['suffix', 'རེར་', 'ṛa-ḋeŋ̣bu-ṛe-ṛa-ṛeṛ'],
  ['suffix', 'གད་', 'ḳʰa-ṭʰa-ḳʰë'], // should be short
  ['suffix', 'ལན་', 'ḷa-ṇa-ḷëṇ'],
  ['suffix', 'དལ་', 'ṭʰa-ḷa-ṭʰëḷ'],
  ['suffix', 'མས་', 'ṃa-sa-ṃë'], // shold be long
  ['suffix', '', ''],
  ['suffix', 'བྱའུ་', 'p̣ʰa-yatak-c̣ʰa-ạ-ŝapkyu-u-c̣ʰau'],
  ['suffix', 'བྱའི་', 'p̣ʰa-yatak-c̣ʰa-ạ-kiku-i-c̣ʰai'],
  ['suffix', 'དགའ་', 'ṭʰao-ga-ạ-ga'],
  ['suffix', 'དག་', 'ṭʰa-ḳʰa-ṭʰaḳʰ'],
  ['suffix', 'རྗེས་འཇུག་', 'ṛa-jatak-ja-ḋeŋ̣bu-je-sa-je.ạo-nja-ŝapkyu-nju-ḳʰa-njuḳʰ'], // suffix
  ['secsuf', 'རིགས་', 'ṛa-kiku-ṛi-ḳʰa-sa-ṛiḳʰ'],
  // ['secsuf', 'རིཌ་', ''],
  ['secsuf', 'གསུང་', 'ḳʰao-sa-ŝapkyu-su-ŋ̣a-suŋ̣'],
  ['secsuf', 'གསུངས་', 'ḳʰao-sa-ŝapkyu-su-ŋ̣a-sa-suŋ̣'],
  ['secsuf', '', ''],
  ['suffix', '', ''],
  ['prefix', '', ''],
  ['prefix', 'སྔོན་འཇུག་', 'sa-ŋatak-ŋa-naro-ŋo-ṇa-ŋöṇ.ạo-nja-ŝapkyu-nju-ḳʰa-njuḳʰ'],
  ['prefix', 'གནས་', 'ḳʰao-na-sa-në'],
  ['prefix', 'གཏོང་', 'ḳʰao-ta-naro-to-ŋ̣a-toŋ̣'],
  ['prefix', 'གཅོད་', 'ḳʰao-ca-naro-co-ṭʰa-cö'],
  ['prefix', 'དགར་', 'ṭʰao-ga-ṛa-gaṛ'],
  ['prefix', '', ''],
  ['prefix', '', ''],
  ['prefix', 'འཇལ་', 'ạo-nja-ḷa-njëḷ'],
  ['prefix', 'འགའ་', 'ạo-nga-ạ-nga'],
  ['prefix', 'མཇལ་', 'ṃao-nja-ḷa-njëḷ'],
  ['prefix', 'གདའ་', 'ḳʰao-da-ạ-da'],
  ['prefix', 'འབའ་', 'ạo-nba-ạ-nba'],
  ['prefix', 'མཛོ་', 'ṃao-ndza-naro-ndzo'],
  ['prefix', 'འགའ', 'ạo-nga-ạ-nga'],
  ['prefix', 'ཆོས་མཇལ་', 'cʰa-naro-cʰo-sa-cʰö.ṃao-nja-ḷa-njëḷ'], //  cʰönjëḷ
  ['prefix', 'འདའ་', 'ạo-nda-ạ-nda'],
  ['prefix', 'མདའ་', 'ṃao-nda-ạ-nda'],
  ['prefix', 'མེ་མདའ་', 'ṃa-ḋeŋ̣bu-ṃe.ṃao-nda-ạ-nda'], // ṃenda
  ['prefix', 'མཛའ་', 'ṃao-ndza-ạ-ndza'],
  ['prefix', 'དབང་', 'ṭʰao-wa-ŋ̣a-waŋ̣'],
  ['prefix', 'དབྱར་', 'ṭʰao-wa-yatak-ya-ṛa-yaṛ'],
  ['prefix', 'གཡར', 'ḳʰao-ỵa-ṛa-ỵaṛ'],
  ['prefix', 'དབུ་', 'ṭʰao-wa-ŝapkyu-u'],
  ['prefix', 'དབུ་མ་', 'ṭʰao-wa-ŝapkyu-u.ṃa'],
  ['prefix', 'དབྱིངས་', 'ṭʰao-wa-yatak-ya-kiku-yi-ŋ̣a-sa-yiŋ̣'],
  ['prefix', 'འགྱུར་', 'ạo-nga-yatak-ngya-ŝapkyu-ngyu-ṛa-ngyuṛ'],
  ['prefix', '', ''],
  ['prefix', 'འདོག་', 'ạo-nda-naro-ndo-ḳʰa-ndoḳʰ'],
  ['prefix', 'གྱུརཏ་', 'ḳʰa-yatak-ḳʰya-ŝapkyu-ḳʰyu-ṛa-ta-ḳʰyuṛ'], // ancient spelling

  // ['other', 'ནས་ - ནེ་ - ནཏ་', ''], - ne (long, means from), ne (middle), ne (short)
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
