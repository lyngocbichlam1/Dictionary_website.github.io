document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('#login').onclick = () => {
        window.open('/auth/google', '_self')
    }
})