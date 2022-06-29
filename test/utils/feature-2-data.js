module.exports = {
  "featureName": "Memberships Feature",
  "endpoints": [
    {
      "endpointName": "Get all Members for a Group by Group id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": false,
      "specs": [
        {
          "specName": "Successful Response if NOT the organizer",
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
              "Members": [
                {
                  "id": 2,
                  "firstName": "Clark",
                  "lastName": "Adams",
                  "Membership": {
                    "status": "co-host"
                  },
                },
                {
                  "id": 3,
                  "firstName": "John",
                  "lastName": "Smith",
                  "Membership": {
                    "status": "member"
                  },
                },
              ]
            },
          }
        },
        {
          "specName": "Successful Response if you ARE the owner (include 'pending')",
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
              "Members": [
                {
                  "id": 2,
                  "firstName": "Clark",
                  "lastName": "Adams",
                  "Membership": {
                    "status": "co-host"
                  },
                },
                {
                  "id": 3,
                  "firstName": "John",
                  "lastName": "Smith",
                  "Membership": {
                    "status": "member"
                  },
                },
                {
                  "id": 4,
                  "firstName": "Jane",
                  "lastName": "Doe",
                  "Membership": {
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
      "endpointName": "Get all Members for a Group from a non-existent id",
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
      "endpointName": "Request a new Membership for a Group specified by Group id",
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
            "body": null
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "200",
            "body": {
              "groupId": 1,
              "memberId": 2,
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
      "endpointName": "Request a new Membership for a Group from a non-existent id",
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
      "endpointName": "Request Membership for a Group that the Current User already is already 'pending'",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
      "specs": [
        {
          "specName": "Membership has already been requested",
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
              "message": "Membership has already been requested",
              "statusCode": 400
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Membership has already been requested";
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
      "endpointName": "Request Membership for a Group that the Current User already is already accepted",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
      "specs": [
        {
          "specName": "User is already a member of the group",
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
              "message": "User is already a member of the group",
              "statusCode": 400
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "User is already a member of the group";
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
      "endpointName": "Change a Membership status by Group id",
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
              "memberId": 2,
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
              "groupId": 1,
              "memberId": 2,
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
          "specName": "Cannot change a membership status to pending",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "memberId": 2,
              "status": "pending"
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "400",
            "body": {
              "message": "Cannot change a membership status to pending",
              "statusCode": 400
            }
          }
        },
        {
          "specName": "Membership between the user and the group does not exits",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "memberId": 3,
              "status": "member"
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "400",
            "body": {
              "message": "Membership between the user and the group does not exits",
              "statusCode": 400
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Membership between the user and the group does not exits";
              }
            },
            "body.statusCode.validate": {
              "bodyStatusCode": function(value){
                return value === 400;
              }
            }
          }
        }
      ]
    },
    {
      "endpointName": "Change a Membership status to 'co-host'",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
      "specs": [
        {
          "specName": "Error Response: Current User must be the organizer to add a co-host",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "memberId": 2,
              "status": "co-host"
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "403",
            "body": {
              "message": "Current User must be the organizer to add a co-host",
              "statusCode": 403
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Current User must be the organizer to add a co-host";
              }
            },
            "body.statusCode.validate": {
              "bodyStatusCode": function(value){
                return value === 403;
              }
            }
          }
        },
        {
          "specName": "Error Response: Current User must be the organizer or a co-host to make someone a member",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "memberId": 2,
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
      "endpointName": "Delete a Membership",
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
              "memberId": 1
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
      "endpointName": "Delete a Membership from a non-existent Group id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
      "specs": [
        {
          "specName": "Error Response: Couldn't find a Group with the specified id",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "memberId": 1
            }
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
      "endpointName": "Delete a Membership from a Group the User has not joined",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
      "specs": [
        {
          "specName": "Error Response: Membership does not exist for this User",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "memberId": 2
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "404",
            "body": {
              "message": "Membership does not exist for this User",
              "statusCode": 404
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Membership does not exist for this User";
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
      "endpointName": "Delete another Membership from a Group when not the organizer",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
      "specs": [
        {
          "specName": "Error Response: Only the User or organizer may delete a Membership",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "memberId": 2
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "403",
            "body": {
              "message": "Only the User or organizer may delete a Membership",
              "statusCode": 403
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Only the User or organizer may delete a Membership";
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