const Menu = require("../../models/menu");
var ObjectId = require('mongodb').ObjectID;
const Categories = require("../../models/categories");
const Offers = require("../../models/offers");

function homeController() {
  return {
    async index(req, res) {
      const categories = await Categories.find();
      const pizzas = await Menu.find();
      const reducedPizzas = [];
      for (let i = 0; i < pizzas.length / 2; i++) {
        reducedPizzas.push(pizzas[i]);
      }
      res.render("home", { categories: categories, pizzas: reducedPizzas });
    },

    async pizzaMenu(req, res) {
      const pizzas = await Menu.find();
      const id = req.params.id;
      const category = await Categories.find({ "_id": ObjectId(req.params.id) });
      const filteredPizzas = [];
      pizzas.forEach((pizza) => {
        pizza.categoryId.forEach((c_id) => {
          if (c_id === id) {
            filteredPizzas.push(pizza);
          };
        });
      });
      res.render("pizzas", { categoryName: category[0].name, pizzas: filteredPizzas });
    },

    async offersMenu(req, res) {
      const offers = await Offers.find();
      res.render("offers", { offers: offers });
    }
  };
}

module.exports = homeController;
