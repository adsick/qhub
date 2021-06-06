use super::utils::*;

//h is hor hub (one), l is for limit, o is for offset
#[get("/query?<h>&<l>&<o>", rank = 2)]
pub fn query_hub(
    h: String,
    l: Option<usize>,
    o: Option<usize>,
    hubs: State<Hubs>,
    articles: State<Articles>,
) -> JsonValue {
    let limit = match l {
        Some(l) => l.clamp(0, 64),
        None => 64,
    };

    let offset = o.unwrap_or(0);

    if !hubs.hubs.read().unwrap().contains_key(&h) {
        return json!({"status": "error", "reason": "this hub does not extists"});
    }
    let articles = articles.read();
    let iter = articles.iter(); //.nth(offset)..filter(|a|a.hub.contains(&h)).collect();
    let iter = iter.skip(offset).take(limit);
    let iter = iter.filter(|a| a.hub.contains(&h));
    let result: Vec<&Article> = iter.collect();

    json!({"status": "success", "result": result})
    //or mb better just json!(result) ?
}
