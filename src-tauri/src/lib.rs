// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

use fs_extra::dir;
use std::time::Instant;
use xcap::Monitor;

fn normalized(filename: String) -> String {
    filename.replace(['|', '\\', ':', '/'], "")
}


fn screenshot(x: u32, y: u32, width: u32, height: u32) -> Result<String, Box<dyn std::error::Error>>{
    let monitors = Monitor::all()?;
    dir::create_all("target/monitors", true).unwrap();

    // Define the region dimensions to capture from each monitor
   // let region_width = 400u32;
   // let region_height = 300u32;
   let region_width = width;
   let region_height = height;
    let mut last_filename = String::new();


    // Track total time for all captures
    let total_start = Instant::now();

    println!("Capturing regions from {} monitors...", monitors.len());

    // Iterate through all available monitors
    for monitor in monitors {
        // Calculate center of the monitor for region capture
        let x = x;
        let y = y;

        // Capture the region
        let start = Instant::now();
        let image = monitor.capture_region(x, y, region_width, region_height)?;

        // Get monitor name for the filename
        let monitor_name = monitor
            .name()
            .unwrap_or_else(|_| format!("unknown-{}", monitor.id().unwrap_or(0)));
        let is_primary = monitor.is_primary().unwrap_or(false);
        let primary_indicator = if is_primary { "-primary" } else { "" };

        println!(
            "Monitor '{}'{}: Time to capture region of size {}x{}: {:?}",
            monitor_name,
            primary_indicator,
            image.width(),
            image.height(),
            start.elapsed()
        );

        // Save the image
        let filename = format!(
            "target/monitors/monitor-{}{}-region.png",
            normalized(monitor_name),
            primary_indicator
        );

        image.save(&filename).unwrap();
        println!("Saved to {filename}");
        last_filename = filename;
        
    }
    Ok(last_filename)
}


#[tauri::command]
fn greet() -> String {
    let screen_capture= screenshot(0, 0, 900, 900).unwrap();
    let result = format!("/src-tauri/{}", screen_capture);
    result
}



#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
