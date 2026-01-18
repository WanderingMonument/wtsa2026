using System;
using System.Collections.Generic;
using System.Drawing.Printing;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace wtsa2026
{
    public partial class screenshotWindow : Window
    {
        public screenshotWindow()
        {
            InitializeComponent();
        }

        Point firstPoint;
        Point secondPoint;
        bool isTakingScreenshot = false;

        private void Window_MouseDown(object sender, MouseButtonEventArgs e)
        {
            // record first point for future use and enable the Mouse_move function below
            firstPoint = e.GetPosition(this);
            isTakingScreenshot = true;
        }

        private void Window_MouseUp(object sender, MouseButtonEventArgs e)
        {
            isTakingScreenshot = false; 
            secondPoint = e.GetPosition(this);

            // after so much trial and error and documentation reading it turns out theres a math function to get minimum values and i just didn't notice
            // gets the lower value between the begining and endings mouse positions, as well as the width and height and applies it to the rectangle
            double x_pos = Math.Min(firstPoint.X, secondPoint.X);
            double y_pos = Math.Min(firstPoint.Y, secondPoint.Y);

            double width = Math.Abs(firstPoint.X -  secondPoint.X);
            double height = Math.Abs(firstPoint.Y - secondPoint.Y);

            selectionRect.Width = width;
            selectionRect.Height = height;
            selectionRect.Margin = new Thickness(x_pos, y_pos, 0, 0);
            Close();
        }

        private void Window_MouseMove(object sender, MouseEventArgs e)
        {
            if (isTakingScreenshot)
            {
                Point current_mouse_pos = e.GetPosition(this);

                double x_pos = Math.Min(firstPoint.X, current_mouse_pos.X);
                double y_pos = Math.Min(firstPoint.Y, current_mouse_pos.Y);

                double width = Math.Abs(firstPoint.X - current_mouse_pos.X);
                double height = Math.Abs(firstPoint.Y - current_mouse_pos.Y);

                selectionRect.Width = width;
                selectionRect.Height = height;
                selectionRect.Margin = new Thickness(x_pos, y_pos, 0, 0);
            }
        }

        public Dictionary<string, double> screenSelect()
        {
            ShowDialog();
            Dictionary<string, double> points = new Dictionary<string, double> { 
            {"x", selectionRect.Margin.Left},
            {"y", selectionRect.Margin.Top},
            {"width", selectionRect.Width},
            {"height", selectionRect.Height}
            };
            return points;

        }


    }

}
