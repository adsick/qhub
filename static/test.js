//этот файл сейчас никуда не подключён и служит примером

const title = document.getElementById("title")
const author = document.getElementById("author")
const content = document.getElementById("content")
const image = document.getElementById("image")
const imageTitle = document.getElementById("imageTitle")

//получаем статью с диска для примера
async function getArticle() {
    let response = await fetch('/article.json')
    let article = await response.json()
    return article
}
//алё ну шо там со статьёй
async function getArticleById(id) {
    let response = await fetch('/post/' + id)
    let article = await response.json()
    return article
}

async function queryArticle(hub, id){
    let response = await fetch('/query?h='+hub+'&id='+id)
    let article = await response.json()
    return article
}

//получаем статью и делаем изменения на гетемеле страничке
async function displayArticle(article) {
    title.innerHTML = article.title //error title is null, хз почему но шото не так. Вадим 30.05.21 //UPD это короче на странице оно не могло найти title в html, потому и null, с самим джисоном всё норм
    author.innerHTML = article.author
    content.innerHTML = article.content
    image.src = '/' + article.image
    imageTitle.innerHTML = article.image_title
}



//это вот чисто для дебага тут лежит
//мы получаем статью с диска и постим её же на сервер
async function postFirstArticle(url) {
    let article = await getArticle()
    console.log(article)
    //console.log(JSON.stringify(article))

    fetch(url, {
        method: 'Post',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(article)
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log('ERROR:' + error))

    //await displayArticle()    
}


//загружаем стать на сервер    
//todo
async function postArticle(article) {

    fetch('/', {
        method: 'Post',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(article)
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log('ERROR:' + error))
}

//а тут мы сначала вызываем постинг статьи-примера, а после этого обновляем хтмл, причём мы снова запрашиваем статью с сервера
//но на этот раз мы получаем эту статью через getArticleById()
async function test() {
    
    console.log('testing user...')
    let usr = await fetch('/user/adsick')
    console.log(await usr.json())

    console.log('testing posting in hub...');
    await postFirstArticle('/Anime')
    await queryArticle('Anime', 0)
    //await postFirstArticle('/') //classic aka global
    //await displayArticle(await getArticleById(0))
}

test()