//

export const ralasa = ['ར', 'ལ', 'ས']
// export const yaralaa = ['ཡ', 'ར', 'ལ', 'འ']
export const kanatanapamaaralasa = ['ག', 'ང', 'ད', 'ན', 'བ', 'མ', 'འ', 'ར', 'ལ', 'ས' ]
export const kanapamara = ['ག', 'ང', 'བ', 'མ', 'ར' ]
export const tanalasa = ['ད', 'ན', 'ལ', 'ས' ]
export const tasa = ['ད', 'ས' ]
export const sa = ['ས' ] // secfuffixes
export const maa = ['མ', 'འ']
export const a = 'འ'
export const sama = ['ས' , 'མ']
export const la = ['ལ']
export const yaralaa = ['ྱ', 'ྲ', 'ླ', 'ྰ'] // subjoined
export const wasur = 'ྭ'
export const umlaut = {a: 'ë', u: 'ü', o: 'ö'} // ä
export const voiced = {1: 'g', 2: 'j', 3: 'd', 4: 'b', 5: 'dz'}
export const nasalHigh = {1: 'ŋ', 2: 'ñ', 3: 'n', 4: 'm'}
export const up2rows = {1: 'c', 2: 'cʰ', 3: 'c̣ʰ', 4: 'ṇ̃'}

export const letter = {}
export const lower = {}
export const vowel = {}
lower['ྐ'] = {trl: 'k', row: 1, col: 1}  //    	ྐ
lower['ྑ'] = {trl: 'kʰ', row: 1, col: 2} //     	ྑ
lower['ྒ'] = {trl: 'ḳʰ', row: 1, col: 3} //   	ྒ
lower['ྔ'] = {trl: 'ŋ̣', row: 1, col: 4}  //     ྔ
lower['ྕ'] = {trl: 'c', row: 2, col: 1}  //    ྕ
lower['ྖ'] = {trl: 'cʰ', row: 2, col: 2}  //     ྖ
lower['ྗ'] = {trl: 'c̣ʰ', row: 2, col: 3} //       ྗ
lower['ྙ'] = {trl: 'ṇ̃', row: 2, col: 4} //    ྙ
lower['ྟ'] = {trl: 't', row: 3, col: 1}  //    ྟ
lower['ྠ'] = {trl: 'tʰ', row: 3, col: 2} //    ྠ
lower['ྡ'] = {trl: 'ṭʰ', row: 3, col: 3} //    ྡ
lower['ྣ'] = {trl: 'ṇ', row: 3, col: 4}  //    ྣ
lower['ྤ'] = {trl: 'p', row: 4, col: 1} //    ྤ
lower['ྥ'] = {trl: 'pʰ', row: 4, col: 2} //    ྥ
lower['ྦ'] = {trl: 'p̣ʰ', row: 4, col: 3} //    ྦ
lower['ྨ'] = {trl: 'ṃ', row: 4, col: 4} //    ྨ
lower['ྩ'] = {trl: 'ç', row: 5, col: 1} //    ྩ
lower['ྪ'] = {trl: 'çʰ', row: 5, col: 2} //     ྪ
lower['ྫ'] = {trl: 'ç̣ʰ', row: 5, col: 3} //     ྫ

lower['ྱ'] = {trl: 'y', row: 6, col: 4} //     ྱ
lower['ྲ'] = {trl: 'ṛ', row: 7, col: 1} //    ྲ
lower['ླ'] = {trl: 'ḷ', row: 7, col: 2} //    ླ
lower[''] = {trl: 'k', row: 1, col: 1}
lower[''] = {trl: 'k', row: 1, col: 1}


//   ྱ   d  fྱ

letter['ཀ'] = {trl: 'k', row: 1, col: 1}
letter['ཁ'] = {trl: 'kʰ', row: 1, col: 2}
letter['ག'] = {trl: 'ḳʰ', row: 1, col: 3}
letter['ང'] = {trl: 'ŋ̣', row: 1, col: 4}
letter['ཅ'] = {trl: 'c', row: 2, col: 1}
letter['ཆ'] = {trl: 'cʰ', row: 2, col: 2}
letter['ཇ'] = {trl: 'c̣ʰ', row: 2, col: 3}
letter['ཉ'] = {trl: 'ṇ̃', row: 2, col: 4}
letter['ཏ'] = {trl: 't', row: 3, col: 1}
letter['ཐ'] = {trl: 'tʰ', row: 3, col: 2}
letter['ད'] = {trl: 'ṭʰ', row: 3, col: 3}
letter['ན'] = {trl: 'ṇ', row: 3, col: 4}
letter['པ'] = {trl: 'p', row: 4, col: 1}
letter['ཕ'] = {trl: 'pʰ', row: 4, col: 2}
letter['བ'] = {trl: 'p̣ʰ', row: 4, col: 3}
letter['མ'] = {trl: 'ṃ', row: 4, col: 4}
letter['ཙ'] = {trl: 'ç', row: 5, col: 1}
letter['ཚ'] = {trl: 'çʰ', row: 5, col: 2}
letter['ཛ'] = {trl: 'ç̣ʰ', row: 5, col: 3}
letter['ཝ'] = {trl: 'ẉ', row: 5, col: 4}

letter['ཞ'] = {trl: 'ṣ̂', row: 6, col: 1}
letter['ཟ'] = {trl: 'ṣ', row: 6, col: 2}
letter['འ'] = {trl: 'ạ', row: 6, col: 3}
letter['ཡ'] = {trl: 'ỵ', row: 6, col: 4}
letter['ར'] = {trl: 'ṛ', row: 7, col: 1}
letter['ལ'] = {trl: 'ḷ', row: 7, col: 2}
letter['ཤ'] = {trl: 'ŝ', row: 7, col: 3}
letter['ས'] = {trl: 's', row: 7, col: 4}
letter['ཧ'] = {trl: 'h', row: 8, col: 1}
letter['ཨ'] = {trl: 'a', row: 8, col: 2}
// letter[''] = {trl: '', row: 6, col: 1}

/*
 ཀ 	ka 	ཁ 	kʰa 	ག 	ḳʰa	ང 	ŋ̣a
  ཅ 	ca 	ཆ 	cʰa 	ཇ 	c̣ʰa 	ཉ 	ṇ̃a
  ཏ 	ta 	ཐ 	tʰa 	ད 	ṭʰa 	 ན 	ṇa
  པ 	pa 	ཕ 	pʰa 	བ 	p̣ʰa 	མ 	ṃa
  ཙ 	ça 	ཚ 	çʰa 	ཛ 	ç̣ʰa 	ཝ 	ẉa
  ཞ 	ṣ̂a 	ཟ 	ṣa 	འ 	ạ  	ཡ 	ỵa
  ར 	ṛa 	ལ 	ḷa 	ཤ 	ŝa 	ས 	sa
  ཧ 	ha 	ཨ 	a

*/


vowel['ཱ'] = {trl: 'a', descr: 'a-chung'} //    	 ཱ - subscript a, vowel-lengthening mark
vowel['ི'] = {trl: 'i', descr: 'kiku'}
vowel['ུ'] = {trl: 'u', descr: 'ŝapkyu'}
vowel['ོ'] = {trl: 'o', descr: 'naro'}
vowel['ེ'] = {trl: 'e', descr: 'ḋeŋ̣bu'}
