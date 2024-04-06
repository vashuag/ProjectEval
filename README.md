# ProjectEval



# Evaluation Dashboard App - Mentor View

This project aims to provide a complete solution for mentors to evaluate students for a semester-long project in college. The frontend is developed using React, the backend using Node.js, and MySQL for the database. The application is deployed on [Vercel](https://project-eval.vercel.app/) and [AWS](http://projecteval.s3-website-us-east-1.amazonaws.com/), with the MySQL database hosted on AWS RDS.

# Note: Due to backend hosted on render free tier, the backend shuts down after a time, so please wait, for 1-2 minutes, and refresh the page for seeing the full Web app.
## Deployment

•⁠  ⁠Frontend: The frontend of this application is deployed on [Vercel](https://vercel.com/). You can access the web application [here](https://project-eval.vercel.app/).<br>
Also on AWS S3 : [AWS](http://projecteval.s3-website-us-east-1.amazonaws.com/)


•⁠  ⁠Backend: The backend is deployed on Render. 
Also on AWS EC2.
•⁠  ⁠Database: The MySQL database is on AWS RDS


## Tech Used:

```
Frontend/
├── React
├── Bootstrap
├── Tailwind CSS
├── Material UI


Backend/
├── Nodejs
├── NodeMailer
├── Express
├── MySQL
```

## Functionality

### HomeScreen: Mentor Selection

 <img width="1680" alt="1" src="https://github.com/vashuag/ProjectEval/assets/83650895/33b2dfec-1cfd-4286-969a-f60339cbe178">
 
### Student Selection by Mentor:
A mentor can add students which he/she is interested to evaluate satisfying the below condition: 

> A mentor can only accommodate minimum 3 and maximum 4 students at a time.
> No two mentors can assign the same student during the evaluation period.


<img width="1680" alt="2" src="https://github.com/vashuag/ProjectEval/assets/83650895/583f904f-ed29-479d-bb17-05770962318f">

### Marks Viewing Dashboard:

<img width="1680" alt="3" src="https://github.com/vashuag/ProjectEval/assets/83650895/6423d326-b3c0-4ecd-a507-4018279e088c">

### Evaluation Dashboard :

> Mentor has to assign marks to each student on the basis of various parameters.
> Also, total marks should be visible to the mentor.

<img width="1665" alt="4" src="https://github.com/vashuag/ProjectEval/assets/83650895/42faa2a6-8088-4512-a552-56957c2c8654">
Allow mentor to edit/remove assigned student satisfying the same conditions when adding a new student. Mentors can also edit assigned marks to students.

There should be a final submit functionality. Marks of all students should be locked after submitting the marks by the mentor and cannot be editable after lock exits. During this, if some students have unassigned marks, mentors should not be able to submit/lock the marks.

<img width="1680" alt=" 5" src="https://github.com/vashuag/ProjectEval/assets/83650895/e34b3373-1c84-4846-ab08-b6e88a5fadcb">
Create a view page for the mentor to view all the the students and marks assigned to them with the following filters

Filter by students who’s marks are yet to be assigned

<img width="1680" alt="6" src="https://github.com/vashuag/ProjectEval/assets/83650895/66f1f5bf-4c11-4bb8-9a34-045040023a64">


## Filter by students who’s marks are assigned already

<img width="1680" alt="7" src="https://github.com/vashuag/ProjectEval/assets/83650895/ef3ba6bf-4ecd-44e4-8947-5957067da0fa">

## No two mentors can assign the same student during the evaluation period.

<img width="1680" alt="8" src="https://github.com/vashuag/ProjectEval/assets/83650895/042bd317-8e69-4374-a69c-e4c2a4ec67da">
Email should get fired to all the assigned students once the mentor submits the evalutation notifying them that evaluation has been completed.

<br>
<img width="384" alt="9" src="https://github.com/vashuag/ProjectEval/assets/83650895/3c740dbc-c1d6-459f-8417-ac592681f97c">
<br>
Generate a marksheet of all students for a mentor in pdf/doc or any document format.

<img width="807" alt="10" src="https://github.com/vashuag/ProjectEval/assets/83650895/81bed68a-d43a-4b1a-a397-a0fc14b6379b">

## Database EER diagram from MySQL workbench
<img width="459" alt="Screenshot 2024-04-06 at 12 43 05 PM" src="https://github.com/vashuag/ProjectEval/assets/83650895/6cdbface-fdca-4dd1-8d95-b6a0f130251a">


## Environment Variables
•⁠  ⁠.env: Configuration file for environment variables save in server folder.

```
EMAIL=
APP_PASS=
DATABASE_URI=
DATABASE_USERNAME=
DATABASE_PASSWORD=
```
### Installation

```
git clone https://github.com/vashuag/ProjectEval.git

cd server

npm install

npm start
```
##### Open New Terminal:
```
cd ..

cd client

npm install


npm start
```

### Documentation
#### Scaler SDE task link: 
```
https://docs.google.com/document/d/1IAJ-hHJHFEPogd7gGKhgpcMuQwp3G-Sb5EeFrF7KGNc/edit
```

