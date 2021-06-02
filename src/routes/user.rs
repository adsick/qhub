use super::utils::*;

use crate::Users;

#[get("/<username>")]
pub fn get_user(username: String, users: State<Users>) -> JsonValue {
    if let Some(bio) = users.get(username).map(|u| u.bio) {
        json!({"status": "succes", "bio": bio})
    } else {
        json!({"status": "error", "reason": "user does not exists"})
    }
}
