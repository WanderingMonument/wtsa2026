using IgniteView.Core;
using IgniteView.Desktop;
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.CompilerServices;


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
    public static string Screenshot(int x, int y, int width, int height)
    {
        Bitmap bmp = new Bitmap(width, height);
        Graphics graphics = Graphics.FromImage(bmp);
        graphics.CopyFromScreen(x, y, 0, 0, new Size(width, height));
        bmp.Save("screenshot", ImageFormat.Jpeg);
        return ("this is a value returned from C#!");
    }
}