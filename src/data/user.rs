use super::Vote;
use std::collections::HashMap;
use std::hash::Hash;
use std::sync::RwLock;
pub struct Users {
    users: RwLock<HashMap<String, User>>,
}

impl Users {
    pub fn new() -> Self {
        Users {
            users: RwLock::new(HashMap::new()),
        }
    }

    pub fn add(&self, username: String, userdata: User) -> Result<(), String> {
        {
            let users = self.users.read().unwrap();

            if users.contains_key(&username) {
                return Err("this user already exists".to_string());
            }
            //std::mem::drop(users);
            let mut users = self.users.write().unwrap();
            users.insert(username, userdata);
            Ok(())
        }
    }

    pub fn get(&self, username: String) -> Option<User> {
        self.users
            .read()
            .expect("can not obtain users readlock")
            .get(&username)
            .cloned()
    }

    // pub fn find(&self, username: String)->Option<User>{
    //     //self.users.read().expect("can not lock users")
    // }
}

#[derive(Clone)]
pub struct User {
    //username: String,
    password: String, //todo hashing

    //registered datetime
    //last activity datetime
    pub bio: String,
    //contacts
    //honors
    positive: u32, //reputation
    negative: u32, //user settings

    votes: Vec<Vote>,
    //subscriptions: ...
}

impl User {
    fn new(nick: String, pass: String) -> Self {
        User {
            //username: nick,
            password: pass,
            positive: 0,
            negative: 0,
            votes: vec![],
            bio: "".to_string(),
        }
    }
}

// impl PartialEq for User {
//     fn eq(&self, other: &Self) -> bool {
//         self.username == other.username
//     }
// }
