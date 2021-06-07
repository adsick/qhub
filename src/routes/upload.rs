use super::utils::*;
use rocket::Data;

#[post("/upload", data = "<data>")]
fn upload(data: Data)->JsonValue{
data.stream_to_file("/upload").ok();
json!({"status": "successful"})
}