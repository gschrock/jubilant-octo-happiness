### Instructions

Requirements: Docker and Docker Compose

1. Clone this repo to your own machine (do not fork it)
2. Run `docker-compose up -d` to start all services
3. Run Migration Script
4. Run Seed Script
5. Visit [http://localhost:5173](http://localhost:5173)

### Summary of enhancements

- Included seed data file for student data
- Added new fields (including bonus fields) with validation
  - note: latitude and longitude are not editable but are displayed in a mocked state, it would probably make sense to have a location api of some sort determine latitude and longitude as student entries are created or updated
- The form can create and edit student records
- Error handling and user feedback is included
  - note: there is absolutely room for improvement especially with api error handling since it is minimal and does not cover every possible scenario clearly (e.g. email already in use), but form validation works well enough within reason
- Student List displays all student information with ascending/descending sort by name and filter by email or name functionality
- Created multiple reusable components
  - note: room for improvement here but a good start considering the time constraints
