# Meetup Test Specs

## Authentication Required:
### User Authentication
- GET /me - Get the Current User
  - [ ] Success

### Groups
- GET /me/groups - Return all Groups joined or organized by Current User
  - [ ] Success
- POST /groups - Create a Group
  - [ ] Success
  - [ ] Body validation
- PUT /groups/:groupId - Update a Group
  - [ ] Success
  - [ ] Body validation
  - [ ] Invalid id
- DELETE /groups/:groupId - Delete a Group
  - [ ] Success
  - [ ] Invalid id

### Memberships
- POST /groups/:groupId/membership - Request a Membership by Group id
  - [ ] Success
  - [ ] Invalid id
  - [ ] Pending membership exists
  - [ ] Accepted membership exists
- PUT /groups/:groupId/membership - Change Membership status by Group id
  - [ ] Success
  - [ ] Invalid id
  - [ ] Co-host can only be made by organizer
  - [ ] Member can only be made by organizer or co-host
  - [ ] Cannot change to "pending"
  - [ ] Current membership does not exist
- DELETE /groups/:groupId/membership - Delete own membership (or other member if you are the organizer)
  - [ ] Success
  - [ ] Invalid id - Group
  - [ ] Invalid id - Member (not joined)
  - [ ] Not the User or Group organizer

### Venues
- POST /groups/:groupId/venues - Create a new Venue for a Group by id
  - [ ] Success
  - [ ] Invalid id
  - [ ] Body validation
- PUT /venues/:venueId - Edit a venue by id
  - [ ] Success
  - [ ] Invalid id - Group
  - [ ] Invalid id - Venue
  - [ ] Body validation

### Events
- POST /groups/:groupId/events - Create an Event for a Group by id
  - [ ] Success
  - [ ] Invalid id
  - [ ] Body validation
- PUT /events/:eventId - Edit an Event by id
  - [ ] Success
  - [ ] Invalid id - Event
  - [ ] Invalid id - Venue
  - [ ] Member can only be made by organizer or co-host
  - [ ] Body validation
- DELETE /events/:eventId - Delete an Event by id
  - [ ] Success
  - [ ] Invalid id

### Attendances
- POST /events/:eventId/attendance - Request attendance for an Event by id
  - [ ] Success
  - [ ] Invalid id
  - [ ] Pending attendance exists
  - [ ] Accepted attendance exists
- PUT /events/:eventId/attendance - Change status of an attendance by Event id
  - [ ] Success
  - [ ] Invalid id
  - [ ] Cannot change to "pending"
  - [ ] Current attendance does not exist
- DELETE /events/:eventId/attendance - Delete attendance by Event id
  - [ ] Success
  - [ ] Invalid id - Group
  - [ ] Invalid id - Member (not joined)
  - [ ] Not the User or Group organizer

### Images
- POST /groups/:groupId/images - Create an Image for a Group by id
  - [ ] Success
  - [ ] Invalid id
- POST /events/:eventId/images - Create an Image for an Event by id
  - [ ] Success
  - [ ] Invalid id
- DELETE /images/:imageId - Delete an Image 
  - [ ] Success
  - [ ] Invalid id


## No Authentication Required:
### User Authentication
- POST /login - Log in a User
  - [ ] Success
  - [ ] Invalid credentials
  - [ ] Body validation
- POST /signup - Sign up a User
  - [ ] Success
  - [ ] User exists
  - [ ] Body validation

### Groups
- GET /groups - Return all groups
  - [ ] Success
- GET /groups/:groupId - Return Group details by id
  - [ ] Success
  - [ ] Invalid id

### Memberships
- GET /groups/:groupId/members - Return members of a Group by id
  - [ ] Success if you ARE the organizer (all members and status)
  - [ ] Success if NOT the organizer (does not show "pending" members)
  - [ ] Invalid id

### Events
- GET /events - Return all Events
  - [ ] Success
- GET /groups/:groupId/events - Return all Events of a Group by id
  - [ ] Success
  - [ ] Invalid id
- GET /events/:eventId - Return the details of an Event by id
  - [ ] Success
  - [ ] Invalid id

### Attendances
- GET /events/:eventId/attendees
  - [ ] Success if you ARE the organizer/co-host (all attendees)
  - [ ] Successs if NOT the organizer/co-host (does not show "pending" members)
  - [ ] Invalid id

### Query Params - Events
- GET /events?page&size&name&type&startDate - Return all Events filtered by query params
  - [ ] Success
  - [ ] Param validation