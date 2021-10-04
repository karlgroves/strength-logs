# Strength Logs API Documentation

## Purpose and Introduction

The Strength Logs API allows users to keep track of strength training activities.

As it evolves it may allow for other fitness-related object types to be logged.

## Authentication

Prior to making any requests, the user must be authenticated.  This is done by `POST`ing to the `/login/` route as described in [Register, Confirm, and Login](RegisterConfirmLoginLogout.md).

*All* subsequent requests must use the returned `access_token` as the `Authorization` request header in the form of `Bearer {access_token}`

Any request attempted without that header - or without a valid value for that header - will receive an `HTTP 401` response. Numerous, repeated attempts may result in having the requesting IP banned automatically.

## Requests

### URL Structure

_In general_ the routing structure uses the following general structure: `{hostname}/{userID}/{object}/{objectID}` where:

 * `hostname` is the hostname of the server that this API is hosted on
 * `userID` is the userID of the user making the request (unless the user is an admin. Admin users can view all information for all users)
 * `object` is the type of object the operation is working with. The `object` must be one of:
   * `exercises`
   * `traininglogs`
   * `users` (some of the requests under `/users/` routes are only available to admin users)
 * `objectID` is the unique identifier for the object for `PUT`, `DELETE` and `GET` by `ID` operations
 
### Request Types

Assuming the request is valid and the user has the necessary permissions, the following apply:

 * `GET` operations will always retrieve all records of the requested type that are owned by the user making the request.
 * `GET` by `ID` operations will always retrieve a specific record as identified by the `ID` being requested.
 * `POST` operations will always add a new record
 * `PUT` operations will always update a specific record as identified by the `ID` being requested.
 * `DELETE` operations will always delete a specific record as identified by the `ID` being requested. _`DELETE` operations are permanent and irreversible_
 
All successful requests return HTTP `200` response 
 
### General Validation

While some routes will have their own unique object-specific validation, *all* routes have the following basic validation:

 * The `userID` supplied must either:
   * Be the `ID` of the user making the request, or
   * If the user making the request is an admin, the `userID` must be a UUID of an actual user in the database
 * The `object` supplied  must be one of:
   * `exercises`
   * `traininglogs`
   * `users` (these routes are only available to admin users)
 * The `objectID` must be a UUID of an actual record in the database owned by the `userID` in the request

## Responses

 * All responses will set the appropriate HTTP headers including HTTP status code.
 * All responses will contain the following pieces of information:
    * `status`: The relevant (integer) HTTP status code for the response
    * `message`: The corresponding string representation of the HTTP status code
    * `info`: A human-readable string describing the circumstances of the response
    * `responseTime`: datetime of the response
 * In addition, some routes will contain:
    * `data`: Depending on the type of request, `data` will either be an object or an array containing the information returned by the API.
      * For `POST` and `PUT` operations, the `data` returned will only be the `id` of the record added or modified, respectively

### Status Codes & Explanations  
  
| HTTP Status Code | Explanation |
| ----------- | ----------- |
| `200` | The request was valid and the operation was successful | 
| `400` | One (or more) of the parameters supplied was missing or invalid | 
| `401` | The user is not authenticated or does not have permission to perform that operation |
| `404` | The `id` provided was not valid or was not owned by the user making the request |
| `405` | The `object` provided was not valid |
| `500` | There was a problem on our end and the request could not be processed |
