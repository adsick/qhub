use std::collections::HashMap;
use std::sync::RwLock;
use std::sync::RwLockReadGuard;

use rand::prelude::*;

const LEN: u8 = 8;
#[derive(Debug)]
pub struct Sessions {
    sessions: RwLock<HashMap<String, Session>>,
}

impl Default for Sessions {
    fn default() -> Self {
        Sessions {
            sessions: RwLock::new(HashMap::new()),
        }
    }
}

impl Sessions {
    #[must_use]
    pub fn new(&self, username: String) -> String {
        let mut sessions = self.sessions.write().unwrap();
        println!("generating the token");
        let mut token = generate_token(LEN);

        while sessions.contains_key(&token) {
            token = generate_token(LEN)
        }

        println!("the token '{}' is ready", token);
        sessions.insert(token.clone(), Session::new(username));

        println!("current sessions: {:?}", sessions);

        token
    }

    pub fn get(&self, token: &str) -> Option<String> {
        let sessions = self.sessions.read().unwrap();
        sessions.get(token).map(|s| s.username.to_owned())
    }

    pub fn logout(&self, username: &str) {
        let mut sessions = self.sessions.write().unwrap();
        //sessions.values_mut().for_each(|s| if s.username == username {s.username});
        sessions.retain(|k, v| v.username != username)
    }

    pub fn read(&self) -> RwLockReadGuard<HashMap<String, Session>> {
        self.sessions.read().unwrap()
    }

    fn generate_unique_token(&self, len: u8) -> String {
        //this blocks when called inside of fn new, consider rewrite if needed
        let sessions = self.sessions.read().unwrap();
        let mut token = generate_token(len);

        while sessions.contains_key(&token) {
            token = generate_token(len)
        }
        token
    }
}

#[derive(Debug)]
pub struct Session {
    username: String,
    //some additional stuff like lifetime
}

impl Session {
    fn new(username: String) -> Self {
        Session { username }
    }
}

//random token
fn generate_token(len: u8) -> String {
    let mut res = String::with_capacity(len as usize);
    let mut rng = rand::thread_rng();
    for _ in 0..len {
        res.push(BASE64[rng.gen_range(0..64)] as char);
    }
    res
}

const BASE64: &[u8] = b"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-~";
