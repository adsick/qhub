use super::utils::*;

#[get("/<id>", format = "json")]
pub fn get_article(id: usize, articles: State<Articles>) -> Option<Json<Article>> {
    articles.get(id).map(|article| Json(article))
}

#[post("/", format = "application/json", data = "<article>")] //add options for posting in hubs and blogs
pub fn post_article(article: Json<Article>, articles: State<Articles>) -> JsonValue {
    match articles.add(article.to_owned()) {
        None => {
            json!({"status": "error", "reason": "unknown"})
        }
        Some(id) => {
            json!({"status": "success", "id":  id})
        }
    }
}
