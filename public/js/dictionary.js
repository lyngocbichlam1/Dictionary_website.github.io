async function run() {
    var aodio = null
    var btnCheck = document.querySelector('#check')
    var inputWord = document.querySelector('#input')
    btnCheck.onclick = async () => {
        if (inputWord.value.length > 0) {
            const response = await fetch('/api/check/anh-viet' + '?' + new URLSearchParams({ word: inputWord.value }), {
                method: 'GET'
            })
            var data = await response.json()
            var result = document.querySelector('#result')
            result.innerHTML = ''
            var string = data.contents.toString('base64')
            audio = new Audio("data:audio/mp3;base64," + string)
            data.word.kq.forEach(line => {
                var p = document.createElement('p')
                p.textContent = line
                result.appendChild(p)
            })
            document.querySelector('#save-word').setAttribute('style', 'display: inline-block;')
            document.querySelector('#icon-play').setAttribute('style','display: inline-block')
        } 
    }

    inputWord.addEventListener("keypress", function (event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            btnCheck.click()
        }
    });

    document.querySelector('#save-word').onclick = () => {
        document.querySelector('#word-ta').value = inputWord.value
        document.querySelector('.box').classList.add('.box-show-form-save')
    }

    document.querySelector('#img-icon-back').onclick = () => {
        document.querySelector('.box').classList.remove('.box-show-form-save')
    }

    document.querySelector('#save').onclick = () => {
        const data = {
            ta: document.querySelector('#input').value,
            tl: document.querySelector('#word-tl').value,
            tv: document.querySelector('#word-tv').value
        }
        const url = '/api/save';

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                document.querySelector('#word-tl').value = ''
                document.querySelector('#word-tv').value = ''
                document.querySelector('#img-icon-back').click()
            })
            .catch(error => {
                console.error('Error sending data:', error);
            });
    }

    document.querySelector('#icon-play').onclick = () => {
        if(audio){
            audio.play()
        }
    }
}
document.addEventListener("DOMContentLoaded", run(), false)