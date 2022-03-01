import axios from "axios";
import $ from 'jquery';
import validate from 'jquery-validation';
import { doc } from "prettier";

const edit = {
   async render(id) {
        const {data} = await axios.get("http://localhost:3001/products/"+id);
        console.log(data);
        return `
        <h2 class="font-bold py-[10px]">Sửa sản phẩm</h2>
        <form action="" id="edit-product">
          <label for="">Name:</label>
          <input class="border-[1px] border-solid-green-600" value="${data.name}" type="text" name="name" id="name"> <br>
          <label for="">Img:</label>
          <input class="border-[1px] border-solid-green-600" value="" type="text" name="img" id="img">
          <img src="${data.img}" class="w-[50px]" />
          <br>
          <label for="">Price:</label>
          <input class="border-[1px] border-solid-green-600" value="${data.price}" type="text" name="price" id="price"> <br>
          <label for="">Desc:</label>
          <input class="border-[1px] border-solid-green-600" value="${data.desc}" type="text" name="desc" id="desc"> <br>
          <label for="">Category:</label>
         <select class="border-[1px] border-solid-green-600" name="" id="cate">
          
         </select> <br>
         <button class="bg-yellow-500 p-[5px]">Thêm sản phẩm</button>
        </form>
        `;
    },
    afterRender(id) {
 
        var opt = {
            url: "http://localhost:3001/categories",
            responseType: "json"
        }
        axios(opt)
        .then(function(item) {
           var itemg = item.data;
            var show = "";
            itemg.forEach(element => {
                show += `
                <option value="${element.id}">${element.name}</option>
                `;
            });
            document.querySelector("#cate").innerHTML = show;
        })
        const formedit = $('#edit-product');
        formedit.validate({
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
                axios.put("http://localhost:3001/products/"+id, {
                    name: $("#name").val(),
                    img: $("#img").val(),
                    price: $("#price").val(),
                    desc: $("#desc").val(),
                    id,
                })
            }
        })

    }
}
export default edit;