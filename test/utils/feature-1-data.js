module.exports = {
  "featureName": "Groups Feature",
  "endpoints": [
    {
      "endpointName": "Get all Groups",
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
              "Groups":[
                {
                  "id": 1,
                  "organizerId": 1,
                  "name": "Evening Tennis on the Water",
                  "about": "Enjoy rounds of tennis with a tight-nit group of people on the water facing the Brooklyn Bridge. Singles or doubles.",
                  "type": "In person",
                  "private": true,
                  "city": "New York",
                  "state": "NY",
                  "createdAt": "2021-11-19 20:39:36",
                  "updatedAt": "2021-11-19 20:39:36",
                  "numMembers": 10,
                  "previewImage": "image url",
                }
              ]
            },
            "body.Groups.minLength": 20,
            "body.Groups.previewImage.allowNull": true,
            "body.Groups.createdAt.validate": {
              "isISO8601": true
            },
            "body.Groups.updatedAt.validate": {
              "isISO8601": true
            },
            "body.Groups.previewImage.validate": {
              "isURL": true
            }
          }
        }
      ]
    },
    {
      "endpointName": "Get all Groups joined or organized by the Current User",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
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
              "Groups":[
                {
                  "id": 1,
                  "organizerId": 1,
                  "name": "Evening Tennis on the Water",
                  "about": "Enjoy rounds of tennis with a tight-nit group of people on the water facing the Brooklyn Bridge. Singles or doubles.",
                  "type": "In person",
                  "private": true,
                  "city": "New York",
                  "state": "NY",
                  "createdAt": "2021-11-19 20:39:36",
                  "updatedAt": "2021-11-19 20:39:36",
                  "numMembers": 10,
                  "previewImage": "image url",
                }
              ]
            },
            "body.Groups.minLength": 2,
            "body.Groups.previewImage.allowNull": true,
            "body.Groups.createdAt.validate": {
              "isISO8601": true
            },
            "body.Groups.updatedAt.validate": {
              "isISO8601": true
            },
            "body.Groups.previewImage.validate": {
              "isURL": true
            }
          }
        }
      ]
    },
    {
      "endpointName": "Get details for a Group from an id",
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
              "organizerId": 1,
              "name": "Evening Tennis on the Water",
              "about": "Enjoy rounds of tennis with a tight-nit group of people on the water facing the Brooklyn Bridge. Singles or doubles.",
              "type": "In person",
              "private": true,
              "city": "New York",
              "state": "NY",
              "createdAt": "2021-11-19 20:39:36",
              "updatedAt": "2021-11-19 20:39:36",
              "numMembers": 10,
              "images": [
                "image url"
              ],
              "Organizer": {
                "id": 1,
                "firstName": "John",
                "lastName": "Smith"
              }
            },
            "body.createdAt.validate": {
              "isISO8601": true
            },
            "body.updatedAt.validate": {
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
      "endpointName": "Get details for a Group from a non-existent id",
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
      "endpointName": "Create and return a new Group",
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
              "name": "Evening Tennis on the Water",
              "about": "Enjoy rounds of tennis with a tight-nit group of people on the water facing the Brooklyn Bridge. Singles or doubles.",
              "type": "In person",
              "private": true,
              "city": "New York",
              "state": "NY",
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "201",
            "body": {
              "id": 1,
              "organizerId": 1,
              "name": "Evening Tennis on the Water",
              "about": "Enjoy rounds of tennis with a tight-nit group of people on the water facing the Brooklyn Bridge. Singles or doubles.",
              "type": "In person",
              "private": true,
              "city": "New York",
              "state": "NY",
              "createdAt": "2021-11-19 20:39:36",
              "updatedAt": "2021-11-19 20:39:36" 
            },
            "body.createdAt.validate": {
              "isISO8601": true
            },
            "body.updatedAt.validate": {
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
              "name": "This is a very long name that should not be allowed to persist for the group",
              "about": "Too short.",
              "type": "Not a valid type",
              "private": 4
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "400",
            "body": {
              "message": "Validation Error",
              "statusCode": 400,
              "errors": {
                "name": "Name must be 60 characters or less",
                "about": "About must be 50 characters or more",
                "type": "Type must be Online or In person",
                "private": "Private must be a boolean",
                "city": "City is required",
                "state": "State is required",
              }
            }
          }
        }
      ]
    },
    {
      "endpointName": "Updates and returns an existing Group",
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
              "name": "Evening Tennis on the Water",
              "about": "Enjoy rounds of tennis with a tight-nit group of people on the water facing the Brooklyn Bridge. Singles or doubles.",
              "type": "In person",
              "private": true,
              "city": "New York",
              "state": "NY",
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "201",
            "body": {
              "id": 1,
              "organizerId": 1,
              "name": "Evening Tennis on the Water",
              "about": "Enjoy rounds of tennis with a tight-nit group of people on the water facing the Brooklyn Bridge. Singles or doubles.",
              "type": "In person",
              "private": true,
              "city": "New York",
              "state": "NY",
              "createdAt": "2021-11-19 20:39:36",
              "updatedAt": "2021-11-20 10:06:40" 
            },
            "body.createdAt.validate": {
              "isISO8601": true
            },
            "body.updatedAt.validate": {
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
              "name": "This is a very long name that should not be allowed to persist for the group",
              "about": "Too short.",
              "type": "Not a valid type",
              "private": 4
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "400",
            "body": {
              "message": "Validation Error",
              "statusCode": 400,
              "errors": {
                "name": "Name must be 60 characters or less",
                "about": "About must be 50 characters or more",
                "type": "Type must be Online or In person",
                "private": "Private must be a boolean",
                "city": "City is required",
                "state": "State is required",
              }
            }
          }
        }
      ]
    },
    {
      "endpointName": "Edit details for a Group from a non-existent id",
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
      "endpointName": "Delete a Group",
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
      "endpointName": "Delete a Group from a non-existent id",
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
  ]
};