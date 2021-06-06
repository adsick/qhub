use super::utils::*;

//h is hor hub (one for now), l is for limit, o is for offset
#[get("/query?<h>&<l>&<o>")]
pub fn query_hub(
    h: Option<String>,
    l: Option<usize>,
    o: Option<usize>,
    //hubs: State<Hubs>,
    articles: State<Articles>,
) -> JsonValue {
    let limit = match l {
        Some(l) => l.clamp(0, 64),
        None => 64,
    };

    let offset = o.unwrap_or(0);

    // if let Some(hub) = h.clone() {
    //     if !hubs.hubs.read().unwrap().contains_key(&hub) {
    //         return json!({"status": "error", "reason": "this hub does not extists"});
    //     }
    // }
    let articles = articles.read();
    let iter = articles.iter().enumerate().skip(offset).take(limit);

    let result: Vec<(usize, &Article)> = if let Some(hub) = h {
        iter.filter(|(id, a)| a.hub.contains(&hub)).collect()
    } else {
        iter.collect()
    };
    //I dunno how to use unzip for now
    //let (ids, posts) = result.iter().unzip::<usize, &Article>();
    let result = json!({"status": "success", "result": result});

    #[cfg(debug_assertions)]
    println!("query result: {}", result.to_string());

    result
    //or mb better just json!(result) ?
}
