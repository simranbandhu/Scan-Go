
 <div align="center"> 

#  **Scan&Go**



 ### Self-Checkout Made Simple





![Scan Feature](https://i.insider.com/60356ba6d9208800185919c1?width=800&format=jpeg&auto=webp" "Scan Barcode Feature")



 
 
</div>


# 🧭 `Table of contents`

- [Scan&Go](#Scan&Go)
- [Table of contents🧭 ](#Table-of-contents)
- [Introduction🚀](#Introduction)

- [Technologies Used📫](#Technologies-Used)
- [Features](#Features)
- [ScanGo In Action](#Screenshots-and-Video)





## `Introduction`

 
- Scan&Go makes checkout hassle-free! First, authenticate by entering your number and verifying with OTP.
- Then, add items to your cart, and they’ll sync instantly to your phone.
- Pay directly through the website on your phone and skip the checkout line. Quick, easy, and no queues!


## `Technologies Used`

- [ReactJS](react.dev)
- [Socket](https://socket.io/docs/v4/)
- [ESP32](https://www.espressif.com/sites/default/files/documentation/esp32_technical_reference_manual_en.pdf)
- [Authentication with twilio](https://www.twilio.com/docs)
  


## `Features`

- Real-time Synchronization: Your phone will sync with the hardware in real-time as soon as you connect it to the store's WiFi thanks to Socket.io. The connection is made as soon as you enter your OTP, and the things you add to your cart are immediately updated.

- Simple Cart Management: Put products in your shopping basket and instantly sync them with your phone. Re-scanning the RFID tags allows you to remove things as well.

- ESP32 Integration: For smooth connectivity, the ESP32 module joins the store's WiFi network. Due to static IP restrictions, we used mobile internet for testing; however, this may be readily set up for actual implementation.

- Flexible Payment Options: Checkout accepts a number of payment options, including UPI, credit cards, and debit cards, and supports the Razorpay payment gateway the documentation for same could be found [here](https://razorpay.com/docs/#home-payments)
  
## `Screenshots` 

![Shopping List](/images\ShoopingList.png "Shopping List")
![List Details](https://github.com/simranbandhu/Scan-Go/blob/master/images/ListDetails.png "List Details")
![Bill](/images\bill.png "Bill")

![Products](/images\products.png "Products")
![ShoppingCart1](/images\shoppingCart1.png "Shooping Cart")
![ShoppingCart](/images\shoppingCart.png "Shooping Cart")
