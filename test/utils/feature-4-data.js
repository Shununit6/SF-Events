module.exports = {
  "featureName": "Events Feature",
  "endpoints": [
    {
      "endpointName": "Get all Events",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": false,
      "specs": [
        {
          "specName": "Successful Response",
          "request": {
            "query": null,
            "headers": null,
            "body": null
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "200",
            "body": {
              "Events": [
                {
                  "id": 1,
                  "groupId": 1,
                  "venueId": null,
                  "name": "Tennis Group First Meet and Greet",
                  "type": "Online",
                  "startDate": "2021-11-19 20:00:00",
                  "numAttending": 8,
                  "previewImage": "image url",
                  "Group": {
                    "id": 1,
                    "name": "Evening Tennis on the Water",
                    "city": "New York",
                    "state": "NY"
                  },
                  "Venue": null,
                },
                {
                  "id": 1,
                  "groupId": 1,
                  "venueId": 1,
                  "name": "Tennis Singles",
                  "type": "In Person",
                  "startDate": "2021-11-20 20:00:00",
                  "numAttending": 4,
                  "previewImage": "image url",
                  "Group": {
                    "id": 1,
                    "name": "Evening Tennis on the Water",
                    "city": "New York",
                    "state": "NY"
                  },
                  "Venue": {
                    "id": 1,
                    "city": "New York",
                    "state": "NY",
                  },
                },
              ]
            },
            "body.Events.minLength": 20,
            "body.Events.venueId.allowNull": true,
            "body.Events.Venue.allowNull": true,
            "body.Events.previewImage.validate": {
              "isURL": true
            }
          }
        }
      ]
    },
    {
      "endpointName": "Get all Events for a Group by Group id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": false,
      "specs": [
        {
          "specName": "Successful Response",
          "request": {
            "query": null,
            "headers": null,
            "body": null
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "200",
            "body": {
              "Events": [
                {
                  "id": 1,
                  "groupId": 1,
                  "venueId": null,
                  "name": "Tennis Group First Meet and Greet",
                  "type": "Online",
                  "startDate": "2021-11-19 20:00:00",
                  "numAttending": 8,
                  "previewImage": "image url",
                  "Group": {
                    "id": 1,
                    "name": "Evening Tennis on the Water",
                    "city": "New York",
                    "state": "NY"
                  },
                  "Venue": null,
                },
                {
                  "id": 1,
                  "groupId": 1,
                  "venueId": 1,
                  "name": "Tennis Singles",
                  "type": "In Person",
                  "startDate": "2021-11-20 20:00:00",
                  "numAttending": 4,
                  "previewImage": "image url",
                  "Group": {
                    "id": 1,
                    "name": "Evening Tennis on the Water",
                    "city": "New York",
                    "state": "NY"
                  },
                  "Venue": {
                    "id": 1,
                    "city": "New York",
                    "state": "NY",
                  },
                },
              ]
            },
            "body.Events.venueId.allowNull": true,
            "body.Events.Venue.allowNull": true,
            "body.Events.previewImage.validate": {
              "isURL": true
            }
          }
        }
      ]
    },
    {
      "endpointName": "Get all Events for a Group from a non-existent id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": false,
      "specs": [
        {
          "specName": "Error Response: Couldn't find a Group with the specified id",
          "request": {
            "query": null,
            "headers": null,
            "body": null
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "404",
            "body": {
              "message": "Group couldn't be found",
              "statusCode": 404
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Group couldn't be found";
              }
            },
            "body.statusCode.validate": {
              "bodyStatusCode": function(value){
                return value === 404;
              }
            }
          }
        }
      ]
    },
    {
      "endpointName": "Get details of an Event from an id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": false,
      "specs": [
        {
          "specName": "Successful Response",
          "request": {
            "query": null,
            "headers": null,
            "body": null
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "200",
            "body": {
              "id": 1,
              "groupId": 1,
              "venueId": 1,
              "name": "Tennis Group First Meet and Greet",
              "description": "First meet and greet event for the evening tennis on the water group! Join us online for happy times!",
              "type": "Online",
              "capacity": 10,
              "price": 18.50,
              "startDate": "2021-11-19 20:00:00",
              "endDate": "2021-11-19 21:00:00",
              "numAttending": 8,
              "Group": {
                "id": 1,
                "name": "Evening Tennis on the Water",
                "private": true,
                "city": "New York",
                "state": "NY"
              },
              "Venue": {
                "id": 1,
                "address": "123 Disney Lane",
                "city": "New York",
                "state": "NY",
                "lat": 37.7645358,
                "lng": -122.4730327,
              },
              "images": [
                "image url"
              ]
            },
            "body.venueId.allowNull": true,
            "body.Venue.allowNull": true,
            "body.startDate.validate": {
              "isISO8601": true
            },
            "body.endDate.validate": {
              "isISO8601": true
            },
            "body.images.validate": {
              "isURL": true
            }
          }
        }
      ]
    },
    {
      "endpointName": "Get details for an Event from a non-existent id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": false,
      "specs": [
        {
          "specName": "Error Response: Couldn't find an Event with the specified id",
          "request": {
            "query": null,
            "headers": null,
            "body": null
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "404",
            "body": {
              "message": "Event couldn't be found",
              "statusCode": 404
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Event couldn't be found";
              }
            },
            "body.statusCode.validate": {
              "bodyStatusCode": function(value){
                return value === 404;
              }
            }
          }
        }
      ]
    },



    {
      "endpointName": "Create and return a new Event for a specified Group",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
      "specs": [
        {
          "specName": "Successful Response",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "venueId": 1,
              "name": "Tennis Group First Meet and Greet",
              "type": "Online",
              "capacity": 10,
              "price": 18.50,
              "description": "The first meet and greet for our group! Come say hello!",
              "startDate": "2021-11-19 20:00:00",
              "endDate": "2021-11-19 21:00:00",
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "200",
            "body": {
              "id": 1,
              "groupId": 1,
              "venueId": 1,
              "name": "Tennis Group First Meet and Greet",
              "type": "Online",
              "capacity": 10,
              "price": 18.50,
              "description": "The first meet and greet for our group! Come say hello!",
              "startDate": "2021-11-19 20:00:00",
              "endDate": "2021-11-19 21:00:00",
            },
            "body.venueId.allowNull": true,
            "body.startDate.validate": {
              "isISO8601": true
            },
            "body.endDate.validate": {
              "isISO8601": true
            }
          }
        },
        {
          "specName": "Request validation errors",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "venueId": 1000,
              "name": "Test",
              "type": "Invalid",
              "capacity": "Large",
              "price": "Free",
              "startDate": "2002-11-19 20:00:00",
              "endDate": "2001-11-19 21:00:00",
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "400",
            "body": {
              "message": "Validation error",
              "statusCode": 400,
              "errors": {
                "venueId": "Venue does not exist",
                "name": "Name must be at least 5 characters",
                "type": "Type must be Online or In person",
                "capacity": "Capacity must be an integer",
                "price": "Price is invalid",
                "description": "Description is required",
                "startDate": "Start date must be in the future",
                "endDate": "End date is less than start date",
              }
            }
          }
        }
      ]
    },
    {
      "endpointName": "Create an Event for a Group from a non-existent id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
      "specs": [
        {
          "specName": "Error Response: Couldn't find a Group with the specified id",
          "request": {
            "query": null,
            "headers": null,
            "body": null
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "404",
            "body": {
              "message": "Group couldn't be found",
              "statusCode": 404
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Group couldn't be found";
              }
            },
            "body.statusCode.validate": {
              "bodyStatusCode": function(value){
                return value === 404;
              }
            }
          }
        }
      ]
    },
    {
      "endpointName": "Create a Review for a Spot that the Current User already reviewed",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
      "specs": [
        {
          "specName": "Duplicate Review Prohibited",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "review": "This was an awesome spot!",
              "stars": 5
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "403",
            "body": {
              "message": "User already has a review for this spot",
              "statusCode": 403
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "User already has a review for this spot";
              }
            },
            "body.statusCode.validate": {
              "bodyStatusCode": function(value){
                return value === 403;
              }
            }
          }
        },
      ]
    },
    {
      "endpointName": "Updates and returns an existing Event",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
      "requiresAuthorization": true,
      "specs": [
        {
          "specName": "Successful Response",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "venueId": 1,
              "name": "Tennis Group First Meet and Greet",
              "type": "Online",
              "capacity": 10,
              "price": 18.50,
              "description": "The first meet and greet for our group! Come say hello!",
              "startDate": "2021-11-19 20:00:00",
              "endDate": "2021-11-19 21:00:00",
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "200",
            "body": {
              "id": 1,
              "groupId": 1,
              "venueId": 1,
              "name": "Tennis Group First Meet and Greet",
              "type": "Online",
              "capacity": 10,
              "price": 18.50,
              "description": "The first meet and greet for our group! Come say hello!",
              "startDate": "2021-11-19 20:00:00",
              "endDate": "2021-11-19 21:00:00",
            },
            "body.venueId.allowNull": true,
            "body.startDate.validate": {
              "isISO8601": true
            },
            "body.endDate.validate": {
              "isISO8601": true
            }
          }
        },
        {
          "specName": "Request validation errors",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "venueId": 1000,
              "name": "Test",
              "type": "Invalid",
              "capacity": "Large",
              "price": "Free",
              "startDate": "2002-11-19 20:00:00",
              "endDate": "2001-11-19 21:00:00",
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "400",
            "body": {
              "message": "Validation error",
              "statusCode": 400,
              "errors": {
                "venueId": "Venue does not exist",
                "name": "Name must be at least 5 characters",
                "type": "Type must be Online or In person",
                "capacity": "Capacity must be an integer",
                "price": "Price is invalid",
                "description": "Description is required",
                "startDate": "Start date must be in the future",
                "endDate": "End date is less than start date",
              }
            }
          }
        }
      ]
    },
    {
      "endpointName": "Edit details for an Event from a non-existent id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": false,
      "specs": [
        {
          "specName": "Error Response: Couldn't find an Event with the specified id",
          "request": {
            "query": null,
            "headers": null,
            "body": null
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "404",
            "body": {
              "message": "Event couldn't be found",
              "statusCode": 404
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Event couldn't be found";
              }
            },
            "body.statusCode.validate": {
              "bodyStatusCode": function(value){
                return value === 404;
              }
            }
          }
        }
      ]
    },
    {
      "endpointName": "Delete an Event",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
      "requiresAuthorization": true,
      "specs": [
        {
          "specName": "Successful Response",
          "request": {
            "query": null,
            "headers": null,
            "body": null
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "200",
            "body": {
              "message": "Successfully deleted",
              "statusCode": 200
            },
            "body.message.validate": {
              "bodyMessage": function(value){
                return value === "Successfully deleted";
              }
            },
            "body.statusCode.validate": {
              "bodyStatusCode": function(value){
                return value === 200;
              }
            }
          }
        }
      ]
    },
    {
      "endpointName": "Delete an Event from a non-existent id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
      "specs": [
        {
          "specName": "Error Response: Couldn't find a Event with the specified id",
          "request": {
            "query": null,
            "headers": null,
            "body": null
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "404",
            "body": {
              "message": "Event couldn't be found",
              "statusCode": 404
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Event couldn't be found";
              }
            },
            "body.statusCode.validate": {
              "bodyStatusCode": function(value){
                return value === 404;
              }
            }
          }
        }
      ]
    },
  ]
};