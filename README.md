herder.co
=========

Maximize your profit as an Uber driver.

[Challengepost](http://disruptsfhackathon.challengepost.com/submissions/26475-herder?utm_campaign=techcrunch-disrupt-sf-hackathon_20140724&utm_content=submission_visible_in_gallery&utm_medium=email&utm_source=transactional)

## Setup
```sh
git clone git@github.com:grant/herder.co.git
npm install
foreman start
```

## Tests
```sh
node tests/testGetProducts.js
node tests/testGetPrice.js
node tests/testGetTime.js
```

## Color scheme
- Red: rgb(254, 85, 85)
- Dark Red: rgb(216, 72, 72)
- White: rgb(245, 245, 245)
- Gray: rgb(238, 238, 238)
- Dark Gray: rgb(77, 75, 72)
- Blue: rgb(83, 130, 255)

## Notes
- uber analytics
- which hours to work
- what location is bets
- best car to use (rental car)
- how much gas prices are for the day (which location is best)
- heatmap for drivers and passengers
- events that are happening (with high demand)
- traffic integration
- schedule rides
- high demand notifications (sms)
- when to fill up gas notifications (sms)
- estimated hourly earnings

## APIs
- esri maps
- twilio
- weather