use rocket::http::{Cookie, Cookies, SameSite};
use rocket::request::Form;

use super::utils::*;

use crate::Users;
//todo format
#[post("/register", data = "<user>")]
pub fn register(
    user: Form<PostableUser>,
    mut cookies: Cookies,
    users: State<Users>,
    sessions: State<Sessions>,
) -> JsonValue {
    let PostableUser { username, password } = user.0;

    match users.add(username.clone(), password) {
        Ok(()) => {
            let token = sessions.new(username);

            let mut cookie = Cookie::new("token", token);
            cookie.set_http_only(true);
            cookie.set_path("/");
            cookie.set_same_site(SameSite::Lax);
            cookies.add(cookie);
            json!({"status": "success"})
        }
        Err(e) => json!({"status": "error", "reason": e}),
    }
}
//todo format
//this can create unnecessary sessions,
#[post("/login", data = "<user>")]
pub fn login(
    user: Form<PostableUser>,
    mut cookies: Cookies,
    users: State<Users>,
    sessions: State<Sessions>,
) -> JsonValue {
    let PostableUser { username, password } = user.0;
    println!(
        "user: {} wants to login with password: {}",
        username, password
    );
    match users.login(username.clone(), password) {
        Ok(()) => {
            println!("login successful");
            let token = sessions.new(username);
            let mut cookie = Cookie::new("token", token);
            cookie.set_http_only(true);
            cookie.set_path("/");
            cookie.set_same_site(SameSite::Lax);
            cookies.add(cookie);
            json!({"status": "success"})
        }

        Err(e) => {
            println!("login failed, reason: {}", e);
            json!({"status": "error", "reason": e})
        }
    }
}

#[get("/<username>")]
pub fn get_user(username: String, users: State<Users>) -> JsonValue {
    if let Some(bio) = users.get(username).map(|u| u.bio) {
        json!({"status": "succes", "bio": bio})
    } else {
        json!({"status": "error", "reason": "user does not exists"})
    }
}
