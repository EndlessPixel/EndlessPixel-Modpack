import webbrowser, sys, subprocess, platform
url = "https://www.endlesspixel.fun/downloads/modpack"
if platform.system() == "Windows":
    webbrowser.open(url)
else:
    opener = "open" if platform.system() == "Darwin" else "xdg-open"
    subprocess.run([opener, url])