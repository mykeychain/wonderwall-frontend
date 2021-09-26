# Wonderwall Frontend

Wonderwall is a full-stack application that redesigns and updates the CAISO OASIS application. Wonderwall utilizes a React frontend and a Flask RESTful backend API. For ease of deployment, the backend repository has been separated and can be accessed [here](https://github.com/mykeychain/CAISO-live-scrape-backend). 

Wonderwall allows you to search for System Load and Resource Schedule, Locational Marginal Prices, and Transmission Loss from geographical nodes all over California's power grid. The app offers the option to update data live depending on the market type chosen (RTM updates every 5 minutes). Each report also utilizes the Apex Charts library to include a graphical representation of the data.

You can view the deployed website [here](https://mikechang-wonderwall.surge.sh/).

<br>

## React Component Hierarchy

![Wonderwall Frontend Component Hierarchy](/public/wonderwall-component-hierarchy.png)

<br>

## Setup Instructions 

1. Clone and install the backend repository [here](https://github.com/mykeychain/CAISO-live-scrape-backend).
2. Navigate into Wonderwall directory `cd CAISO-live-scrape-frontend`
3. Install dependencies `npm install`
4. Start the React App `npm start`

<br>

## Future Directions
- Add ability to download data as XML or CSV
- Add ability to delete reports

<br>

## Technologies Used
- [React](https://reactjs.org/) - Javascript frontend framework
- [Flask](https://flask.palletsprojects.com/en/2.0.x/) - Python backend framework
- [Apex Charts](https://apexcharts.com/) - charting library