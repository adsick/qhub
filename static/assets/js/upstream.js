function loadPosts(){
    fetch('http://localhost:8000/query?')
    .then((res)=>res.json())
    .then((data)=>console.log(data))
}


$(document).ready(loadPosts())