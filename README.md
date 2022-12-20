
# Task Management API
![Deployment Status](https://vercelbadge.vercel.app/api/shanudey/task-management-api)

## Installation
 - Clone this repository
 - Install node modules with `npm i` command
 - Update environment variables, sample `example.env` is provied for reference
 - Start api server with `npm start` command

## Usage
 - Postman - [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/24635940-2953658f-7d8a-45be-8d14-076b6af98bbd?action=collection%2Ffork&collection-url=entityId%3D24635940-2953658f-7d8a-45be-8d14-076b6af98bbd%26entityType%3Dcollection%26workspaceId%3Dea53fc74-7156-4efb-808d-d04b67145565)
 - Base URL 
	 - Remote Host - https://tmapi.vercel.app/
	 - Localhost - http://localhost:8000/
 - Register user with `first_name`, `last_name`, `email` and `password` POST request body json parameters to `/register` route  
	 - Example - https://tmapi.vercel.app/register
	- [Optional] [Create a test create email with one click](https://ethereal.email)
		- if you are using test email then you will receive a preview email from the response
		- click on the preview email link and verify email from there
 - Login with `email` and `password` POST request body json paramaters to `/login` route 
	 - Example - https://tmapi.vercel.app/login
 - Create a task as authenticated user with `task`, `date` and `status` POST request body json parameters to `/task/create` route
	 - Example - https://tmapi.vercel.app/task/create
	 - `task` is a String Object, `date` is a Date Object and `status` can only accept "Completed" or "Incomplete"
 - View all created tasks as authenticated user with GET request to `/task` route
	 - Example - https://tmapi.vercel.app/task
 - Patch a task as authenticated user with any of these `task`, `date` and `status` PATCH request body json parameters to `/task/:id` route
	 - Example - https://tmapi.vercel.app/task/:TASK_ID
 -  Delete a task as authenticated user with DELETE request to `/task/:id` route
	 - Example - https://tmapi.vercel.app/task/:TASK_ID
 - Logout with GET request to `/logout` route
	 - Example - https://tmapi.vercel.app/logout

### Feel free to put a start or raise an issue
