# Reservation App

The web application does the following:
  - Allows providers to submit times they'd like to work on the schedule.
  - Allows clients to see available slots.
  - Allows clients to reserve an available slot.
  - Allows clients to confirm their reservation.

## Provider Scheduling

The web application allows providers to submit times they would like to work on the schedule. Given the time constraints, providers are only allowed to input blocks of times one by one. For example, they can input their availablility for April 22 from 10am to 4pm as one block. However, they would need to input April 23 from 10am to 2pm and April 23 from 3pm to 5pm in 2 requests. With initial launch, this may take providers some time to add their schedule. Afterwards, adding availability would not take as long with fairly frequent updates to the schedule. Following iterations may address this issue of having an easier method of adding to the provider's schedule.

## Client booking

The web application allows clients to see available slots that are 24 hours after the current time to satisfy the requirement of reservations being made at least 24 hours in advance. The slots are in 15 minute increments. The API is assumed to reserve the slot in 15 minute increments using the start time given. After a client selects a slot, a popup window will appear to confirm the reservation. If the client confirms the reservation, they would see a `Reservations` section that lists their reservations. The slot they reserved would be removed from the availability slots list.

## Assumptions

The web application returns mock data. Client booking mimics the API call to reserve a time slot. When the application restarts, the mock data would return back to its original state. The API for provider scheduling is assumed to add availability slots that clients would be able to see. 

The web application has a fake authorization as it is assumed there is an existing authorization API. The fake authorization is to portray that clients need to login to book their slots and that providers need to login to add their availability. Authorization is essential for this web application as accurate data from both providers and clients are needed to have a smooth experience for both parties. However, as mentioned earlier, it is assumed that with provider and client signup, an authorization API already exists. The fake authorization currently does not allow providers to sign in on the client page and does not allow clients to sign in on the providers page.

## Requirements that were not met

The requirement to have reservations expire after 30 minutes if not confirmed was not met. With the current implementation, the reservation is booked after clicking the available slot. When the client clicks cancel or outside of the modal, the reservation is cancelled and available again. Since it is unlikely that a user will remain on the page with the modal open, this requirement was not considered essential for production release.

## Steps before production release

Before production release, the web application should be tested extensively to ensure that providers are able to sign in and add to their schedule and that clients can see all available slots and reserve it. Corner cases should be tested to ensure that providers cannot be double booked and that clients do not have overlapping appointments. Ideally, there should be a few providers and internal clients testing the web application.

The web application should also add the feature of listing the name of the providers for the available slots. This would cause less confusion for clients who would see duplicate slots. Adding the provider name, and possibly gender, would help clients be able to book with a provider they have seen before and/or more comfortable with.

The first release of the web application should be to a small subset of clients to ensure that there are no major bugs to be addressed. If there are no major bugs of adding to the provider schedule and booking slots, then following releases should address the requirement of having reservations expire after 30 minutes as well as feedback from providers and clients regarding the web application.

## Additional comments

Ideally, there would be automated end to end tests to ensure the core requirements, such as reserving a slot and adding to the provider's schedule, are met. Given the time constraints, testing was done manually.

The project was based off of the auth example project from React Router.
https://github.com/remix-run/react-router/tree/dev/examples/auth