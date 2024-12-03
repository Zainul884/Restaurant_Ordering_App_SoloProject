const foodContainer = document.getElementById("food-container")
const orderContainer = document.getElementById("order-container")
const orderDetails = document.getElementById("order-details")
const modal =  document.getElementById('modal')


const menuArray = [
    {
        name: "Pizza",
        ingredients: ["pepperoni", "mushrom", "mozarella"],
        id: 0,
        price: 14,
        emoji: "🍕"
    },
    {
        name: "Hamburger",
        ingredients: ["beef", "cheese", "lettuce"],
        price: 12,
        emoji: "🍔",
        id: 1
    },
        {
        name: "Beer",
        ingredients: ["grain, hops, yeast, water"],
        price: 12,
        emoji: "🍺",
        id: 2
    }
]

document.addEventListener("click", function(e) {
    if (e.target.dataset.button == 0) {
       console.log('0')
       add(0) 
    }
    else if (e.target.dataset.button == 1) {
        console.log("1")
        add(1) 
    }
    else if (e.target.dataset.button == 2) {
        console.log("2")
        add(2)
    } else if (e.target.dataset.remove == 0) {
        console.log('0R')
        remove(0)
    }
    else if (e.target.dataset.remove == 1) {
        console.log("1R")
        remove(1)
    }
    else if (e.target.dataset.remove == 2) {
        console.log("2R")
        remove(2)
    } else if (e.target.id == 'complete-btn') {
       document.getElementById('modal').classList.toggle('hidden')
       document.body.classList.add('dull-body')
    } else if (e.target.id === 'pay-btn') {
        e.preventDefault()
        pay()
    }
})

function pay() {
    const thanksContainer = document.getElementById('thanks')
    thanksContainer.classList.remove('hidden')
    orderContainer.classList.toggle('hidden')
    modal.classList.toggle('hidden')
    document.body.classList.remove('dull-body')
    const inputValue = document.getElementById('name').value
    thanksContainer.innerHTML = `<h1>Thanks, ${inputValue}! Your order is on its way!</h1>`
}

function renderFoodItems() {
    let currentItems = ""
    menuArray.map(function(item) {
        const {name, ingredients, id, price, emoji} = item
        currentItems += `
        <div class='full-item'>
            <div class='individual-item'>
                <p>${emoji}</p>
                <div class='individual-item-details'>
                    <h1>${name}</h1>
                    <h2>${ingredients}</h2>
                    <h3>$${price}</h3>
                </div>
                <button data-button=${id}>+</button>
            </div>
        </div>
            
        `
        return currentItems
    }) 
    foodContainer.innerHTML = currentItems
}

renderFoodItems()


// variables
let pricePizza = 0
let priceBurger = 0
let priceBeer = 0

function add(foodId) {
   if (orderContainer.classList.contains("hidden")) {
    orderContainer.classList.remove("hidden")
   }

    if (foodId == 0) {
        pricePizza += menuArray[foodId].price
    } else if (foodId == 1) {
        priceBurger += menuArray[foodId].price
    } else if (foodId == 2) {
        priceBeer += menuArray[foodId].price
    }
    renderHTML(foodId)
}


function remove(foodId) {
   if (foodId == 0) {
    pricePizza -= menuArray[foodId].price
    console.log(pricePizza)
   } else if (foodId == 1) {
    priceBurger -= menuArray[foodId].price
   } else if (foodId == 2) {
    priceBeer -= menuArray[foodId].price
   } 
   renderHTML(foodId)
}

function renderHTML(foodId) {
    let pizzaItemClass = pricePizza > 0 ? '' : 'hidden';
    let burgerItemClass = priceBurger > 0 ? '': 'hidden';
    let beerItemClass = priceBeer > 0 ? '' : 'hidden';
    const totalPrice = pricePizza + priceBurger + priceBeer
    orderDetails.innerHTML = 
    ` 
        <h1>Your Orders</h1>
        <div id="food-item-pizza" class="food-item-pizza ${pizzaItemClass}">
            <div class="name-remove">
                <h2>Pizza</h2>
                <button class="remove-btn" data-remove="${foodId}">remove</button>
            </div>
            <p>$${pricePizza}</p>
        </div>
        <div class="food-item-burger  ${burgerItemClass}" >
           <div class="name-remove">
                <h2>Burger</h2>
                <button class="remove-btn" data-remove="${foodId}" >remove</button>
            </div>
            <p>$${priceBurger}</p>
        </div>
         <div class="food-item-beer ${beerItemClass}" >
            <div class="name-remove">
                <h2>Beer</h2>
                <button class="remove-btn" data-remove="${foodId}">remove</button>
            </div>
            <p>$${priceBeer}</p>
        </div>
        <div class="food-total">
            <h3>Total price: </h3>
            <p>$${totalPrice}</p>
        </div>
        <div class='complete-btn'>
            <button id='complete-btn'>Complete Order</button>
        </div>`
}