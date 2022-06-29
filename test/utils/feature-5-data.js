module.exports = {
  "featureName": "Attendees Feature",
  "endpoints": [
    {
      "endpointName": "Get all Attendees for an Event by Event id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": false,
      "specs": [
        {
          "specName": "Successful Response if NOT the organizer/co-host",
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
              "Attendees": [
                {
                  "id": 2,
                  "firstName": "Clark",
                  "lastName": "Adams",
                  "Attendance": {
                    "status": "member"
                  },
                },
                {
                  "id": 3,
                  "firstName": "John",
                  "lastName": "Smith",
                  "Attendance": {
                    "status": "waitlist"
                  },
                },
              ]
            },
          }
        },
        {
          "specName": "Successful Response if you ARE the organizer/co-host (include 'pending')",
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
              "Attendees": [
                {
                  "id": 2,
                  "firstName": "Clark",
                  "lastName": "Adams",
                  "Attendance": {
                    "status": "member"
                  },
                },
                {
                  "id": 3,
                  "firstName": "John",
                  "lastName": "Smith",
                  "Attendance": {
                    "status": "waitlist"
                  },
                },
                {
                  "id": 4,
                  "firstName": "Jane",
                  "lastName": "Doe",
                  "Attendance": {
                    "status": "pending"
                  },
                },
              ]
            }
          }
        },
      ]
    },
    {
      "endpointName": "Get all Attendees for an Event from a non-existent id",
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
      "endpointName": "Request to Attend an Event specified by Event id",
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
            "body": null
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "200",
            "body": {
              "eventId": 1,
              "userId": 2,
              "status": "pending"
            },
            "body.status.validate": {
              "isPending": function isPending(value){
                return value === "pending";
              }
            }
          }
        }
      ]
    },
    {
      "endpointName": "Request to Attend an Event from a non-existent id",
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
      "endpointName": "Request Attendance for an Event that the Current User is already 'pending'",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
      "requiresAuthorization": true,
      "specs": [
        {
          "specName": "Attendance has already been requested",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": null
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "400",
            "body": {
              "message": "Attendance has already been requested",
              "statusCode": 400
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Attendance has already been requested";
              }
            },
            "body.statusCode.validate": {
              "bodyStatusCode": function(value){
                return value === 400;
              }
            }
          }
        },
      ]
    },
    {
      "endpointName": "Request Attendance for an Event that the Current User is already accepted",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
      "requiresAuthorization": true,
      "specs": [
        {
          "specName": "User is already an attendee of the event",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": null
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "400",
            "body": {
              "message": "User is already an attendee of the event",
              "statusCode": 400
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "User is already an attendee of the event";
              }
            },
            "body.statusCode.validate": {
              "bodyStatusCode": function(value){
                return value === 400;
              }
            }
          }
        },
      ]
    },
    {
      "endpointName": "Change an Attendance status by Event id",
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
              "userId": 2,
              "status": "member"
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "200",
            "body": {
              "id": 1,
              "eventId": 1,
              "userId": 2,
              "status": "member"
            },
            "body.status.validate": {
              "isMember": function isMember(value){
                return value === "member";
              }
            }
          }
        },
        {
          "specName": "Cannot change an attendance status to pending",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "userId": 2,
              "status": "pending"
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "400",
            "body": {
              "message": "Cannot change an attendance status to pending",
              "statusCode": 400
            }
          }
        },
        {
          "specName": "Attendance between the user and the group does not exist",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "userId": 3,
              "status": "member"
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "404",
            "body": {
              "message": "Attendance between the user and the group does not exits",
              "statusCode": 404
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Attendance between the user and the group does not exits";
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
      "endpointName": "Change a Membership status to 'co-host' while not an organizer/co-host",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
      "requiresAuthorization": true,
      "specs": [
        {
          "specName": "Error Response: Current User must be the organizer or a co-host to make someone a member",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "userId": 2,
              "status": "member"
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "403",
            "body": {
              "message": "Current User must be the organizer or a co-host to make someone a member",
              "statusCode": 403
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Current User must be the organizer or a co-host to make someone a member";
              }
            },
            "body.statusCode.validate": {
              "bodyStatusCode": function(value){
                return value === 403;
              }
            }
          }
        }
      ]
    },
    {
      "endpointName": "Change Attendance for an Event from a non-existent id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": false,
      "specs": [
        {
          "specName": "Error Response: Couldn't find an Event with the specified id",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "userId": 2,
              "status": "member"
            }
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
      "endpointName": "Delete an Attendance",
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
              "userId": 1
            }
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
      "endpointName": "Delete an Attendance from a non-existent Event id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
      "specs": [
        {
          "specName": "Error Response: Couldn't find an Event with the specified id",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "userId": 1
            }
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
      "endpointName": "Delete an Attendance from an Event the User has not joined",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
      "specs": [
        {
          "specName": "Error Response: Attendance does not exist for this User",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "userId": 2
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "404",
            "body": {
              "message": "Attendance does not exist for this User",
              "statusCode": 404
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Attendance does not exist for this User";
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
      "endpointName": "Delete another Attendance from a Group when not the organizer",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
      "specs": [
        {
          "specName": "Error Response: Only the User or organizer may delete an Attendance",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "userId": 2
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "403",
            "body": {
              "message": "Only the User or organizer may delete an Attendance",
              "statusCode": 403
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Only the User or organizer may delete an Attendance";
              }
            },
            "body.statusCode.validate": {
              "bodyStatusCode": function(value){
                return value === 403;
              }
            }
          }
        }
      ]
    },
  ]
};