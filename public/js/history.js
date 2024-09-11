async function showMean(word){
    const response = await fetch('/api/check/anh-viet' + '?' + new URLSearchParams({ word: word }), {
        method: 'GET'
    })
    var data = await response.json()
    var result = document.querySelector('#show')
    result.innerHTML = ''
    data.kq.forEach(line => {
        var p = document.createElement('p')
        p.textContent = line
        result.appendChild(p)
    })
    document.querySelector('#box').setAttribute('style', 'display: flex;')
}

document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('#close').onclick = () => {
        document.querySelector('#show').innerHTML = ''
        document.querySelector('#box').setAttribute('style', 'display: none;')
    }
})