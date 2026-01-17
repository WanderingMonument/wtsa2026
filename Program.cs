using IgniteView.Core;
using IgniteView.Desktop;
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Windows;
using wtsa2026;

public class Program
{
    [STAThread]
    static void Main(string[] args)
    {
        DesktopPlatformManager.Activate();
        var app = new ViteAppManager();

    

        var mainWindow =
            WebWindow.Create()
            .WithTitle("Visual Assistant")
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
        graphics.CopyFromScreen(x, y, 0, 0, new System.Drawing.Size(width, height));
        bmp.Save("screenshot.jpeg", ImageFormat.Jpeg);
        
        Window1 window = new Window1();
        window.Show();

        return ("this is a value returned from C#!");
    }
}