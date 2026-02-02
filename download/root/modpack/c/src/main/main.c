#include <cstdlib>
#include <string>

#ifdef _WIN32
#include <windows.h>
#endif

// 要跳转的地址
static const char* TARGET_URL = "https://www.endlesspixel.fun/downloads/modpack";

int main() {
#ifdef _WIN32
    // Windows：ShellExecute 会启动默认浏览器
    ShellExecuteA(nullptr, "open", TARGET_URL, nullptr, nullptr, SW_SHOWNORMAL);
#elif __APPLE__
    // macOS
    std::string cmd = "open \"";
    cmd += TARGET_URL;
    cmd += "\"";
    std::system(cmd.c_str());
#else
    // Linux 或其他 Unix（需有 xdg-open）
    std::string cmd = "xdg-open \"";
    cmd += TARGET_URL;
    cmd += "\"";
    std::system(cmd.c_str());
#endif
    return 0;
}
