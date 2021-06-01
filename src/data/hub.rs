use super::{Article, Articles};
use std::collections::HashMap;
use std::sync::RwLock;

pub struct Hubs {
    pub hubs: RwLock<HashMap<String, Hub>>,
}

impl Hubs {
    pub fn new() -> Self {
        Hubs {
            hubs: RwLock::new(HashMap::new()),
        }
    }

    pub fn test() -> Self {
        let hubs = Hubs::new();
        hubs.add("Anime".to_string());
        hubs.add("Vpiska".to_string());
        hubs
    }

    pub fn add(&self, h: String) -> Result<(), String> {
        if self.hubs.read().unwrap().contains_key(&h) {
            return Err("this hub already exists".to_owned());
        }
        self.hubs.write().unwrap().insert(h, Hub::new());
        Ok(())
    }

    // pub fn get(& self, h: String)->&Hub{
    //     let hubs = self.hubs.read().unwrap();
    //     let hub = hubs.get(&h).unwrap();
    //     return hub
    // }

    pub fn query_article(&self, h: &str, id: usize) -> Option<Article> {
        let hubs = self.hubs.read().unwrap();
        let h = hubs.get(h);
        match h {
            Some(h) => h.articles.get(id),
            None => None,
        }
    }
    pub fn post_article(&self, h: &str, article: Article) -> Result<usize, String> {
        let hubs = self.hubs.read().unwrap();
        let h = hubs.get(h);
        match h {
            Some(h) => {
                if let Some(u) = h.articles.add(article) {
                    Ok(u)
                } else {
                    Err("couldn't add article".to_string())
                }
            }
            None => Err("this hub does not exists".to_owned()),
        }
    }
}

pub struct Hub {
    //datetime?
    pub articles: Articles,
}

impl Hub {
    fn new() -> Self {
        Hub {
            articles: Articles::new(),
        }
    }
}
