const userName = "Chell" //!костыль
document.getElementById("publish-post").addEventListener('click', publishPost)


function publishPost(event){
    console.log("-----Начало запроса-----");
    event.preventDefault()

    let title = document.getElementById("post-create_title-input")
    let image = document.getElementById("post-create_image-input").nodeValue
    let content = document.getElementById("post-create_content-text")
    //TODO let tags = document.getElementById("post-create_title-input")

    const post = {
        title: title,
        hub: "Kotiki",
        author: userName,
        content: content,
        image: image, 
        image_title: "picture",
        image_description: "kotik"
    }

    fetch('/global/',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
        .then((response) => {
            if (response.ok){
                return response.json()
            } else{
                return Promise.reject({status: response.status, statusText: response.statusText})
            }
            
        })
        .then((data) => console.log(data))
        .catch(error => console.log('Error message: ', error.statusText))

}