//Function for creating Product object
function Product(id, name, category, price) {
    this.id = id
    this.name = name
    this.category = category
    this.price = price
}

// Create array to store inventory products
let inventoryArray = []

//Function to add a product to the inventory
function addProduct() {
    //Getting values from input fields id, name, category & price
    const id = document.getElementById('id').value
    const name = document.getElementById('name').value
    const category = document.getElementById('category').value
    const price = document.getElementById('price').value

    //Cheching ID is valid or not. Because ID cannot be a negative value
    if (parseInt(id) < 1) {
        return (document.getElementById('output').innerHTML =
            'ID cannot be 0 or any negative value. Please enter a valid ID.')
    }

    // Checking ID already exists in the inventory or not
    for (let i = 0; i < inventoryArray.length; i++) {
        if (inventoryArray[i].id === parseInt(id)) {
            return (document.getElementById('output').innerHTML =
                'This ID is already present. Please enter different ID.')
        }
    }

    // Checking all fields are filled or not & Adding product to Inventory
    if (id && name && category && price) {
        const newProduct = new Product(
            parseInt(id),
            name,
            category,
            parseFloat(price)
        )
        inventoryArray.push(newProduct)
    } else {
        return (document.getElementById('output').innerHTML =
            'Please fill all the fields.')
    }

    return (document.getElementById('output').innerHTML =
        `Product added to the inventory with id= ${id}`)
}

//Function to remove a product from the inventory by ID
function removeProductById() {
    //Getting value for input field id
    const id = document.getElementById('removeId').value

    //Cheching ID is valid or not. Because ID cannot be a negative value
    if (parseInt(id) < 1) {
        return (document.getElementById('output').innerHTML =
            'ID cannot be 0 or any negative value. Please enter a valid ID.')
    }

    //Finding product in the inventory array and removing it
    for (let i = 0; i < inventoryArray.length; i++) {
        if (inventoryArray[i].id === parseInt(id)) {
            inventoryArray.splice(i)
            return (document.getElementById('output').innerHTML =
                'Product removed from Inventory.')
        }
    }
    return (document.getElementById('output').innerHTML =
        'Product is not present in Inventory.')
}

//Function to get a product from the inventory by ID
function getProductById() {
    //Getting value for input field id
    const id = document.getElementById('getProductId').value
    let temp = []

    //Cheching ID is valid or not. Because ID cannot be a negative value
    if (parseInt(id) < 1) {
        return (document.getElementById('output').innerHTML =
            'ID cannot be 0 or any negative value. Please enter a valid ID.')
    }

    //Finding the product in the inventory array
    const productFound = inventoryArray.find((product) => product.id === parseInt(id))
    if (productFound) {
        temp.push(productFound);
    }

    //Display the result on Page
    printOnScreen(temp)
}

//Function to get products from the inventory array by category
function getProductsByCategory() {
    //Getting value for input field category
    const category = document.getElementById('getProductCategory').value
    let temp = []

    //Filtering the products from inventory array by category
    const productFiltered = inventoryArray.filter((product) => product.category === category)
    if (productFiltered) {
        productFiltered.forEach(product => temp.push(product))
    }

    //Display the result on Page
    printOnScreen(temp)
}

//Function to get products from the inventory array within given price range
function getProductsInPriceRange() {
    //Getting values for input field minPrice & maxPrice
    const minPrice = document.getElementById('minPrice').value
    const maxPrice = document.getElementById('maxPrice').value

    //Checking max price is less than min price
    if (parseFloat(maxPrice) < parseFloat(minPrice)) {
        return (document.getElementById('output').innerHTML =
            "Maximum Price cannot be less than Minimum Price.")
    }
    let temp = []

    //Filtering the products by price range
    const productFilteredByPrice = inventoryArray.filter(product =>
        product.price >= parseFloat(minPrice) &&
        product.price <= parseFloat(maxPrice))
    if (productFilteredByPrice !== undefined) {
        productFilteredByPrice.forEach(product => temp.push(product))
    }

    //Display the result on Page
    printOnScreen(temp)
}

//Function to get all products in the inventory & Displaying it on Page
function getAllProducts() {
    printOnScreen(inventoryArray)
}

// common function for displaying the result on the page
function printOnScreen(tempArray) {
    const productList = tempArray

    //Checking product list empty or not. 
    //if not empty then adding Product to the output 
    if (productList.length !== 0) {
        let output = '<h3>Product List:</h3><ul>'
        for (let i = 0; i < productList.length; i++) {
            let line = productList[i]
            output += `<li><b>ID:</b> ${line.id}, <b>Name:</b> ${line.name}, <b>Category:</b> ${line.category}, <b>Price:</b> ${line.price}</li>`
        }
        // productList.map(line=>output += `<li><b>ID:</b> ${line.id}, <b>Name:</b> ${line.name}, <b>Category:</b> ${line.category}, <b>Price:</b> ${line.price}</li>`)
        output += '</ul>'
        //Display the result on Page
        document.getElementById('output').innerHTML = output
    }
    //if product list empty then displaying no product found
    else {
        let output = 'No Product found in the Inventory'

        //Display the result on Page
        document.getElementById('output').innerHTML = output
    }
}
