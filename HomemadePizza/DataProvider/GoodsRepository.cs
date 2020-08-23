using HomemadePizza.DataContext.Models;
using HomemadePizza.DataContext.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomemadePizza.DataProvider
{
    public class GoodsRepository : IGoodsRepository
    {
        private DataBaseContext _context;
        public GoodsRepository(DataBaseContext context)
        {
            this._context = context;
        }

        public async Task<List<Pizza>> GetAllGoods()
        {
            return await _context.Pizzas.ToListAsync();
        }
    }
}
