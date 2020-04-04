# Project: Property search engine - Assembler School

Deployed version of this project is hosted at Heroku:
* **Node API -> NOT DEPLOYED YET**
* **Laravel APP -> NOT DEPLOYED YET**
* **jS APP -> NOT DEPLOYED YET**

In this project you will create a WEB API and two web applications that consume that API. You must create an infrastructure about a property search engine. Being a team project, they can collaborate with the rest of their partners assuming the different roles to carry out the development of the project.

![Team organisation](https://iili.io/JfOFn4.png)

- Develop a REST API for delivering data.
- Develop a Laravel APP for displaying the data comming from the API.
- Develop a jS APP for displaying the data comming from the API.

## Project Organisation
The initial organisation document has to reflect the way in which the project is going to be developed. The main goal is to prevent comments like:
- I'm on 4/5 day and I'm not sure on how to technically carry out this project.
- I haven't talked to any collegue about this project yet.
- I have several questions on the project and I haven't cleared them out in time to finish the project.
- All the organisation is in my mind but I don't know who to write it down.
- I asume I have enough time to do de project in time and because of that, I decide to work on non related project and in the end, I don't have time enough.
- I din't take into account the events and masterclasses that have been going on during the week.
- I didn't take into account the chance of something going wrong on my initial organisation plan.
- I didn't know that the project had to cover some feature.
- One certain feature took so much time that prevented me from carrying out the whole of the project.

## To take into account
In order to avoid the previous kind of behavious, the first part of the project will be to obtain a document that reflects how the project is going to be carried out. That's why it's so important that the Project Manager (hereinafter PM) and the team define what tasks have to develop by each member of the team taking into account that the following requirements have to be properly followed.

PM:
- Coordination within the team
- Task supervision
- Conflict resolution
- The plan has to be properly followed
- Convey possible incidents to Assembler team if required
- Team leadership
- Define appointments with date, time and objectives
- Decision making
- Leader the communication within teams
- Pick up feedback from the team
- Design use cases
- Database design
- API design (create POSTMAN / SWAGGER collection)
- Wireframing APP
- Research on possible technologies, libraries and features
- Planning fases and tasks
- Estimate time of the project development. Assembler team will validate the estimation.
- Hosting and deployment
- Design how the different applications will be deployed to Heroku

IMPORTANT: It won't be allowed to imnplement nor develop any feature of the project during the organisation phase. It's important to understand that the development phase will depend 100% on its organisation and it will have to be validated by the Assembler Team.

## Consulting company
During this project we are going to include a consulting compant that will be in charge of developing orders from the other two teams. Teams will be in charge of providing the consultancy team with proper briefings so that they can develop those tasks.

The PM of the consultancy team will be in charge of:
- Coordinating the orders and requests received, assign a cost in time and, delivery date and decide who is gonna be in charge of developing tasks.
- Supervising the results form the consulting team
- Supervise that the work carried out is done within the agreed budget
- Verify that the work carried out is always verified by PM.
- Resolve conflicts
- Handle contingencies
- The consultancy company starts with 0€ and at the end of the project they must have an approximate amount of 3,600€


## Communication
![Team organisation](https://iili.io/JfGGtI.png)
- Teams cannot reach out one another. Only PMs can talk to other PMs.
- The consultancy company will not carry out any commission that is not properly defined, otherwise it will assume the costs.
- The consulting company may offer services and developments knowing the requirements of the project, so it may resell developments.
- Doubts within the team must be managed by team's PM.

## Applications, architecture and technologies
This project will be build from a WEB REST API that is going to provide other two applications with the data. Listed below are the main technologies that should be used in each of them:

- **WEB API**
- MongoDB Database engine
- NodeJs
- Open API
- Hapy
- JWT Json Web Tokens

- **APP COMPANY 1**
- Laravel 7
- Webpack
- Laravel Permissions Package Spatie
- Laravel Debug Bar
- ES6
- SASS
- SASS AUTO DOC

- **APP COMPANY 2**
- Materializee for Mobile and Tablet versions
- Bootstrap 4 for Desktop version
- Webpack
- ES6
- SASS
- SASS AUTO DOC

## Requirements & Features
Analyse the main property search portals to understand how they are organized and what features they have in common.
- (Idealista)[https://www.idealista.com/]
- (Habitaclia)[https://www.habitaclia.com/]
- (Fotoocasa)[https://www.fotocasa.es/]
- (Yaencontre)[https://www.yaencontre.com/]

Provide the API with the following endpoints:
- List all available properties
- List the latest announcements (last 24h)
- **Filter properties by:**

- **HOMES BEING SOLD:**
- Type of home: Flat/Appartmanet, house, duplex, penthouse.
- Bedrooms: 0 (studio flat), 1, 2, 3, 4 or +.
- Bathrooms: 1, 2, 3 or +.
- Equipment: Fully fitted kitchen, furnished, unfurnished.
- Condition: New homes, good conditions, needs renovation.

- **OFFICES BEING SOLD:**
- Bulding use: Private, co-working, security system.
- Price: min & max
- Location (use, for example Open Street Maps, to filter by location)
- Publication date: Last 48 hours, last week, last month.
- More filters: Pets allowance, lift, air conditioning, garden, swimming pool, terrace.

- **The detailed view for the property's detail must include:**
- Images
- Description
- Location
- Show the location of the property using a third party service such as: (Open Street Map)[https://www.openstreetmap.org/]
- Services
- Contact form
- Can add more features if wished


## UXUI
The team must design the wireframes taking into account the usability of the platforms for each type of device. You have to take into account that depending on whether it is mobile oriented you will have to make a specific wireframe.

## Product
You must include in the documentation and presentation a section explaining the product you are going to develop with its strengths, weaknesses, competition analysis and the cost of developing this site in a real environment.

## Implementation
Analyse the features that will be implemented in both applications that will consume the API and create diagrams if needed.

MVP of applications listed below:
- Home with search box
- Show filters (you can decided which to show)
- Latest properties published (last 24H)
- Property detail
- Map showing location of the property
- About us page
- Contact page with mail delivery

jS APP mobile vesrion must include 2 extra functionalities compared to the desktop version.



## Requirements
- All three projects must be properly deployed to Heroku and the team must provide three urls of those remotes.
- Create clear and ordered directory structures.
- Both code and comments must be written in English.
- Use camelCase
- Never use inline styles
- Devide tasks in sub-tasks in a way that those sub-tasks can be associate to specific commits
- Deliver documentation in PDF format and place it inside the git repo.
- Delete unused or usless files.
- Team members cannot reach out to members in other teams
- Only PMs can talk to other PMs.
- Team members cannot ask Assembler for help (they must notify the corresponging PM)
- Only PMs talk to Assembler
- If a team needs help from a member in another team, the PM of the team in need has to talk to the PM of the team in which the member who can help is. They have to negotiate resource exchange.
- If rules are broken penalties will be applied


## Deliverables
- Presentation on how the project will be addressed by the team that includes:
    - Summary on the prviously mentioned keypoints
    - Roles and tasks that each member has
    - Time estimate based on which the team has to deliver the project.
- Full documentation with all required explanations on the project
- The presentation must be timed with a maximum duration of 15 minutes
- The code: WEB REST API, Laravel APP and jS APP.


## Links that helped us developing this project

## Authors
* **Prattya Datta**
* **Rafael Venegas**
* **Diego Silva**
* **Cristina Moreno Medran**

## Providers for some of the tasks that configured this project
* **Homotech Consulting**:
* **Carlos Agudo**
* **Wojtek Poninski**
* **Mani Tahriri**
* **José Moriglioni**
* **André Joyo**
* **Robert Salazar**