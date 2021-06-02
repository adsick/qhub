use std::sync::RwLock;

pub struct Comments {
    comments: RwLock<Vec<Comment>>, //comment tree? (future)
}

impl Comments {
    fn new() -> Self {
        Comments {
            comments: RwLock::new(vec![]),
        }
    }

    pub fn add(&self, author: String, content: String) -> Result<usize, String> {
        if let Ok(mut comments) = self.comments.write() {
            let comment = Comment {
                author,
                content,
                morevotes: 0,
                lessvotes: 0,
            };
            let id = comments.len();
            comments.push(comment);
            Ok(id)
        } else {
            Err("comments are blocked".to_string())
        }
    }

    fn from_disk() {
        todo!()
    } //constructor
}

#[derive(Serialize, Deserialize, Clone)]
pub struct Comment {
    author: String, //using String as user id is not memory efficient, think about it
    content: String,
    //to
    morevotes: u32,
    lessvotes: u32,
    //datetime
    //votes
    //subcomments?
    //tags?
}

#[derive(Deserialize)]
pub struct PostableComment{
    author: String,
    content: String
}