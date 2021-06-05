use rocket::http::Cookies;

use super::utils::*;

#[post("/postvote/<id>", format = "json", data = "<vote>")]
pub fn postvote(
    id: usize,
    vote: Json<i8>,
    cookies: Cookies,
    articles: State<Articles>,
    users: State<Users>,
    sessions: State<Sessions>,
) -> JsonValue {
    let token = match cookies.get("token") {
        Some(token) => token.to_string(),
        None => return json!({"status": "error", "reason": "session token not found"}),
    };
    let username = match sessions.get(&token) {
        Some(username) => username,
        None => return json!({"status": "err", "reason": "invalid token"}),
    };
    // let username = username.to_owned();

    //the next thing is not good
    match articles.vote(id, vote.0) {
        Ok(()) => {
            users.postvote(&username, id, vote.0);
            json!({"status": "success"})
        }
        Err(e) => json!({"status": "error: ".to_string() + &e}),
    }
}
