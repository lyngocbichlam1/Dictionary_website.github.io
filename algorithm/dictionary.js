const { readFileSync } = require('fs');
const path = require('path');

// class Dictionary {
//   constructor() {
//     const contents = readFileSync(path.join(__dirname + '/anhviet109K.txt'), 'utf-8');
//     const arr = contents.split(/\r?\n/);
//     this.dict = [];

//     for (let i = 0; i < arr.length; i++) {
//       const line = arr[i];
//       if (line.length > 0) {
//         if (line[0] == '@') {
//           this.dict.push({
//             ta: line.indexOf(' /') > 0 ? line.substring(1, line.indexOf(' /')) : line.substring(1, line.length),
//             kq: [line.substring(1, line.length)],
//           });
//           for (let j = i + 1; j < arr.length; j++) {
//             const line2 = arr[j];
//             if (line2.length > 0 && line2[0] != '@') {
//               this.dict[this.dict.length - 1].kq.push(line2);
//             }
//             if (line2[0] == '@') {
//               i = j - 1;
//               break;
//             }
//           }
//         }
//       }
//     }
//   }
// }

class Dictionary {
    constructor() {
        const contents = readFileSync(path.join(__dirname + '/anhviet109K.txt'), 'utf-8');
        const arr = contents.split(/\r?\n/);
        this.dict = new Array(100000);

        for (var i = 0; i < 100000; i++) this.dict[i] = []

        for (let i = 0; i < arr.length; i++) {
            const line = arr[i];
            if (line.length > 0) {
                if (line[0] == '@') {
                    var word = {
                        ta: line.indexOf(' /') > 0 ? line.substring(1, line.indexOf(' /')) : line.substring(1, line.length),
                        kq: [line.substring(1, line.length)],
                    }
                    for (let j = i + 1; j < arr.length; j++) {
                        var line2 = arr[j];
                        if (line2.length > 0 && line2[0] != '@') {
                            line2 = line2.replace('=', 'ex: ')
                            line2 = line2.replace('+', ': ')
                            word.kq.push(line2);
                        }
                        if (line2[0] == '@') {
                            i = j - 1;
                            break;
                        }
                    }
                    if (word) {
                        var hash = this.handleHash(word.ta)
                        this.dict[hash].push(word)
                    }
                }
            }
        }
    }

    handleHash(str) {
        var hash = 0
        var c = 1
        // hello
        for (const char of str) {
            hash += (char.charCodeAt(0) & 0xFF) * c++
        }
        while (hash > 100000) hash = hash % 100000
        return hash
    }

    search(ta){
        var word = null
        var hash = this.handleHash(ta)
        this.dict[hash].forEach(item => {
            if(item.ta == ta){
                word = item
                return
            }
        })
        return word
    }
}

module.exports = Dictionary