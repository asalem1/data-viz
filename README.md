# Global Happiness

## Overview

This App uses an existing data set from [Kaggle](https://www.kaggle.com/datasets/unsdsn/world-happiness) to display the Happiness Score per country for the years 2015, 2016, and 2017. This data is stored in local CSV files, with the aim that we will eventually support other index ratings and addition years.

## How it works

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), and makes use of the [nivo](https://nivo.rocks/choropleth/) as a visualization library for supporting mapped features. Furthermore, the app queries the raw JSON data for the map data, which is used by the `@nivo/geo` library to map out "features". This data can be found [here](https://raw.githubusercontent.com/plouc/nivo/master/website/src/data/components/geo/world_countries.json).

The features are returned as an array of objects with the following structure:

```json
{
    "type": "Feature",
    "properties": {
        "name": "Afghanistan"
    },
    "geometry": {
        "type": "Polygon",
        "coordinates": [
            [
                [
                    61.210817,
                    35.650072
                ],
                ...
            ]
        ]
    },
    "id": "AFG"
}
```

In order to match the data that's returned from the CSV with the id of the JSON feature, we first need to create a data mapping that corresponds to the expected format of values:

```ts
[
  {
    id: 'AFG',
    value: 10,
  },
  ...
]
```

This data mapping looks something like this:

```ts
[
  {'Afghanistan': 'AFG'},
  ...
]
```

## Project Layout

Datasets are located in the `db/**` directory
Components are located in the `components/**` directory

## Available Scripts

After cloning this repo, run the following commands in the project directory:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `firebase deploy`

The app is currently deployed on firebase and can be found here:

https://happy-8ff7b.web.app/

Only authenticated users with access to the firebase app will be able to deploy the application.

## Scalability and other TODOs

While this app is still fledgling in its capabilities, the datasets are richer than the current format allows for. Given more time and resources, it would be great to prioritize the scalability so that we can make full use of the existing dataset. This work would entail:

1. Dynamic filter types based on the CSV header outputs
2. Integrating 2018.csv & 2019.csv
3. Creating Models to generate expected data output based on the input

An eventual goal we might want to pursue beyond this would be to allow:

1. Users to upload and visualize their own datasets
2. Allow for multiple different types of visualizations
3. Allow for importing of data from remote sources
