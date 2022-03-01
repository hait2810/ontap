import Navigo from "navigo";
import add from "./add";
import edit from "./edit";
import home from "./home";
import products from "./products";

const router = new Navigo("/", { linksSelector: "a", hash: true });

const print = async (component, id) => {
  document.querySelector("#app").innerHTML = await component.render(id);
  if (component.afterRender) await component.afterRender(id);
};

router.on({
  "/": () => {
    print(home)
  },
  "/products": () => {
    print(products);
  },
  "/product/add":() => {
    print(add);
  },
  "/product/:id/edit": ({data}) => {
    print(edit, data.id);
  }
});

router.resolve();
