function getArticle(id) {
  fetch("http://109.86.214.54:8000/global/${id}")
    .then((response) => {
      return response.json();
    })
    .then((article) =>{
      document.getElementById("article-title").textContent = article.title
      document.getElementById("post-author").textContent = article.author
      document.getElementById("post-location").textContent = "?"/*article.*/
      document.getElementById("article-text").textContent = article.content
      document.getElementById("article-image").setAttribute(src, image)
    })
}
