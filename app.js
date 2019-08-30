import CarView from "./views/CarView.js";

export default class Cars{
    getSelectValue(){
        var list = document.getElementById("list");
        list.addEventListener('change',  function(){
            var selectedValue = document.getElementById("list").value;
            if(selectedValue == "consumption"){
                Array.prototype.slice.call(document.querySelectorAll(".card-body")).sort(function (ea, eb) {
                    var a = ea.querySelector(".consumption");
                    var b = eb.querySelector(".consumption");
                    if (a.innerHTML < b.innerHTML) { 
                        return -1;
                     }else{
                         return 1;
                     }
                }).forEach(function(div) {
                    div.parentElement.parentElement.appendChild(div.parentElement);
                    CarView.displayPopup();
                });
            }else if(selectedValue == "horsepower"){
                const items = document.querySelectorAll(".card-body");
                Array.prototype.slice.call(document.querySelectorAll(".card-body")).sort(function (ea, eb) {
                    var a = ea.querySelector(".horsepower");
                    var b = eb.querySelector(".horsepower");
                    return b.innerHTML-a.innerHTML;
                }).forEach(function(div) {
                    div.parentElement.parentElement.appendChild(div.parentElement);
                    CarView.displayPopup();
                });
            }else if(selectedValue == "acceleration"){
                const items = document.querySelectorAll(".card-body");
                Array.prototype.slice.call(document.querySelectorAll(".card-body")).sort(function (ea, eb) {
                    var a = ea.querySelector(".acceleration");
                    var b = eb.querySelector(".acceleration");
                    if (a.innerHTML < b.innerHTML) { 
                        return -1;
                     }else{
                         return 1;
                     }
                }).forEach(function(div) {
                    div.parentElement.parentElement.appendChild(div.parentElement);
                    CarView.displayPopup();
                });
            }
            
        });
        }  
}
const cars = new Cars();
cars.getSelectValue();





