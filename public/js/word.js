async function deleteVoca(id){
    const response = await fetch('/api/word/delete' + '?' + new URLSearchParams({ id: id }), {
        method: 'DELETE'
    })
    if(response.status == 200) window.location.reload()
}