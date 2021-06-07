#[derive(Clone, Serialize, Deserialize)]
pub enum Content {
    Post { id: usize },
    Comment { id: usize },
}
