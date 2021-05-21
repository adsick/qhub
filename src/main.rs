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

use rocket_contrib::serve::StaticFiles;

use rocket_contrib::json::{Json, JsonValue};

use std::sync::Mutex;

mod article;

use article::*;

#[get("/")]
fn hello() -> Html<String> {
    Html("<h1>Hello, Rust 2018!<h1>".to_string())
}

#[get("/<id>", format = "json")]
fn get(id: u32, map: State<Mutex<Vec<Article>>>) -> Option<Json<Article>> {
    let articles = map.lock().unwrap();

    articles
        .get(id as usize)
        .map(|article| Json(article.clone()))
}

#[post("/<id>", format = "application/json", data = "<article>")]
fn new(id: u32, article: Json<Article>, map: State<Mutex<Vec<Article>>>) -> JsonValue {
    let mut articles = map.lock().expect("articles lock.");
    let result =
    match articles.get(id as usize){
        Some(_) => {json!({"status": "error", "reason": "this index is already used"})}
        None => {articles.push(article.0); json!({"status": "ok"})}
    };
    dbg!(&result);
    result
}

fn main() {
    rocket::ignite()
        .mount("/", routes![hello, new, get])
        .mount("/public", StaticFiles::from("static"))
        .manage(Mutex::new(Vec::<Article>::new()))
        .launch();
}
