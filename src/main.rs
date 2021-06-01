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

//type articles = RwLock<Vec<Article>>;
//type users = RwLock<Vec<User>>;

mod data;
use data::*;

//use std::sync::RwLock;

#[get("/")]
fn hello() -> Html<String> {
    Html("<h1>Hello, Rust 2018!<h1>".to_string())
}

#[get("/<id>", format = "json")]
fn get(id: usize, articles: State<Articles>) -> Option<Json<Article>> {
    //let articles = map.read().unwrap();

    articles.get(id).map(|article| Json(article.clone()))
}

#[post("/", format = "application/json", data = "<article>")]
fn post(article: Json<Article>, articles: State<Articles>) -> JsonValue {
    let result = match articles.add(article.to_owned()) {
        None => {
            json!({"status": "error", "reason": "unknown"})
        }
        Some(id) => {
            json!({"status": "success", "id":  id})
        }
    };

    //dbg!(result.to_string());
    result
}

fn main() {
    rocket::ignite()
        .mount("/post", routes![post, get])
        .mount("/", StaticFiles::from("static"))
        .manage(Articles::new())
        .manage(Users::new())
        .launch();
}
