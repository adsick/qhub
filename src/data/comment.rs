use std::sync::RwLock;

pub struct Comments {
    comments: RwLock<Vec<Comment>>, //comment tree? (future)
}

impl Comments {
    pub fn new() -> Self {
        Comments {
            comments: RwLock::new(vec![]),
        }
    }

    pub fn add(&self, comment: Comment) -> Result<usize, String> {
        if let Ok(mut comments) = self.comments.write() {
            let id = comments.len();
            comments.push(comment);
            Ok(id)
        } else {
            Err("comments are blocked".to_string())
        }
    }

    pub fn get(&self, id: usize) -> Option<Comment> {
        self.comments.read().ok()?.get(id).cloned()
    }

    //returns all comments with specified indexes
    pub fn level(&self, ids: Vec<usize>) -> Vec<Comment> {
        let comments = self.comments.read().unwrap();
        ids.iter()
            .filter_map(|id| comments.get(*id).cloned())
            .collect()
    }
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
    content: String,
}

impl PostableComment {
    pub fn authorize(self, author: String) -> Comment {
        Comment::new(self.content, author)
    }
}
