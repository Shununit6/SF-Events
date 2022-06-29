const { isLat, isLng } = require('./custom-validators');

module.exports = {
  "featureName": "Venues Feature",
  "endpoints": [
    {
      "endpointName": "Create and return a new Venue for a specified Group",
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
              "address": "123 Disney Lane",
              "city": "New York",
              "state": "NY",
              "lat": 37.7645358,
              "lng": -122.4730327,
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
              "address": "123 Disney Lane",
              "city": "New York",
              "state": "NY",
              "lat": 37.7645358,
              "lng": -122.4730327,
            },
            "body.lat.validate": { isLat },
            "body.lng.validate": { isLng }
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
              "lat": "invalid",
              "lng": "invalid"
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
                "address": "Street address is required",
                "city": "City is required",
                "state": "State is required",
                "lat": "Latitude is not valid",
                "lng": "Longitude is not valid",
              }
            }
          }
        }
      ]
    },
    {
      "endpointName": "Create a Venue for a Group from a non-existent id",
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
              "startDate": "2021-11-19",
              "endDate": "2021-11-19"
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
      "endpointName": "Updates and returns an existing Venue",
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
              "address": "123 Disney Lane",
              "city": "New York",
              "state": "NY",
              "lat": 37.7645358,
              "lng": -122.4730327,
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
              "address": "123 Disney Lane",
              "city": "New York",
              "state": "NY",
              "lat": 37.7645358,
              "lng": -122.4730327,
            },
            "body.lat.validate": { isLat },
            "body.lng.validate": { isLng }
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
              "lat": "invalid",
              "lng": "invalid"
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
                "address": "Street address is required",
                "city": "City is required",
                "state": "State is required",
                "lat": "Latitude is not valid",
                "lng": "Longitude is not valid",
              }
            }
          }
        }
      ]
    },
    {
      "endpointName": "Edit details for a Venue from a non-existent id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": false,
      "specs": [
        {
          "specName": "Error Response: Couldn't find a Venue with the specified id",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "startDate": "2021-11-19",
              "endDate": "2021-11-19"
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "404",
            "body": {
              "message": "Venue couldn't be found",
              "statusCode": 404
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Venue couldn't be found";
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