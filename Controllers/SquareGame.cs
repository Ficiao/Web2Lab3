using Microsoft.AspNetCore.Mvc;

namespace Lab3.Controllers
{
    public class SquareGame : Controller
    {
        public IActionResult Game()
        {
            return View();
        }
    }
}
