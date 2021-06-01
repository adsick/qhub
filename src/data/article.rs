use std::sync::RwLock;
pub struct Articles {
    articles: RwLock<Vec<Article>>,
}

impl Articles {
    pub fn new() -> Self {
        Articles {
            articles: RwLock::new(vec![]),
        }
    }
    pub fn add(&self, article: Article) -> Option<usize> {
        let mut articles = self.articles.write().ok()?;
        let id = articles.len();
        articles.push(article);
        Some(id)
    }
    pub fn get(&self, id: usize) -> Option<Article> {
        self.articles.read().ok()?.get(id).cloned()
    }
}

#[derive(Serialize, Deserialize, Clone)]
pub struct Article {
    title: String,
    author: String,

    content: String,
    //datetime (todo?)
    image: String,
    image_title: String,
    image_description: String,

    //attachments (future)
    morevotes: u32,
    lessvotes: u32,
}

// #[derive(Serialize, Deserialize, Clone)]
// pub struct ArticleHeader{

// }

impl Article {
    fn header(&self) {}
}
