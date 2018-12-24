extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;

#[wasm_bindgen(module = "/worker/wasm-util")]
extern {
    fn console_log(s: &str);
}

#[wasm_bindgen]
pub fn action(input: &str) -> String {
    let output = if input == "" {
        "".to_string()
    } else {
        format!("Hello, {}!", input)
    };

    console_log(&output);

    output
}
