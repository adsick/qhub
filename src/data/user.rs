use std::collections::HashMap;

use std::sync::RwLock;
#[derive(Debug)]
pub struct Users {
    users: RwLock<HashMap<String, User>>,
}

impl Users {
    pub fn new() -> Self {
        Users {
            users: RwLock::new(HashMap::new()),
        }
    }
    //mb rename to "register"?
    pub fn add(&self, username: String, password: String) -> Result<(), String> {
        {
            
            if let Ok(users) = self.users.read() {
                
                if users.contains_key(&username) {
                    return Err(format!("username '{}' has already been taken", username));
                }
                std::mem::drop(users);
                
                if let Ok(mut users) = self.users.write() {
                    users.insert(username, User::new(password));
                } else {
                    return Err("failed to get write lock on users".to_string());
                }

                return Ok(());
            }
            Err("users blocked".to_string())
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

#[derive(Clone, Debug)]
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

                   //votes: Vec<Vote>,
                   //subscriptions: ...
}

impl User {
    fn new(pass: String) -> Self {
        User {
            //username: nick,
            password: pass,
            positive: 0,
            negative: 0,
            //votes: vec![],
            bio: "".to_string(),
        }
    }
}

// impl PartialEq for User {
//     fn eq(&self, other: &Self) -> bool {
//         self.username == other.username
//     }
// }

#[derive(Deserialize)]
pub struct PostableUser {
    pub username: String,
    pub password: String,
}

// pub struct UserAccess{
//     pub username: String
// }

// impl<'a, 'r> rocket::request::FromRequest<'a, 'r> for UserAccess{
//     type Error = UserAccessError;

//     fn from_request(request: &'a rocket::Request<'r>) -> rocket::request::Outcome<Self, Self::Error> {
//         let token =
//         match request.cookies().get_private("token"){
//             Some(token) => token.to_string(),
//             None => return Outcome(UserAccessError::TokenNotFound)
            
//         }
//     }
// } 
// #[derive(Debug)]
// enum UserAccessError{
//     TokenNotFound
// }