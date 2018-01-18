# Bamazon 

This app was for the Georgia Tech Coding Bootcamp.  There are three JS files that provide different interactions with
the bamazon online store. 

_Bamazon.js_ 

Bamazon.js is a simple store app that allows a customer to 
view items available to purchase and make purchases.  Each item has an itemID, name, department, price, stockquantity.
When a purchase is made the stockquantity is reduced in the database and the store information the user sees is updated.
A customer will generate prompts if they try and buy more stock than is available or purchase an item not in stock 
to keep the customer able to buy more things.  

![First Image](https://github.com/rahimpradhan/bamazon/blob/master/images/bamazon1.PNG)

The user will be prompted for the item ID and the quantity. If the item is in stock, an invoice will be presented and the database will be updated.


![Second Image](https://github.com/rahimpradhan/bamazon/blob/master/images/bamazon2.PNG)

_BamazonManager.js_

Running bamazonManager.js allows user to view inventory with less than 5 items, view all inventory, add a new item to the store for sale, and add more stock to existing products. 


_BamazonSupervisor.js_

Running bamazonSupervisor.js will populate a table showing additional information that only a supervisor can see and allowing 
additional permissions. The supervisor view shows departmentID, department name, overhead cost of each department, 
total product sales of each department, and profits calculated as sales minus overhead. Supervisor can also create new departments.  

