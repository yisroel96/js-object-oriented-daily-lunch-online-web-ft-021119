// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

// Neighborhood Class ///////////////////
let neighborhoodId = 0
class Neighborhood {
   constructor(name) {
      this.name = name
      this.id = ++neighborhoodId
      store.neighborhoods.push(this)
   }

   deliveries() {
      return store.deliveries.filter(
         function (delivery) {
            return delivery.neighborhoodId === this.id
         }.bind(this)
      )
   }

   customers() {
      return store.customers.filter(
         function (customer) {
            return customer.neighborhoodId === this.id
         }.bind(this)
      )
   }

   meals() {
      let allMeals =  this.deliveries().map(
         function (delivery) {
            return delivery.meal()
         }
      )

      return [... new Set(allMeals)]
   }
}

// Customer Class ///////////////////
let customerId = 0
class Customer {
   constructor(name, neighborhoodId) {
      this.name = name
      this.neighborhoodId = neighborhoodId
      this.id = ++customerId
      store.customers.push(this)
   }

   deliveries() {
      return store.deliveries.filter(
         function (delivery) {
            return delivery.customerId === this.id
         }.bind(this)
      )
   }

   meals() {
      return this.deliveries().map(
         function (delivery) {
            return delivery.meal()
         }
      )
   }

   totalSpent() {
      let sum = 0
      this.meals().forEach(function (meal) {
         sum += meal.price
      })

      return sum
   }
}


// Meal Class ///////////////////
let mealId = 0
class Meal {
   constructor(title, price) {
      this.title = title
      this.price = price
      this.id = ++mealId
      store.meals.push(this)
   }

   deliveries() {
      return store.deliveries.filter(
         function (delivery) {
            return delivery.mealId === this.id
         }.bind(this)
      )
   }

   customers() {
      return this.deliveries().map(
         function (delivery) {
            return delivery.customer()
         }
      )
   }
}

Meal.byPrice = function () {
   return store.meals.sort(function (a,b) {
      return b.price - a.price
   })
}

// Delivery Class ///////////////////
let deliveryId = 0
class Delivery {
   constructor(mealId, neighborhoodId, customerId) {
      this.mealId = mealId
      this.neighborhoodId = neighborhoodId
      this.customerId = customerId
      this.id = ++deliveryId
      store.deliveries.push(this)
   }

   meal() {
      return store.meals.find(
         function (meal) {
            return meal.id === this.mealId
         }.bind(this)
      )
   }

   customer() {
      return store.customers.find(
         function (customer) {
            return customer.id === this.customerId
         }.bind(this)
      )
   }

   neighborhood() {
      return store.neighborhoods.find(
         function (neighborhood) {
            return neighborhood.id === this.neighborhoodId
         }.bind(this)
      )
   }
}
