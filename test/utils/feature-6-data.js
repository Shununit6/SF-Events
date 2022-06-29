module.exports = {
  "featureName": "Images Feature",
  "endpoints": [
    {
      "endpointName": "Create an Image for a Group by id",
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
              "url": "image url"
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "200",
            "body": {
              "id": 1,
              "imageableId": 1,
              "imageableType": "Group",
              "url": "image url",
            },
            "body.url.validate": {
              "isURL": true
            },
            "body.imageableType.validate": {
              "imageableType": function(value){
                return value === "Group";
              }
            }
          }
        }
      ]
    },
    {
      "endpointName": "Create an Image for a Group from a non-existent id",
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
              "url": "image url"
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
      "endpointName": "Create an Image for an Event by id",
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
              "url": "image url"
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "200",
            "body": {
              "id": 1,
              "imageableId": 1,
              "imageableType": "Event",
              "url": "image url",
            },
            "body.url.validate": {
              "isURL": true
            },
            "body.imageableType.validate": {
              "imageableType": function(value){
                return value === "Event";
              }
            }
          }
        }
      ]
    },
    {
      "endpointName": "Create an Image for an Event from a non-existent id",
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
              "url": "image url"
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
      "endpointName": "Delete an Image",
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
      "endpointName": "Delete an Image from a non-existent id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
      "specs": [
        {
          "specName": "Error Response: Couldn't find an Image with the specified id",
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
              "message": "Image couldn't be found",
              "statusCode": 404
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Image couldn't be found";
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