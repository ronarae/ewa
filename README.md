# Mudjeans-1

## Introduction
Welcome to this Mud Jeans application. This application is an automatic ordering system for Mud Jeans. This web application 
contains the following functionalities:

#### File upload and download
- Users can upload an Excel file with jeans data which the application will use to calculate a new order
- Users can download a CSV file with the order data from the order history page

#### Ordering jeans, automatically and manually
- Users do not have to order jeans manually anymore. By tracking the stock, the system's algorithm will automatically
place an order of a specific jean whenever the stock runs low.
- Users still have the option to order jeans manually if they want. They can adjust a current jean or add a new type of jean.

#### Email notification
- Users can receive an email notification when an automatic orders or a manual orders has been placed.

#### Edit users
- Admin can edit users by adding or deleting users. Also certain information such as user, email and passwords can be updated.

#### Retrieve order history
- Users can take a look at the order history and check past orders. These orders can be exported as a CSV file. 

This application is made based on the demands of the Mud Jeans client. 
---
## Step-by-step guide to run the application

To start, clone the git repository to the location where you want to store the application.

The project consists of a front-end part made in Angular and a back-end part made using the Spring Boot Architecture.

In case you have never used/downloaded Angular and/or Spring, see the links below (NodeJS is needed for Angular to run).

### Running the Angular application
After installing Node JS and Angular CLI, open up the command prompt and navigate to the location where the 
application is stored using the 'cd' command. (cd stands for 'change directory', by adding a file path (e.g. `\Downloads\mudjeans-1`), you can go to the specified directory.)

If you are at the location of the angular project (located at `\mudjeans-1\mudjeans`), run the command 'npm install'. This will make sure that that all the 
needed libraries will be imported (NOTE: This might take a few moments). 

After the libraries are installed you should run the command 'ng serve'. Running this command will ensure that the angular server is running

After compiling the angular project you will see in the terminal that the angular server is running on localhost:4200. You can now open the browser and type the url: `https://localhost:4200`
This will send you to the website. (NOTE: The backend should be running to use the functionalities)

### Running the Spring Boot application
To run the Spring Boot application, you need to have JDK (Java Developer Kit) version 14 or higher installed.

After going to the appropriate folder (`\mudjeans-1\mudjeansserver`), you need to import the maven dependencies using the pom.xml file.
From here, you can start the server by using the maven spring-boot:run runner.

The server should start now and when it's finished will be available on `http://localhost:8085/`.

---
## Installation / Quick Start guides

### Node JS
[Node JS download](https://nodejs.org/en/download/)

### Installing Angular
[Angular documentation](https://angular.io/docs)

### Installing Spring Boot Application Server
[Spring-Boot documentation](https://spring.io/quickstart)

---

## Getting the application on a hosted server

1. Change the application.properties in the serverside folder ‘dev’ to ‘staging’. 
2. Change the application-staging.properties to your database keys.
3. Change in the clientside the environment.staging.ts file change here the apiurl to your back-end host url.






