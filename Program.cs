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
    public static string Screenshot()
    {

        screenshotWindow window = new screenshotWindow();
        Dictionary<string, double> value = window.screenSelect();

        int x = ((int)value["x"]);
        int y = ((int)value["y"]);
        int width = ((int)value["width"]);
        int height = ((int)value["height"]);

        Bitmap bmp = new Bitmap(width, height); // init a blank image to work with
        Graphics graphics = Graphics.FromImage(bmp); // create a graphics object from the bitmap so we can use CopyFromScreen
        graphics.CopyFromScreen(x, y, 0, 0, new System.Drawing.Size(width, height));
        bmp.Save("screenshot.jpg", ImageFormat.Jpeg);


        string filepath = System.IO.Path.GetFullPath("screenshot.jpg");
        return (filepath);
    }
}