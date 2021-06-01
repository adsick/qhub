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
    let response = await fetch('/' + id)
    let article = await response.json()
    return article
}


//получаем статью и делаем изменения на гетемеле страничке
async function displayArticle(article) {
    title.innerHTML = article.title //error title is null, хз почему но шото не так. Вадим 30.05.21
    author.innerHTML = article.author
    content.innerHTML = article.content
    image.src = '/public/' + article.image
    imageTitle.innerHTML = article.image_title
}



//это вот чисто для дебага тут лежит
//мы получаем статью с диска и постим её же на слеш ноль
async function postFirstArticle() {
    let article = await getArticle()
    console.log(article)
    //console.log(JSON.stringify(article))

    fetch('/0', {
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
async function postArticle(article) {

    fetch('/1', {
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
    await postFirstArticle()
    await displayArticle(await getArticleById(0))
}

test()