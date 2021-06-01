use std::sync::RwLock;

pub struct Users{
    users: RwLock<Vec<User>>
}

impl Users{
    pub fn new()->Self{
        Users{users: RwLock::new(vec![])}
    }

    pub fn add(&self, user: User)->Result<usize, String>{
        {
            let users = self.users.read().unwrap();
            if users.contains(&user){
                return Err("this user already exists".to_string())
            }
            //std::mem::drop(users);
            let mut users = self.users.write().unwrap();
            users.push(user);
            Ok(users.len())


        }

    }

    pub fn get(&self, id: usize)->Option<User>{
        self.users.read().expect("can not obtain users readlock").get(id).cloned()
    }

}


#[derive(Clone)]
pub struct User{
    username: String,
    password: String,

    //registered datetime
    //last activity datetime

    positive: u32, //reputation
    negative: u32

    //user settings
}

impl User{
    fn new(nick: String, pass: String)->Self{
        User{username: nick, password: pass, positive: 0, negative: 0 }
    }
}

impl PartialEq for User{
    fn eq(&self, other: &Self) -> bool {
        self.username == other.username
    }
}