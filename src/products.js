import axios from "axios";
import { doc } from "prettier";

const products = {
   async render() {
       const {data} = await axios.get("http://localhost:3001/products");
        return ` <table class="border-[1px] border-solid-green-500">
        <tr  class="border-[1px] border-solid-green-500">
          <td  class="border-[1px] border-solid-green-500">Name</td>
          <td  class="border-[1px] border-solid-green-500">Img</td>
          <td  class="border-[1px] border-solid-green-500">Price</td>
          <td  class="border-[1px] border-solid-green-500">Desc</td>
          <td  class="border-[1px] border-solid-green-500">Xoá</td>
          <td  class="border-[1px] border-solid-green-500">Sửa</td>
        </tr>
        ${data.map((item) => `
        <tr  class="border-[1px] border-solid-green-500">
        <td  class="border-[1px] border-solid-green-500">${item.name}</td>
        <td  class="border-[1px] border-solid-green-500"><img src="${item.img}" class="w-[50px]" alt=""></td>
        <td  class="border-[1px] border-solid-green-500">${item.price}</td>
        <td  class="border-[1px] border-solid-green-500">${item.desc}</td>
        <td  class="border-[1px] border-solid-green-500"><button data-id="${item.id}" class="btn btn-del bg-blue-300 p-[5px]">Xoá</button></td>
        <td  class="border-[1px] border-solid-green-500"><a href="/#/product/${item.id}/edit">Edit</a></td>
      </tr>
        `).join("")}
    </table>
    `;
    },
    afterRender() {
        const btns = document.querySelectorAll(".btn");
        btns.forEach((btn) => {
            const id = btn.dataset.id;
            btn.addEventListener("click", () => {
                const confirm = window.confirm("Bạn có chắc chắn muốn xoá?");
                if(confirm) {
                    axios.delete("http://localhost:3001/products/"+id)
                    .then(function(){
                        alert("Success!");
                    }).then(function() {
                        document.location.href="/products";
                    }).catch((error) => {
                        console.log(error);
                    })
                }
            })
        })
    }
}
export default products;