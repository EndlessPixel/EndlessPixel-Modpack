import java.awt.Desktop;
import java.net.URI;

public class LaunchBrowser {

    // 要跳转的地址
    private static final String TARGET_URL = "https://www.endlesspixel.fun/downloads/modpack";

    public static void main(String[] args) {
        openUrl(TARGET_URL);
    }

    /**
     * 跨平台打开系统默认浏览器
     */
    private static void openUrl(String url) {
        try {
            if (Desktop.isDesktopSupported() && Desktop.getDesktop().isSupported(Desktop.Action.BROWSE)) {
                // Windows / macOS / Linux（有图形环境）
                Desktop.getDesktop().browse(new URI(url));
            } else {
                // 纯命令行 fallback
                String os = System.getProperty("os.name").toLowerCase();
                ProcessBuilder pb;
                if (os.contains("win")) {
                    pb = new ProcessBuilder("rundll32", "url.dll,FileProtocolHandler", url);
                } else if (os.contains("mac")) {
                    pb = new ProcessBuilder("open", url);
                } else { // Linux / Unix
                    pb = new ProcessBuilder("xdg-open", url);
                }
                pb.start();
            }
        } catch (Exception e) {
            System.err.println("无法自动打开浏览器: " + e.getMessage());
        }
    }
}
