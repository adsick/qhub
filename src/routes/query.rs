use super::utils::*;

#[get("/query?<h>", rank = 2)]
pub fn query_hub(h: String, hubs: State<Hubs>) -> JsonValue {
    //hubs.get(h)
    todo!()
}

#[get("/query?<h>&<id>", rank = 1)]
pub fn query_post(h: String, id: usize, hubs: State<Hubs>) -> Option<Json<Article>> {
    let arcticle = hubs.query_article(&h, id);

    match arcticle {
        Some(a) => Some(Json(a)),
        None => None,
    }
}
