pub struct Comments {
    //todo
}

#[derive(Serialize, Deserialize, Clone)]
pub struct Comment {
    author: usize,
    content: String,
}
