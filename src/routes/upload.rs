use super::utils::*;
use rocket::{response::NamedFile, Data};
use std::{io, path::Path};
#[post("/<f>", data = "<data>")]
pub fn upload(f: String, data: Data) -> JsonValue {
    match data.stream_to_file("upload/".to_string() + &f) {
        Ok(a) => {
            println!("file '{}' was succesfully posted, len = {}", f, a);
            json!({"status": "success"})
        }
        Err(e) => {
            println!("couldn't upload the file '{}', reason: {}", f, e);
            json!({"status": "error", "reason": e.to_string()})
        }
    }
}

#[get("/<f>")]
pub fn download(f: String) -> io::Result<NamedFile> {
    NamedFile::open("upload/".to_string() + &f)
}
