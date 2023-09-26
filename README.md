# TimeSync

single-page app built on React.js that allows users to book, edit or cancel interviews for each day of the week (Monday - Friday). The application uses a combination of a concise API with a WebSocket server to build a real-time experience.

## Setup

Install dependencies with `npm install`.

## Servers to start and app functionalities

Start both the scheduler and the scheduler--API with npm start and go to http://localhost:8000/ to view the Scheduler website. When accessed, you the user are able to

1. Browse and select a day for which you want an interview booked
2. Update, delete, or cancel appointments booked.

If you want to see the error cases being handled you simply must start the scheduler--API with npm run error

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Final Product

`Homepage where students can add, delete appointments`
![](https://github.com/nomadicafrican/scheduler/blob/master/public/images/Screen%20Shot%202021-12-16%20at%204.04.38%20PM.png?raw=true)

` Editing an appointment
![](https://github.com/nomadicafrican/scheduler/blob/master/public/images/Screen%20Shot%202021-12-16%20at%204.06.17%20PM.png?raw=true)

`displays message if there is a backend error`
![](https://github.com/nomadicafrican/scheduler/blob/master/public/images/Screen%20Shot%202021-12-16%20at%204.06.46%20PM.png?raw=true)
