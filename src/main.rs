#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;
#[macro_use]
extern crate rocket_contrib;
#[macro_use]
extern crate serde_derive;

use rocket::response::content::Html;
use rocket::{get, routes};
use rocket_contrib::serve::StaticFiles;

mod data;
use data::*;

mod routes;
use routes::*;

#[get("/")]
fn hello() -> Html<String> {
    Html("<h1>Hello, Rust 2018!<h1>".to_string())
}

fn main() {
    rocket::ignite()
        .mount("/global", routes![post_article, get_article]) //сюда постить, номер при постинге указывать не надо. возвращает джисон-результат
        .mount("/user", routes![get_user, login, register])
        .mount("/comment", routes![get_comment, get_level, add_comment])
        .mount("/", routes![query_hub, postvote])
        .mount("/", StaticFiles::from("static")) //move it to public or smth in the future
        .manage(Articles::new())
        .manage(Users::new())
        .manage(Comments::new())
        .manage(Sessions::default())
        .launch();
}
