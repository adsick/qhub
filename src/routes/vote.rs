use super::utils::*;

//testing needed
#[post("/postvote/<id>/<vote>")]
pub fn postvote(
    id: usize,
    vote: i8,
    user: UserAccess,
    articles: State<Articles>,
    users: State<Users>,
) -> JsonValue {
    let username = user.username;
    if articles.get(id).is_none() {
        return json!({"status": "error", "reason": "not found"});
    }
    println!("{} wants to {:+} the article id: {}", username, vote, id);
    let delta = users.postvote(&username, id, vote).unwrap();
    println!("delta: {:?}", delta);
    //the next thing is not good
    match articles.vote(id, delta) {
        Ok((mv, lv)) => {
            //users.postvote(&username, id, delta).ok();
            println!("mv: {:+}, lv: {:+}", mv, lv);
            json!({"status": "success", "morevotes": mv, "lessvotes": lv})
        }
        Err(e) => json!({"status": "error: ".to_string() + &e}),
    }
}
