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

mod routes;
use routes::*;

#[get("/")]
fn hello() -> Html<String> {
    Html("<h1>Hello, Rust 2018!<h1>".to_string())
}

#[post("/<h>", format = "application/json", data = "<article>")] //deprecated
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
        .mount("/global", routes![post_article, get_article]) //сюда постить, номер при постинге указывать не надо. возвращает джисон-результат
        .mount("/user", routes![get_user, login, register])
        .mount("/", routes![query_hub, query_post, post_article_in_hub])
        .mount("/", StaticFiles::from("static")) //move it to public or smth in the future
        .manage(Articles::new())
        .manage(Users::new())
        .manage(Hubs::test())
        .manage(Sessions::default())
        .launch();
}
