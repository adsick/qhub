use rocket::http::Cookies;

use super::utils::*;

#[get("/<id>", format = "json")]
pub fn get_comment(id: usize, comments: State<Comments>) -> Option<Json<Comment>> {
    comments.get(id).map(|comment| Json(comment))
}

//this one is used for getting many comments by their ids
#[post("/<id>", format = "json", data = "<comment_ids>", rank = 2)]
pub fn get_level(
    id: usize,
    comment_ids: Json<Vec<usize>>,
    comments: State<Comments>,
) -> Json<Vec<Comment>> {
    let cs = comments.level(comment_ids.0);

    Json(cs)
}

#[post("/<id>", format = "json", data = "<comment>", rank = 3)]
pub fn add_comment(
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
