use super::Comment;
use super::Comments;
use super::Tag;

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
    pub fn vote(&self, id: usize, vote: i8) -> Result<(), String> {
        if let Ok(mut articles) = self.articles.write() {
            if let Some(article) = articles.get_mut(id) {
                article.morevotes += vote.max(0) as u32;
                article.lessvotes += -vote.min(0) as u32;
            } else {
                return Err("article not found".to_string());
            }
        } else {
            return Err("articles blocked".to_string());
        }
        Ok(())
    }
    pub fn comment(&self, id: usize, comment: Comment, comments: &Comments) -> Result<(), String> {
        if let Ok(mut articles) = self.articles.write() {
            if let Some(article) = articles.get_mut(id) {
                return match comments.add(comment) {
                    Ok(id) => {
                        article.comments.push(id);
                        Ok(())
                    }
                    Err(e) => Err(e),
                };
            } else {
                return Err("article not found".to_string());
            }
        } else {
            return Err("articles blocked".to_string());
        }
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
    comments: Vec<usize>, //was comments: Comments before
    tags: Vec<Tag>,
}

// #[derive(Serialize, Deserialize, Clone)]
// pub struct ArticleHeader{

// }

impl Article {
    fn header(&self) {}
}
