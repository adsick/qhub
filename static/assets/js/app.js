

const body = document.body;


// функция принимает название тега и объект с настройками
const createEl = (tag, opts) => {
  const el = document.createElement(tag);
  // перебираем ключи объекта и записывает соответствующие свойства в элемент
  for (const key in opts) {
    el[key] = opts[key];
  }
  // возвращаем готовый элемент
  return el;
};

/*const button = createEl('button', {
    настройками могут быть атрибуты
    id: 'my_button',
    className: 'btn btn-primary',
    textContent: 'Click me',
  
    title: 'My button',
    autofocus: true,
  
    стили
    style: 'color: red; cursor: pointer;',
  
    обработчики и т.д.
    onmouseenter: function () {
      this.style.color = 'green'
    },
    onmouseout: function () {
      this.style.color = 'blue'
    },
  
    onclick: () => alert('Привет!')
  })*/

  function createPostPreviewHTML(post){
    let preview = document.createElement('div')
    preview.classList.add('post')
    preview.innerHTML = `<div class="post-image"> 
      <a class="post-image" href="post.html">
          <img src="${post.image}" alt="Image">
      </a>
    </div>
    <div class="post-content">
        <div class="post-header"> 
            <div class="post-author-info">
                <a href="personal-page.html" class="author">
                    <img src="${post.authorAvatar}" alt="" class="author-img">
                </a>
                <div class="author-nickname">
                    <a href="personal-page.html">${post.author}</a>
                    <ul class="post-data">
                        <li class="post-data_item">
                            <time datetime="2021-04-18 14:26">${post.time}</time>
                        </li>
                    </ul>
                </div>
            </div>               
            <div>
                <p>posted in</p>
                <a class="hub-title" href="hub.html">${post.location}</a>
            </div>
        </div>
        <div class="post-title">
            <a class="post-link" href="post.html">${post.title}</a>            
        </div>      
        <div class="post-footer">
            <p class="post-text">${post.content}</p>
            <div class="votes">
                <ul>
                    <li class="upvotes">
                        <img src="assets/images/up-arrow.svg" alt="">
                        <p>${post.upvotes}</p>
                    </li>
                    <li class="downvotes">
                        <img src="assets/images/down-arrow.svg" alt="">
                        <p>${post.downvotes}</p>
                    </li>
                </ul>
            </div>
        </div>                  
    </div>`
    return preview
  }
