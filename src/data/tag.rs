#[derive(Serialize, Deserialize, Clone)]
pub struct Tag {
    tag: String,
    morevotes: u32,
    lessvotes: u32,
    //author?
}
