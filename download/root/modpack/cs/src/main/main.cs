using System.Diagnostics;
class Program {
    static void Main() {
        Process.Start(new ProcessStartInfo {
            FileName = "https://www.endlesspixel.fun/downloads/modpack",
            UseShellExecute = true
        });
    }
}