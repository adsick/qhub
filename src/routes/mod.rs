mod global;
mod query;
mod user;

pub use global::*;
pub use query::*;
pub use user::*;

mod utils {
    pub use crate::data::*;
    pub use rocket::{get, State};
    pub use rocket_contrib::json::{Json, JsonValue};
}
