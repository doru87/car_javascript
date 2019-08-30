export default class CarView {

      static displayCars(cars){
        let carsHTML ='';
        const productsDOM = document.querySelector('#main-container .row');
            Array.from(cars).forEach(function (car) {
            carsHTML +=`

            <div class="car col-sm-6 col-md-4 col-lg-2"
                <div class="card testimonial-card">
        
                <div class="card-up indigo lighten-1"></div>
        
                <div class="mx-auto white text-center">
                <img src="${car.Picture}" class="image">
                </div>

                <div class="card-body">

                <h4 class="card-title name">${car.Name}</h4>
                <hr>
                Fuel Consumption - <span class="card-text consumption">${car.Miles_per_Gallon}</span>
                <hr>
                Cylinders - <span class="card-text cylinders">${car.Cylinders}</span>
                <hr>
                Displacement - <span class="card-text displacement">${car.Displacement}</span>
                <hr>
                Horsepower - <span class="card-text horsepower">${car.Horsepower}</span>
                <hr>
                Weight - <span class="card-text weight">${car.Weight_in_lbs}</span>
                <hr>
                Acceleration - <span class="card-text acceleration">${car.Acceleration}</span>
                <hr>
                Year of production - <span class="card-text year">${car.Year}</span>
                <hr>
                Origin - <span class="card-text origin">${car.Origin}</span>              
                </div>
            
                </div>
            </div>`;
        });
        productsDOM.innerHTML = carsHTML;

    }

    static adjustImageDimensions(){
        var images = document.querySelectorAll(".image");

        Array.from(images).forEach(image => {
            image.style.height = "200px";
            image.style.width = '200px';
        });
    }
 
    static setEditButton(){
        
        const cards = document.querySelectorAll(".card-body");
        Array.from(cards).forEach(card => {
            var consumption = card.querySelector('.consumption');
            var edit = document.createElement("a");

            edit.href = "#";
            edit.className = "btn btn-info";  
            edit.onclick = function() {
                this.setAttribute('onclick','return false;');
                var input = document.createElement("input");
                input.type = "text";
                input.className = "text";
                input.style.width = '50px';
                input.value = this.previousSibling.innerHTML;
                input.setAttribute('value',this.previousSibling.innerHTML);
                this.previousSibling.innerHTML=" ";
                this.previousSibling.appendChild(input);
                var inputText = consumption.querySelector('.text');
                inputText.onchange = function(){
                    var changed_value = this.value;
                    var car_name = this.parentElement.parentElement.childNodes[3].innerHTML;
                    this.parentElement.innerHTML=changed_value;
                    
                    var data_cars = JSON.parse(localStorage.getItem("data_cars"));
                        data_cars.forEach(function(data_car){
                        if(data_car.Name == car_name){
                            data_car.Miles_per_Gallon = changed_value;
                            localStorage.setItem('data', JSON.stringify(data_cars));
                    }
    
                })
                };
            };

            edit.innerHTML = "Edit";
            consumption.after(edit);
        });
    
    }

    static loadDataLocalStorage(){
        
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function (){
        if (this.readyState == 4 && this.status == 200) {  
            var data = JSON.parse(this.responseText);
            localStorage.setItem('data_cars', JSON.stringify(data));
        }
    }

    xhttp.open("GET", "http://localhost/car_javascript/data/data.json", true);
    xhttp.send();
    }

    static getProducts(){
        var data_cars = JSON.parse(localStorage.getItem("data_cars"));
        return data_cars;
    }

    static thumbnailDisplay(){
        var inputs=document.querySelectorAll("input[type=radio]");
        Array.from(inputs).forEach(input => {
            input.addEventListener("change",function(){
                if(this.id == "option1"){
                    const cards = document.querySelectorAll(".card-body");
                    Array.from(cards).forEach(card => {
                        var regx = new RegExp('\\b' + "col-lg-" + '.*?[0-9]\\b', 'g');
                        card.parentElement.className = card.parentElement.className.replace(regx, '');
                        card.parentElement.classList.add("col-lg-3");
                        card.parentElement.style.marginLeft = 0;

                        CarView.displayPopup();
                    })
                }else if(this.id == "option2"){
                    const cards = document.querySelectorAll(".card-body");
                    Array.from(cards).forEach(card => {
                        var regx = new RegExp('\\b' + "col-lg-" + '.*?[0-9]\\b', 'g');
                        card.parentElement.className = card.parentElement.className.replace(regx, '');
                        card.parentElement.classList.add("col-lg-6");
                        card.parentElement.style.marginLeft = 0;
                        CarView.displayPopup();
                    })
                }else{
                    const cards = document.querySelectorAll(".card-body");
                    Array.from(cards).forEach(card => {
                        var regx = new RegExp('\\b' + "col-lg-" + '.*?[0-9]\\b', 'g');
                        card.parentElement.className = card.parentElement.className.replace(regx, '');
                        card.parentElement.classList.add("col-lg-4");
                        card.parentElement.style.marginLeft = 0;
                        CarView.displayPopup();
                    })
                }
            })

        });
      
    }
static displayPopup(){
    const cards = document.querySelectorAll(".card-body");
    const popup = document.getElementById('popup');
    Array.from(cards).forEach(card => {
        const image = card.parentElement.querySelector(".text-center").querySelector(".image");
        const position = image.getBoundingClientRect();
        const left = position.left;
        const top = position.top;
        const car_name = card.querySelector(".name").innerHTML;
        
        image.onmouseover = function() {
        popup.style.display = 'block';
        popup.style.left = left+'px';
        popup.style.top = top - 220 +'px';
        CarView.popupContent(popup,car_name); 
    }
    image.onmouseout = function() {
      document.getElementById('popup').style.display = 'none';
    }
})
}

static popupContent(popup,car_name){
    var products = CarView.getProducts();
    Array.from(products).forEach(function (product) {
        if(product.Name == car_name){
            popup.innerHTML = product.Description;
        }
    })

}
}

CarView.loadDataLocalStorage();
var products = CarView.getProducts();
CarView.displayCars(products);

CarView.setEditButton();
CarView.thumbnailDisplay();
CarView.displayPopup();
// CarView.adjustImageDimensions();
CarView.adjustImageDimensions();


