# Bamazon 

## Description #

This application was created during Week 12 of the Georgia Tech Coding Bootcamp. The goal was to create an Amazon-like store front using Node.js and MySQL.

# _The Interface_ #

The interface allows the user to view the current inventory of store items: item IDs, product name, and price. The user is then able to purchase one of the existing items by entering the item ID and the desired quantity. If the selected quantity is currently in stock, the user's order is fulfilled, displaying the total purchase price and updating the store database. If the desired quantity is not available, the user is prompted to modify their order.

# _BamazonCustomer.js_ #

By running bamazonCustomer.js, the user will be able to view the current inventory of items.

![First Image](https://github.com/rahimpradhan/bamazon/blob/master/images/bamazon1.PNG)

The user will be prompted for the item ID and the quantity. If the item is in stock, an invoice will be presented and the database will be updated.


![Second Image](https://github.com/rahimpradhan/bamazon/blob/master/images/bamazon2.PNG)


If the item is not in stock, a message will be provided and the user will be prompted again.

![Third Image](https://github.com/rahimpradhan/bamazon/blob/master/images/bamazon3.PNG)
