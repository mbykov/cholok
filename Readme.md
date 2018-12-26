# cholok


Cholok - phonetic transcription for Tibetan. ཆོས་ཀློག་ - cʰö.loḳʰ - means recite, read scriptures, prayers, read aloud.

The basic principle - a script should be intuitive. Transcriptions, transliterations are always evil, but if they still need to be studied, then this is overkill (Cf. Wylie and  other horror).

So, a low tone is indicated by a dot below. Retroflexes - a dot above, unvoiced sounds are indicated by unvoiced latin consonants, but voiced - by voiced. And so on.

The Cholok script is written following the [lectures](https://www.youtube.com/playlist?list=PL1KVm5jgTljTatThw2YLw7nrf05XYBcZV) of Geshe M. Roach and the book "Modern Tibetan Language", Vol I. by Thonden Lobsang.

The Cholok will change as comments and suggestions are received.

## some examples from the test suite:

look more in [test/test.js](test/test.js)

 -  རྐ་རྕ་ ṛa-katak-ka.ṛa-catak-ca
 -  རྒ་སྡ་ ṛa-gatak-ga.sa-datak-da
 -  ལྐ་སྐ་ ḷa-katak-ka.sa-katak-ka
 -  སྣོ་ sa-natak-na-naro-no
 -  ཀྲ་ཁྲ་གྲ་ ka-ṛatak-ṫa.kʰa-ṛatak-ṫa.ḳʰa-ṛatak-ṫa
 -  ཏྲ་ཐྲ་དྲ་ ta-ṛatak-ṫa.tʰa-ṛatak-ṫa.ṭʰa-ṛatak-ṫa
 -  གླུ་ ḳʰa-ḷatak-la-ŝapkyu-lu
 -  རོབ་ ṛa-naro-ṛo-p̣ʰa-ṛop̣ʰ
 -  རེར་ ṛa-ḋeŋ̣bu-ṛe-ṛa-ṛeṛ
 -  གད་ ḳʰa-ṭʰa-ḳʰë
 -  རྗེས་འཇུག་ ṛa-jatak-ja-ḋeŋ̣bu-je-sa-je.ạo-nja-ŝapkyu-nju-ḳʰa-njuḳʰ
 -  གསུངས་ ḳʰao-sa-ŝapkyu-su-ŋ̣a-sa-suŋ̣
 -  སྔོན་འཇུག་ sa-ŋatak-ŋa-naro-ŋo-ṇa-ŋöṇ.ạo-nja-ŝapkyu-nju-ḳʰa-njuḳʰ
 -  གཏོང་ ḳʰao-ta-naro-to-ŋ̣a-toŋ̣
 -  གཅོད་ ḳʰao-ca-naro-co-ṭʰa-cö
 -  འཇལ་ ạo-nja-ḷa-njëḷ
 -  འགའ་ ạo-nga-ạ-nga
 -  མཛོ་ ṃao-ndza-naro-ndzo
 -  ཆོས་མཇལ་ cʰa-naro-cʰo-sa-cʰö.ṃao-nja-ḷa-njëḷ
 -  དབང་ ṭʰao-wa-ŋ̣a-waŋ̣
 -  འགྱུར་ ạo-nga-yatak-ngya-ŝapkyu-ngyu-ṛa-ngyuṛ


## cholok scheme:

| sym | trl | sym | trl | sym | trl | sym | trl |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ཀ | ka | ཁ | kʰa | ག | ḳʰa | ང | ŋ̣a |
| ཅ | ca | ཆ | cʰa | ཇ | c̣ʰa | ཉ | ṇ̃a |
| ཏ | ta | ཐ | tʰa | ད | ṭʰa | ན | ṇa |
| པ | pa | ཕ | pʰa | བ | p̣ʰa | མ | ṃa |
| ཙ | ça | ཚ | çʰa | ཛ | ç̣ʰa | ཝ | ẉa |
| ཞ | ṣ̂a | ཟ | ṣa | འ | ạ | ཡ | ỵa |
| ར | ṛa | ལ | ḷa | ཤ | ŝa | ས | sa |
| ཧ | ha | ཨ | a |

##  command line interface for cholok


````javascript
sudo npm -g install cholok-cli
$ cholok -c ཆོས་ཀློག་
=> cʰö.loḳʰ
$ cholok
Options:
  -c, --cumulative  Cumulative output
````



## API

````javascript
npm start འཇུག་
npm test
````

````javascript
import cholok from 'cholok'
let result = cholok(str, cumulative)
console.log(result)
````

where cumulative shoult be true or false

Ex:

````javascript
let str = འཇུག་
cholok(str, true)
=> ạo-nja-ŝapkyu-nju-ḳʰa-njuḳʰ
cholok(str)
=> njuḳʰ
````



## License

 GNU GPL
