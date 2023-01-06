using authorization_roles_token.Identity;
using authorization_roles_token.ServiceContract;
using authorization_roles_token.Services;
using authorization_roles_token.Utility;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace authorization_roles_token
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddEntityFrameworkSqlServer().
AddDbContext<ApplicationDbContext>(options => options.UseSqlServer
(Configuration.GetConnectionString("CnSt")));


            services.AddTransient<IRoleStore<ApplicationRole>, ApplicationRoleStore>();
            services.AddTransient<UserManager<ApplicationUser>, ApplicationUserManager>();
            services.AddTransient<SignInManager<ApplicationUser>, ApplicationSignInManager>();
            services.AddTransient<RoleManager<ApplicationRole>, ApplicationRoleManager>();
            services.AddTransient<IUserStore<ApplicationUser>, ApplicationUserStore>();
            services.AddTransient<IUserService, UserServices>();
            services.AddIdentity<ApplicationUser, ApplicationRole>()
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddUserStore<ApplicationUserStore>()
            .AddUserManager<ApplicationUserManager>()
            .AddRoleManager<ApplicationRoleManager>()
            .AddSignInManager<ApplicationSignInManager>()
            .AddRoleStore<ApplicationRoleStore>()
            .AddDefaultTokenProviders();
            services.AddScoped<ApplicationRoleStore>();
            services.AddScoped<ApplicationUserStore>();
            services.AddTransient<IConfigureOptions<SwaggerGenOptions>, ConfigureSwaggerOptions>();


            //add JWT Authentication
            var appSettingSection = Configuration.GetSection("AppSetting");
            services.Configure<AppSetting>(appSettingSection);

            var appSetting = appSettingSection.Get<AppSetting>();
            var key = System.Text.Encoding.ASCII.GetBytes(appSetting.Secret);

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddCookie()
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
            services.AddAuthorization(options =>
            {
                options.AddPolicy("GetClaim", policy => policy.RequireClaim(SD.GetClaim));
                options.AddPolicy("PostClaim", policy => policy.RequireClaim(SD.PostClaim));
            });


            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "authorization_roles", Version = "v1" });
            });

            //configure for frontend
            services.AddCors(options =>
            {
                options.AddPolicy(name: "myPolicy", Builder =>

                {
                    Builder.WithOrigins("http://localhost:3000")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowAnyOrigin();
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "authorization_roles v1"));
            }
            app.UseHttpsRedirection();
            app.UseCors("myPolicy");

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            //Data
            IServiceScopeFactory serviceScopeFactory = app.ApplicationServices.
               GetRequiredService<IServiceScopeFactory>();
            using (IServiceScope scope = serviceScopeFactory.CreateScope())
            {
                var roleManager = scope.ServiceProvider.GetRequiredService
                    <RoleManager<ApplicationRole>>();
                var userManager = scope.ServiceProvider.GetRequiredService
                    <UserManager<ApplicationUser>>();
                /*//Create Admin Role
                if (!await roleManager.RoleExistsAsync("Admin"))
                {
                    var role = new ApplicationRole();
                    role.Name = "Admin";
                    await roleManager.CreateAsync(role);
                }


                //Create Employee Role
                if (!await roleManager.RoleExistsAsync("Employee"))
                {
                    var role = new ApplicationRole();
                    role.Name = "Employee";
                    await roleManager.CreateAsync(role);
                }


                //    //Create Admin User

                if (await userManager.FindByNameAsync("admin") == null)
                {
                    var user = new ApplicationUser();
                    user.UserName = "admin";
                    user.Email = "mailto:admin@gmail.com";
                    var userPassword = "Admin@123";
                    var chkuser = await userManager.CreateAsync(user, userPassword);
                    if (chkuser.Succeeded)
                    {
                        await userManager.AddToRoleAsync(user, "Admin");
                    }
                }

                //Create Employee User

                if (await userManager.FindByNameAsync("employee") == null)
                {
                    var user = new ApplicationUser();
                    user.UserName = "employee";
                    user.Email = "mailto:employee@gmail.com";
                    var userPassword = "Admin@123";
                    var chkuser = await userManager.CreateAsync(user, userPassword);
                    if (chkuser.Succeeded)
                    {
                        await userManager.AddToRoleAsync(user, "Employee");
                    }
                }*/
                /*//Create Visitor Role
                if (!await roleManager.RoleExistsAsync("Visitor"))
                {
                    var role = new ApplicationRole();
                    role.Name = "Visitor";
                    await roleManager.CreateAsync(role);
                }


                //    //Create Visitor User

                if (await userManager.FindByNameAsync("visitor") == null)
                {
                    var user = new ApplicationUser();
                    user.UserName = "visitor";
                    user.Email = "mailto:visitor@gmail.com";
                    var userPassword = "Admin@123";
                    var chkuser = await userManager.CreateAsync(user, userPassword);
                    if (chkuser.Succeeded)
                    {
                        await userManager.AddToRoleAsync(user, "Visitor");
                    }
                }*/
            }


                app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
