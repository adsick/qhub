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
                std::mem::drop(users); //users will block without it

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

    pub fn login(&self, username: String, password: String) -> Result<(), String> {
        {
            if let Ok(users) = self.users.read() {
                match users.get(&username) {
                    Some(u) => {
                        if u.password == password {
                            return Ok(());
                        } else {
                            return Err("wrong password".to_string());
                        }
                    }
                    None => return Err(format!("user '{}' not found", username)),
                }

                //return Ok(());
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

    //now looks fixed
    pub fn postvote(&self, username: &str, id: usize, vote: i8) -> Result<(i8, i8), String> {
        if let Some(user) = self.users.write().unwrap().get_mut(username) {
            let mv = vote.max(0);
            let lv = -vote.min(0);

            if let Some(old) = user.postvotes.get_mut(&id) {
                let mv = mv - (*old).max(0); //?????????????? ?????????? ?????????????????????? ????????????
                let lv = lv + (*old).min(0);
                *old = vote;

                return Ok((mv, lv));
            } else {
                user.postvotes.insert(id, vote);
                return Ok((mv, lv));
            }
        }
        Err("user not found".to_string())
    }
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
    negative: u32,

    tagvotes: HashMap<usize, i8>,
    postvotes: HashMap<usize, i8>,
    commentvotes: HashMap<usize, i8>,
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

            tagvotes: HashMap::new(),
            postvotes: HashMap::new(),
            commentvotes: HashMap::new(),
        }
    }
}

#[derive(Deserialize, FromForm)]
pub struct PostableUser {
    pub username: String,
    pub password: String,
}

pub struct UserAccess {
    pub username: String,
}

use crate::data::Sessions;
use rocket::http::Status;
use rocket::request::Outcome;
use rocket::State;

//use rocket_contrib::json::Json;
impl<'a, 'r> rocket::request::FromRequest<'a, 'r> for UserAccess {
    type Error = UserAccessError;

    fn from_request(
        request: &'a rocket::Request<'r>,
    ) -> rocket::request::Outcome<Self, Self::Error> {
        let cookies = request.cookies();
        let token = cookies.get("token").map(|c| c.value());
        match token {
            Some(token) => {
                let sessions = request.guard::<State<Sessions>>().unwrap();
                
                match sessions.get(&token) {
                    Some(username) => return Outcome::Success(UserAccess { username }),
                    None => {
                        println!("token: '{}' not found", token);
                        println!("sessions are: {:?}", sessions);
                        return Outcome::Failure((
                            Status::Unauthorized,
                            UserAccessError::SessionExpired,
                        ));
                    }
                }
            }

            None => return Outcome::Forward(()),
            //None => return Outcome::Failure((Status::NotFound, UserAccessError::TokenNotFound)),
        };
    }
}
#[derive(Debug)]
pub enum UserAccessError {
    TokenNotFound,
    SessionExpired,
}
