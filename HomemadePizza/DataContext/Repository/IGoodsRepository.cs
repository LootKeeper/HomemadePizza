using HomemadePizza.DataContext.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomemadePizza.DataContext.Repository
{
    public interface IGoodsRepository
    {
        Task<List<Pizza>> GetAllGoods();
    }
}
