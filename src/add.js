import axios from "axios";
import $ from 'jquery';
import validate from 'jquery-validation';

const add = {
    
    async render() {
        const {data} = await axios.get("http://localhost:3001/categories");
        console.log(data);
        return `
        <h2 class="font-bold py-[10px]">Thêm sản phẩm</h2>
        <form action="" id="add-product">
          <label for="">Name:</label>
          <input class="border-[1px] border-solid-green-600" type="text" name="name" id="name"> <br>
          <label for="">Img:</label>
          <input class="border-[1px] border-solid-green-600" type="text" name="img" id="img"> <br>
          <label for="">Price:</label>
          <input class="border-[1px] border-solid-green-600" type="text" name="price" id="price"> <br>
          <label for="">Desc:</label>
          <input class="border-[1px] border-solid-green-600" type="text" name="desc" id="desc"> <br>
          <label for="">Category:</label>
         <select class="border-[1px] border-solid-green-600" name="" id="cate">
          ${data.map((item) => `
          <option value="${item.id}">${item.name}</option>
          `).join("")}
         </select> <br>
         <button class="bg-yellow-500 p-[5px]">Thêm sản phẩm</button>
        </form>
        `
    },
    afterRender() {
 

        const formadd = $('#add-product');
        formadd.validate({
            rules: {
                "name": {
                    required: true,
                    minlength:5
                },
                "img": {
                    required: true,
                    minlength:5
                },
                "price": {
                    required: true,
                    minlength:5
                },
                "desc": {
                    required: true,
                    minlength:5
                },

            },
            messages: {
                "name": {
                    required: "Khong duoc de trong",
                    minlength: "It nhat 5 ki tu"
                },
                "img": {
                    required: "Khong duoc de trong",
                    minlength: "It nhat 5 ki tu"
                },
                "price": {
                    required: "Khong duoc de trong",
                    minlength: "It nhat 5 ki tu"
                },
                "desc": {
                    required: "Khong duoc de trong",
                    minlength: "It nhat 5 ki tu"
                },
            },
            submitHandler() {
                axios.post("http://localhost:3001/products", {
                    name: $("#name").val(),
                    img: $("#img").val(),
                    price: $("#price").val(),
                    desc: $("#desc").val(),
                })
            }
        })

    }
}
export default add;