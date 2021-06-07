#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct Tag {
    tag: String,
    morevotes: u32,
    lessvotes: u32,
    //author?
}
