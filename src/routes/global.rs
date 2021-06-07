use super::utils::*;

use rocket::response::Redirect;

use crate::data::PostableArticle;
#[get("/<id>", format = "json")]
pub fn get_article(id: usize, articles: State<Articles>) -> Option<Json<Article>> {
    articles.get(id).map(|article| Json(article))
}

#[get("/", format = "json")]
pub fn get_articles() -> Redirect {
    Redirect::to("query?")
}

#[post("/", format = "application/json", data = "<article>", rank = 2)]
pub fn post_article(article: Json<PostableArticle>, articles: State<Articles>) -> JsonValue {
    let article = article.into_inner().authorize("anon".to_string());

    let id = articles.add(article.to_owned());
    json!({"status": "success", "id":  id})
}

#[post("/", format = "application/json", data = "<article>", rank = 1)]
pub fn post_article_access(
    user: UserAccess,
    article: Json<PostableArticle>,
    articles: State<Articles>,
) -> JsonValue {
    let mut article = article.into_inner().authorize(user.username);

    article.image.insert_str(0, "upload/");

    let id = articles.add(article.to_owned());
    //#[cfg(debug_assertions)]
    //println!("got articles: {:?}", articles.read());

    json!({"status": "success", "id":  id})
}
