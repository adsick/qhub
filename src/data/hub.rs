//use super::{Article, Articles};
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
        hubs.add("Rust".to_string());
        hubs
    }

    pub fn add(&self, h: String) -> Result<(), String> {
        if self.hubs.read().unwrap().contains_key(&h) {
            return Err("this hub already exists".to_owned());
        }
        self.hubs.write().unwrap().insert(h, Hub::new());
        Ok(())
    }
}

pub struct Hub {
    //datetime?
//pub articles: Articles,
}

impl Hub {
    fn new() -> Self {
        Hub {
            //articles: Articles::new(),
        }
    }
}
