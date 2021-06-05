use rocket::http::Cookies;

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
//todo authorization via cookies
#[post("/vote/<id>", format = "json", data = "<vote>")]
pub fn vote(id: usize, vote: Json<i8>, articles: State<Articles>) -> JsonValue {
    match articles.vote(id, vote.0) {
        Ok(()) => json!({"status": "success"}),
        Err(e) => json!({"status": "error: ".to_string() + &e}),
    }
}

//move it to comment(s) mod later
#[post("/comment/<id>", format = "json", data = "<comment>")]
pub fn comment(
    id: usize,
    cookies: Cookies,
    comment: Json<PostableComment>,
    articles: State<Articles>,
    comments: State<Comments>,
    sessions: State<Sessions>,
) -> JsonValue {
    //rework to real session thing
    let token = match cookies.get("token") {
        Some(token) => token.to_string(),
        None => return json!({"status": "error", "reason": "session token not found"}),
    };
    let username = match sessions.get(&token) {
        Some(username) => username,
        None => return json!({"status": "err", "reason": "invalid token"}),
    };
    let username = username.to_owned();
    let comment = comment.into_inner().authorize(username);
    match articles.comment(id, comment, &comments) {
        Ok(()) => json!({"status": "successful"}),
        Err(e) => json!({"status": "error", "reason": e}),
    }
}
