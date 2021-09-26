# Wonderwall

Wonderwall is a full-stack application that redesigns and updates the CAISO OASIS application. Wonderwall utilizes a React frontend and a Flask RESTful API. For ease of deployment, the frontend and backend reposities are separate. The backend repository can be accessed [here](https://github.com/mykeychain/CAISO-live-scrape-backend). 

Wonderwall allows you to search for System Load and Resource Schedule, Locational Marginal Prices, Transmission Loss from geographical nodes all over California's power grid. The app offers the capability to update data live depending on the market type chosen (RTM updates every 5 minutes). Each report also includes a graphical representation of the data that utilizes the Apex Charts library.

You can view the deployed website [here](https://mikechang-wonderwall.surge.sh/).

<br>

## React Component Hierarchy

![Wonderwall Frontend Component Hierarchy](/public/wonderwall-component-hierarchy.png)

<br>

## Setup Instructions 

1. Clone and install the backend repository [here](https://github.com/mykeychain/CAISO-live-scrape-backend).
2. `cd CAISO-live-scrape-frontend`
3. `npm install`
4. `npm start`

<br>

## Technologies Used
- [React](https://reactjs.org/) - Javascript frontend framework
- [Flask](https://flask.palletsprojects.com/en/2.0.x/) - Python backend framework
- [Apex Charts](https://apexcharts.com/) - charting library