# final-project-cgfz
final-project-cgfz created by GitHub Classroom
## Background and Proposal:
Based on social model nowadays, people like sending greeting messages to each other. But the message is too simple, we can provide a website to help them design their own greeting card with the photos they like. Then, they can send the cards to their friends by e-mail. 

### Main Purpose:
--Upload your photo or choose one from server
--Edit the Greeting Card
--Send to the Target E-mail Address


### Features and Stories:
1. Read from the database. The website provide users with some choices to start the edit.
2. Users can upload their own picture to design a special card.
3. Provide users tools to edit the design
-resize-
-scale
-add texts
-opacity
-grayscale
4. Users can send the greeting card to a target e-mail address.
5. Users can also share their design with other users.
6. Users can save the card to their computer.

## Future Development Plan:
We will design the more design model such as font models, stick models.

## Domain Model:
![Image text](https://github.com/neu-mis-info6150-fall-2018/final-project-cgfz/blob/master/domain_model_image/domain_model.svg)


How to run app.js
in app_final_image_editor directory:
npm install express body-parser mongoose --save
npm install cors --save
node app.js to run back-end server

then run fron-end server in angular-final-image-editor directory:
ng serve --open

Install HttpClient for get data from back-end
npm install httpclient

Default Account And Password
admin admin

