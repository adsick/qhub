use super::{Comment, Comments, Tag};

use std::sync::{RwLock, RwLockReadGuard};
#[derive(Debug)]
pub struct Articles {
    articles: RwLock<Vec<Article>>,
}

impl Articles {
    pub fn new() -> Self {
        Articles {
            articles: RwLock::new(vec![]),
        }
    }
    pub fn add(&self, article: Article) -> usize {
        let mut articles = self.articles.write().unwrap();
        let id = articles.len();
        articles.push(article);
        id
    }
    pub fn get(&self, id: usize) -> Option<Article> {
        self.articles.read().ok()?.get(id).cloned()
    }

    pub fn vote(&self, id: usize, delta: (i8, i8)) -> Result<(i32, i32), String> {
        if let Ok(mut articles) = self.articles.write() {
            if let Some(article) = articles.get_mut(id) {
                //let oldmore = article.morevotes;
                //let oldless = article.lessvotes;
                // *mv += vote.max(0) as u32;
                // *lv += (-vote.min(0)) as u32;
                let (mv, lv) = delta;
                if mv >= 0 {
                    article.morevotes += mv as u32;
                } else {
                    article.morevotes -= (-mv) as u32;
                }
                if lv >= 0 {
                    article.lessvotes += lv as u32;
                } else {
                    article.lessvotes -= (-lv) as u32;
                }

                //println!("mv: {}, lv: {}", ol, *lv);
                return Ok((article.morevotes as i32, article.lessvotes as i32));
            } else {
                return Err("article not found".to_string());
            }
        } else {
            return Err("articles blocked".to_string());
        }
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

    pub fn read(&self) -> RwLockReadGuard<Vec<Article>> {
        self.articles.read().unwrap()
    }
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct Article {
    pub title: String,
    pub author: String,
    pub hub: String, //new
    pub content: String,

    //datetime (todo?)
    pub image: String,
    image_title: String,
    image_description: String,

    //attachments (future)
    morevotes: u32,
    lessvotes: u32,
    comments: Vec<usize>,
    tags: Vec<Tag>,
}

impl Default for Article {
    fn default() -> Self {
        Article {
            title: "".to_string(),
            author: "".to_string(),
            hub: "".to_string(),
            content: "".to_string(),

            image: "".to_string(),
            image_title: "".to_string(),
            image_description: "".to_string(),

            morevotes: 0,
            lessvotes: 0,
            comments: vec![],
            tags: vec![],
        }
    }
}

#[derive(Deserialize, Debug)]
pub struct PostableArticle {
    pub title: String,
    pub hub: String,
    pub content: String,

    pub image: String,
    image_title: String,
    image_description: String,
}

impl PostableArticle {
    pub fn authorize(self, username: String) -> Article {
        let mut article = Article::default();

        article.title = self.title;

        article.author = username;

        article.hub = self.hub;
        article.content = self.content;

        article.image = self.image;
        article.image_title = self.image_title;
        article.image_description = self.image_description;

        article
    }
}
