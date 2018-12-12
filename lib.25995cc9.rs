#[macro_use]
extern crate serde_derive;

extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;

#[derive(Serialize, Deserialize)]
struct Res {
    input: String,
    output: String,
}

#[wasm_bindgen]
pub fn greet(input: &str) -> JsValue {
    let output = if input == "" {
        "".to_string()
    } else {
        format!("Hello, {}!", input)
    };

    let result = Res {
        input: input.to_string(),
        output,
    };

    JsValue::from_serde(&result).unwrap()
}
