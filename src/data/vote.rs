//i'm not sure if it has to be two way linked
use super::Content;
#[derive(Clone, Serialize, Deserialize)]
pub struct Vote {
    value: i8,
    //user?
    content: Content,
}
