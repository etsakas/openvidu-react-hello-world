## OpenVidu 'Hello World' in React ##

Based on:  
- https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-hello-world  
- https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-insecure-react

Created with ```npx create-react-app```.  

The following dependencies were added:  
- npm install openvidu-react --save  
- npm install axios --save

---
1. Run ```docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-server-kms:2.18.0```
2. Run ```npm install``` and ```npm start```
3. Visit ```http://localhost:3000/```
