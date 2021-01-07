const Menu = require("../../models/menu");
const Categories = require("../../models/categories");

function homeController() {
  return {
    async index(req, res) {
      const categories = await Categories.find();
      res.render("home", { categories: categories });
    },

    async pizzaMenu(req, res) {
      const categoryName = req.body.categoryName;
      const id = req.body.category_id;
      const pizzas = await Menu.find();
      const filteredPizzas = [];
      pizzas.forEach((pizza) => {
        pizza.categoryId.forEach((c_id) => {
          if (c_id === id) {
            filteredPizzas.push(pizza);
          };
        });
      });
      res.render("pizzas", { categoryName: categoryName, pizzas: filteredPizzas });
    }
  };
}

module.exports = homeController;
