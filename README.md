This project was created by running
npx create-react-app openvidu-react-hello-world

Dependencies were installed by running inside openvidu-react-hello-world folder
npm install openvidu-react --save
npm install axios --save

--save argument saves the dependencies in package.json file. Now, after deleting node_modules folder, we only
need to run npm install.

Several warnings appeared. We will ignore them for now.

To run this project, open a terminal and run
docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-server-kms:2.18.0

Then, run 
npm start
inside openvidu-react-hello-world folder.
