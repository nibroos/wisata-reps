# Wisata Reps

Live frontend: [http://wisata-reps.nibross.com](http://wisata-reps.nibross.com)

## Requirements

- Nodejs 18

## Installation

#### setup
```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env, set the backend config. Focus on:
API_BASE_URL      #URL of the API
APP_NAME          #Name of the app

# Run server
npm run dev

# Build for production
npm run generate
```


## Technologies

- Nuxt 3.9.0
- Vue 3.3.13
- TailwindCSS 3.3.5
- Vuedatepicker

## Features

- Fully responsive (from 480px to 2k resolution)
- Dark mode
- SEO description
- Skeleton loading
- Searchbar for places
- Random placeholder text in searchbar
- List of places
- Error handling


### Home page (index.vue)

Flow:

- After user typing a property name, `skeleton loading` will appear while waiting for the API response. `isLoadingProperties` variable is used to control the loading state.
- Utilizing the [/property/fts](https://exterior-technical-test-api.vercel.app/property/fts?query=ibis+bandung) API to search for places. this function is stored in `composables/useProperties.js`.
- By calling the `getProperties()` function with the parameter, the API will return a list of places that match the query.
- Passing list of places using `properties` variable to ListComponent.vue to display the list of places. each place is clickable and will redirect to the place detail page. (/stay/[slug])

<details>

<summary>Home page screenshot</summary>
<img src="https://github.com/nibroos/wisata-reps/assets/73767596/fffa51fe-431c-4d67-8913-f430e33e9825/" />

</details>

<br>
- If the user doesn't type anything or the API returns an error, error message will be displayed.


<details>

<summary>No result screenshot</summary>
<img src="https://github.com/nibroos/wisata-reps/assets/73767596/f2732bfe-22ee-4e99-ab11-5eb2040260db/" />

</details>

### Place detail page (/stay/[slug].vue)

Flow:

- There are 2 ways to access this page:
    - By clicking a place in the home page
    - By typing the URL directly. If the user guesses the URL right, the page will be displayed. If not, the user will be redirected to the 404 page.
    
<details>

<summary>Not found page screenshot</summary>
<img src="https://github.com/nibroos/wisata-reps/assets/73767596/d1ca8062-5ca1-4e34-9e48-4a3d2a18b229/" />

</details>

- After user clicking a place, `skeleton loading` will appear while waiting for the API response. `isLoadingProperty` variable is used to control the loading state.
- Utilizing the [/property](https://exterior-technical-test-api.vercel.app/property?id=9000248877) Detail API to get the detail of a place. this function is stored in `composables/useProperty.js`.
- By calling the `getProperty()` function with the parameter, the API will return a detail of a place.
- The room offers [/property/availability](https://exterior-technical-test-api.vercel.app/property/availability/9000248877?checkin=2024-06-01&checkout=2024-06-03&number_of_room=1&guest_per_room=2) function runs after the [/property](https://exterior-technical-test-api.vercel.app/property?id=9000248877) Detail API returns a response. Using `getAvailabilities` function in `composables/useProperty.js`, this function will return a list of rooms that are offered by the place.
- The page title is set to the place name and the meta description is set to the place description from the [/property](https://exterior-technical-test-api.vercel.app/property?id=9000248877) Detail API response, using headline key `general_info->descriptions->headline`.

<details>

<summary>Screenshots</summary>
<img src="https://github.com/nibroos/wisata-reps/assets/73767596/ed2e9021-52b9-49d4-9458-592a0006cea8/" />

<img src="https://github.com/nibroos/wisata-reps/assets/73767596/2b6e0e29-1ccf-48da-9ac5-6589b149cc08" />

<img src="https://github.com/nibroos/wisata-reps/assets/73767596/51c61e51-dbb6-4f70-9183-9a92b473a96f"/>

<img src="https://github.com/nibroos/wisata-reps/assets/73767596/27bb0bc7-b735-4b31-8f35-3b82aa8a3bbe"/>

<img src="https://github.com/nibroos/wisata-reps/assets/73767596/aa5c625b-8667-4109-b18b-12d9c2aad21f"/>

</details>

## Advanced features:
#### - Offer Filters
GET function will run after one of the filters is changed. There are 5 filter options, The filters are:
- Number of rooms and Number of guests, if the number of rooms is more than 1, the price will be multiplied by the number of rooms. There will be a total price for each offer. (backend filters)
- Date range, if the start date is more than the end date, the end date will be set to the start date + 1 day, vice versa. (backend filters)
- Free cancellation & Free breakfast, as I know there are no query params for these filters, to achieve this I created a function `filterByOptions()` in `ListRoomComponent` that will filter `meal_plan_code: BB` and `cancel_policy_code: FC` key. Not only that, I also created a function `countFilteredOffers()` that will count the number of offers that match the filter. Normally, message will be displayed if there are no offers that match the backend filters. but if there are offers that match the frontend filters, there wil be no message displayed, but after the function is called, the message will be displayed.

<details>

<summary>No offers found screenshot</summary>
<img src="https://github.com/nibroos/wisata-reps/assets/73767596/d2ce82e6-0754-4737-9dee-89620a856df4/" />


</details>

#### - Conditional rate, color, and room size

- Rating predicate will show the rating score and the rating text. there are 6 rating scores, Excellent, Good, Average, Poor, Very Poor, and Not Rated, condition function stored in `utils/textTransform.js`, as for the rating score 0 - 100, the circle depends on the rating score. 

<details>

<summary>Conditional rate</summary>

<img src="https://github.com/nibroos/wisata-reps/assets/73767596/6c1bf3f2-e127-487b-9863-cbb3e6ec0723" />

</details>

- Free cancellation & Free breakfast filters will be highlighted green if the `meal_plan_code` is BB and `cancel_policy_code` is FC. If not, the filters will be highlighted red to cancelation and breakfast will colored black.

<details>

<summary>Conditional color screenshot</summary>

<img src="https://github.com/nibroos/wisata-reps/assets/73767596/0d44b98d-1c59-4185-9859-0e73a461f36b" />

</details>

- The room size will not be displayed if the room size is 0. If the room size is more than 0, the room size will be displayed.

<details>

<summary>Room size screenshot</summary>

<img src="https://github.com/nibroos/wisata-reps/assets/73767596/0095dc7d-f157-4e0a-8c41-aa5bff3b8a70" />

</details>

- Money & percentage formatting, the price will be formatted to IDR currency, and the discount will be formatted to percentage.

<details>

<summary>Room size screenshot</summary>

<img src="https://github.com/nibroos/wisata-reps/assets/73767596/f6cd5e47-bea2-4b73-b5a9-45728631d640" />

</details>

## Unfinished features

Time is running out, I can't finish some decent features. Here are some features that I haven't finished yet:

- Offer tabs, there are 3 tabs, Details, Photos, Info. The default tab is Details. The tab will be changed if the use clicks the tab. The tab will be highlighted if the user clicks the tab.

<details>

<summary>Offer tabs screenshot</summary>

<img src="https://github.com/nibroos/wisata-reps/assets/73767596/7a462ad9-3f66-4e6e-9bec-671b4a0715d8" />

</details>

- Image popup & slider, if the user clicks the image, the image will be displayed in a popup. The user can also slide the image. My plan is to use [vue-ssr-carousel](https://www.npmjs.com/package/vue-ssr-carousel) to create the slider.


## Notes

Feel free to contact me if you have any questions. Thank you for your time and consideration.