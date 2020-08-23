using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Authentication;
using System.Security.Claims;
using System.Threading.Tasks;
using HomemadePizza.DataContext.Models;
using HomemadePizza.DataContext.Repository;
using HomemadePizza.DataProvider;
using HomemadePizza.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace HomemadePizza.Controllers
{
    [Route("api")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        IUserRepository _repository;
        public LoginController(IUserRepository repository)
        {
            _repository = repository;
        }

        [HttpPost("login")]
        public async Task<User> Login(LoginModel loginModel)
        {
            if (ModelState.IsValid)
            {
                var user = await _repository.GetUser(loginModel.Name, loginModel.Password);
                if(user != null)
                {
                    await Authenticate(user);
                    return user;
                }
            }

            throw new AuthenticationException("Wrong data!");
        }

        [HttpPost("register")]
        public async Task<User> Register(RegisterModel registerModel)
        {
            if(ModelState.IsValid)
            {
                var user = await _repository.AddUser(new User() { Name = registerModel.Name, Password = registerModel.Password });
                if(user != null)
                {
                    await Authenticate(user);
                    return user;
                }
            }

            throw new AuthenticationException("Wrong data!");
        }

        [HttpGet("getUserInfo")]
        [Authorize]
        public async Task<User> GetUserInfo()
        {
            var claimId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            int id;
            if (int.TryParse(claimId, out id))
            {
                return await _repository.GetUser(id);
            }
            throw new AuthenticationException("Something went wrong!");
        }

        [HttpGet("logout")]
        [Authorize]
        public async Task Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        }

        private async Task Authenticate(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Role, "User")
            };

            var claimIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            var authProperties = new AuthenticationProperties
            {                
                ExpiresUtc = DateTime.Now.AddMonths(1)
            };

            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimIdentity),
                authProperties);
        }
    }
}