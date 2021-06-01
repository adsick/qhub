#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;
#[macro_use]
extern crate rocket_contrib;
#[macro_use]
extern crate serde_derive;

use rocket::response::content::Html;
use rocket::State;
use rocket::{get, routes};

use rocket_contrib::json::{Json, JsonValue};
use rocket_contrib::serve::StaticFiles;

mod data;
use data::*;

//use std::sync::RwLock;

#[get("/")]
fn hello() -> Html<String> {
    Html("<h1>Hello, Rust 2018!<h1>".to_string())
}

#[get("/<id>", format = "json")]
fn get_article(id: usize, articles: State<Articles>) -> Option<Json<Article>> {
    articles.get(id).map(|article| Json(article.clone()))
}

#[post("/", format = "application/json", data = "<article>")]
fn post_article(article: Json<Article>, articles: State<Articles>) -> JsonValue {
    
    match articles.add(article.to_owned()) {
        None => {
            json!({"status": "error", "reason": "unknown"})
        }
        Some(id) => {
            json!({"status": "success", "id":  id})
        }
    }
}

#[get("/<username>")]
fn get_user(username: String, users: State<Users>)->JsonValue{
    if let Some(bio) = users.get(username).map(|u|u.bio){
        json!({"status": "succes", "bio": bio})
    } else {
        json!({"status": "error", "reason": "user does not exists"})
    }
}

#[get("/query?<h>", rank = 2)]
fn query_hub(h: String, hubs: State<Hubs>)->JsonValue{
    //hubs.get(h)
    todo!()
}

#[get("/query?<h>&<id>", rank = 1)]
fn query_post(h: String, id: usize, hubs: State<Hubs>)->Option<Json<Article>>{
    let arcticle =
    hubs.query_article(&h, id);

    match arcticle{
        Some(a) => Some(Json(a)),
        None => None
    }
}

#[post("/<h>", format = "application/json", data = "<article>")]
fn post_article_in_hub(article: Json<Article>, h: String, hubs: State<Hubs>) -> JsonValue {
    
    match hubs.post_article(&h, article.0) {
        Err(e) => {
            json!({"status": "error: ".to_string() + &e, "reason": "unknown"})
        }
        Ok(id) => {
            json!({"status": "successfuly posted to ".to_string() + &h, "id":  id})
        }
    }
}

fn main() {
    rocket::ignite()
        .mount("/post", routes![post_article, get_article])//сюда постить, номер при постинге указывать не надо. возвращает джисон-результат
        .mount("/user", routes![get_user])
        .mount("/", routes![query_hub, query_post, post_article_in_hub])
        .mount("/", StaticFiles::from("static")) //move it to public or smth in the future
        .manage(Articles::new())
        .manage(Users::new())
        .manage(Hubs::test())
        .launch();
}
