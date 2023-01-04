using authorization_roles_token.Identity;
using authorization_roles_token.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace authorization_roles_token.Controllers
{
    [Route("api/Employee")]
    [ApiController]
    
    public class EmployeeController : Controller
    {
        private readonly ApplicationDbContext _context;
        public EmployeeController(ApplicationDbContext context)
        {
            _context = context;
        }
        [Authorize]
        [HttpGet]
        public IActionResult GetEmployees()
        {
            var x = _context.Employees.ToList();
            return Ok(x);
        }
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult SaveEmployees(Employee employee)
        {
            _context.Employees.Add(employee);
            _context.SaveChanges();
            return Ok("Data Saved SuccessFully");
        }
    }
}
