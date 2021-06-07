use super::utils::*;

//testing needed
#[post("/postvote/<id>", format = "json", data = "<vote>")]
pub fn postvote(
    id: usize,
    vote: Json<i8>,
    user: UserAccess,
    articles: State<Articles>,
    users: State<Users>,
) -> JsonValue {
    let username = user.username;

    if articles.get(id).is_none() {
        return json!({"status": "error", "reason": "not found"});
    }

    let delta = users.postvote(&username, id, vote.0).unwrap();

    //the next thing is not good
    match articles.vote(id, vote.0) {
        Ok(()) => {
            users.postvote(&username, id, delta).ok();
            json!({"status": "success"})
        }
        Err(e) => json!({"status": "error: ".to_string() + &e}),
    }
}
