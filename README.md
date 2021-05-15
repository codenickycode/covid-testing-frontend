# Covid Testing Appointment App

![urgentMDFlow](https://user-images.githubusercontent.com/25669830/118365614-7db3de00-b56b-11eb-980c-0cb48efa393d.gif)

[UrgentMD Covid-19 Testing](https://covid-testing.netlify.app) <- Click here to try the prototype

Engineer: Nick Carbone | drumnickydrum@gmail.com <br/>
UX: Andrea Huang | andreahuanggg@gmail.com

## About (Engineering perspective)
This is a MERN-stack prototype to book a Covid-19 testing appointment. 
- Client-side routing with intuitive flow and authorized routes
- Persistent data on refresh (with reload of React application)
- Sorting and Searching
- Quality UX feedback and input validations
- Custom login strategy

For the backend, visit https://github.com/drumnickydrum/covid-testing-server

## About (User perspective)
Covid-19 Testing Appointment App:
- Book a new appointment by searching locations
  - filtered by the tests they require
  - sorted by nearest or next available time
- Create an account to maintain your current info
  - this submits your information to the clinic ahead of time
  - Sensitive information is filtered from browser storage
- View upcoming and past appointments
- Adjust personal app settings

#### Known bugs

- Infrequently the Google Distance API returns 500 status and requires the user to try their search again.

## Walkthrough

### Overview

#### React

I tried to keep this flow:

- high-level and general -> low-level and specific.

For this reason I extracted many functions out of components so that the return statements are easy to read at a glance. This helped as the app grew large and I'd read a file thinking, _'what exactly is this component supposed to render?'_

useEffect is used a lot to answer: _'what is suppose to happen if the state of the app is xyz'_ As this entire app was a learning exercise, I made it a mission not to argue with the linter. This helped me think deeply about what each component's purpose is, and how it relates to it's own internal state as well as the state of the context it's consuming.

#### Directories

- /pages
  - The main routes of the app
  - Each page provides a folder for nested routes and children components
- /Providers
  - ContextProvider keeps and maintains all shared data
  - GoProvider hijacks route switching to enable a smooth css transition
- /components
  - gloabally shared components
- /tools
  - globally shared functions
  - information that would be received from a 'provider portal' (available tests, company info, timeslot schedule)

In general, parent components house logic for their children. Globally shared data is handled within ContextProvider. Session storage is used to prevent a total loss if the user refreshes the window. Local storage is used to remember user (editable preference in /settings).

#### Inputs

Inputs are controlled for validation and required fields. Error messages and input focusing guides the user to correctly fill out forms, and the presence of an error will disable submit buttons.

#### Gateway Component

This is a path that prevents access to login-required routes. If the user is not logged in but has 'remember me' enabled, getClient() is called. Once resolved they are routed to their page. If this is their first request or if 'remember me' was not previously enabled, the login modal displays.
