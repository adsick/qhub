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

async function queryArticle(hub, id) {
    let response = await fetch('/query?h=' + hub + '&id=' + id)
    let article = await response.json() //here it may fail because of trying to parse a 404 page
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
    //console.log(article)
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

async function test() {

    console.log('testing user...')
    let usr = await fetch('/user/adsick')
    console.log(await usr.json())

    let user = { username: "chel", password: "1234" };
    let response = await fetch('/user/register', {
        method: 'Post',
        headers: {
            "Content-type": "application/json"
        }, body: JSON.stringify(user)
    })
    console.log('registration response:')
    console.log(await response.json())


    console.log('testing login...')
    //whai js has no variable shadowing?
    //let user = { username: "chel", password: "1234" };
    response = await fetch('/user/login', {
        method: 'Post',
        headers: {
            "Content-type": "application/json"
        }, body: JSON.stringify(user)
    })
    console.log('login response:')
    console.log(await response.json())



    console.log('testing posting in hub...');
    await postFirstArticle('/Rust')
    //await queryArticle('Anime', 0)
    console.log('testing query article...')
    console.log(await queryArticle('Rust', 0))
    //await postFirstArticle('/') //classic aka global
    //await displayArticle(await getArticleById(0))
}

//test()

async function getArticleCHAD() {
    postFirstArticle("/global")
    //console.log("");
    fetch("/global/0")
      .then((response) => {
        return response.json();
      })
      .then((article) =>{
        document.getElementById("article-title").textContent = article.title
        document.getElementById("post-author").textContent = article.author
        document.getElementById("post-location").textContent = "?"/*article.*/
        document.getElementById("article-text").textContent = article.content
        document.getElementById("article-image").setAttribute("src", article.image)
        //!доделать +-, описание картинки, комменты и теги
      })
  }


  async function troll(){

    let vadim = { username: "Вадим", password: "228" };
    let response = await fetch('/user/register', {
        method: 'Post',
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        }, body: "username=vadim&password=228"
    })
    console.log('registration response:')
    console.log(await response.json())


    console.log('trolling begun')
    for(i = 0; i < 10; i++){
        let t = {
            "title": "опа, я зарегистрировалсяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяяя",
            "hub": "кухабббббббббббббббббббббббббббббббббббббббббббббббббббббббббббббббббббббббббббббббббббббб",
            "content": "нормальноооооооооооооооооооооооооооооооооооооооооооооооооооооооооооооооооооооо",
            "image": "sunset.jpg",
            "image_title": "фыалввввввввввввввввввв",
            "image_description": "ккккккккккккккккккккккккккккккк",
        };
        /*response = await*/ fetch('/global', {
            method: 'Post',
            headers: {
                "Content-type": "application/json"
            }, body: JSON.stringify(t)
        })
        //console.log('troll:')
        //console.log(await response.json())
    }
    console.log('trolling finished')
  }

  //troll()