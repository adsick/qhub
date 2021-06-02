use super::utils::*;

#[get("/<id>", format = "json")]
pub fn get_article(id: usize, articles: State<Articles>) -> Option<Json<Article>> {
    articles.get(id).map(|article| Json(article.clone()))
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

#[post("/vote/<id>", format = "json", data = "<vote>")]
pub fn vote(id: usize, vote: Json<i8>, articles: State<Articles>) -> JsonValue {
    match articles.vote(id, vote.0) {
        Ok(()) => json!({"status": "success"}),
        Err(e) => json!({"status": "error: ".to_string() + &e}),
    }
}

#[post("/comment/<id>", format = "json", data = "<comment>")]
pub fn comment(id: usize, comment: Json<Comment>, articles: State<Articles>) -> JsonValue {
    //distinction between postable comments required, todo
    todo!();
    json!({})
}