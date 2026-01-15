using IgniteView.Core;
using IgniteView.Desktop;
using System.Drawing;

public class Program
{
    [STAThread]
    static void Main(string[] args)
    {
        DesktopPlatformManager.Activate();
        var app = new ViteAppManager();

        var mainWindow =
            WebWindow.Create()
            .WithTitle("Hello, world")
            .Show();

        app.Run();
    }
}

public class Commands
{
    [Command("screenshot")]
    public static string Screenshot()
    {
        return ("this is a value returned from C#!");
    }
}