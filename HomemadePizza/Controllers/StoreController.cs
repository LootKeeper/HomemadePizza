using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HomemadePizza.DataContext.Models;
using HomemadePizza.DataContext.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HomemadePizza.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        IGoodsRepository _goodsRepository;
        public StoreController(IGoodsRepository goodsRepository)
        {
            _goodsRepository = goodsRepository;
        }
        
        [HttpGet]
        public async Task<List<Pizza>> GetGoodsList()
        {
            return await _goodsRepository.GetAllGoods();
        }
    }
}