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
    //looks like non best api for this, we need a smooth transition from postable comment to this.
    pub fn add(&self, comment: Comment) -> Result<usize, String> {
        if let Ok(mut comments) = self.comments.write() {
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

impl Comment {
    fn new(author: String, content: String) -> Self {
        Comment {
            author,
            content,
            morevotes: 0,
            lessvotes: 0,
        }
    }
}

#[derive(Deserialize)]
pub struct PostableComment {
    //author: String,
    content: String,
}

impl PostableComment {
    pub fn authorize(self, author: String) -> Comment {
        Comment::new(self.content, author)
    }
}
