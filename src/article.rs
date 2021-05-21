#[derive(Serialize, Deserialize, Clone)]
pub struct Article {
    title: String,
    author: u32,
    content: String,
    image: String,
    image_title: String
}

impl Article {
    fn lol() {
        todo!()
    }
}
