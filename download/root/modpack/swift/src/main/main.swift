import Foundation
let url = URL(string: "https://www.endlesspixel.fun/downloads/modpack")!
NSWorkspace.shared.open(url)          // macOS
// UIApplication.shared.open(url)     // iOS 需要 App 环境