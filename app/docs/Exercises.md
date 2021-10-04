# Exercises

## Introduction

The `exercise` routes are used to interact with a user's own library of exercises that they can then use for training logs.

## `GET`

 * Method: `GET`
 * Endpoint: `{hostname}/{userID}/exercises/`
 
### Parameters

#### URL Parameters

 * [As described in "URL Structure"](docs.md#url-structure)

### Validation

 * [General Validation ](docs.md#general-validation)
 
### What happens

If the request passes validation, the following query is run against the database:

```
SELECT * FROM exercises WHERE userID={userID} ORDER BY exerciseName;
```

#### On Success

#### On Failure

* The appropriate status is returned, with an informative message indicating what failed and why.
 
### Example Request

```

```

### Example Response

```json

```

## `GET` by ID

 * Method: `GET`
 * Endpoint: `{hostname}/{userID}/exercises/{exerciseID}`
 
### Parameters

#### URL Parameters

 * [As described in "URL Structure"](docs.md#url-structure)

### Validation

 * [General Validation ](docs.md#general-validation)
 
### What happens

If the request passes validation, the following query is run against the database:

```
SELECT * FROM exercises WHERE userID={userID} AND exerciseID={exerciseID} LIMIT 1;
```

#### On Success

#### On Failure

* The appropriate status is returned, with an informative message indicating what failed and why.
 
### Example Request

```

```

### Example Response


```json

```

## `HEAD`

 * Method: `HEAD`
 * Endpoint: `{hostname}/{userID}/exercises/{exerciseID}`
 
### Parameters

#### URL Parameters

 * [As described in "URL Structure"](docs.md#url-structure)

### Validation

 * [General Validation ](docs.md#general-validation)
 
### What happens

If the request passes validation, the following query is run against the database:

```
SELECT exerciseID FROM exercises WHERE userID={userID} AND exerciseID={exerciseID} LIMIT 1;
```

#### On Success

#### On Failure
 
* The appropriate status is returned, with an informative message indicating what failed and why.

### Example Request

```

```

### Example Response

 * `HEAD` routes only return the relevant HTTP status code. No response body is returned.

## `POST`

 * Method: `POST`
 * Endpoint: `{hostname}/{userID}/exercises/`
 
### Parameters

#### URL Parameters

 * [As described in "URL Structure"](docs.md#url-structure)
 
#### Request Body




### Validation

 * 
 
### What happens

If the request passes validation, the following query is run against the database:

```
INSERT INTO exercises() VALUES();
```

#### On Success

#### On Failure 

* The appropriate status is returned, with an informative message indicating what failed and why.

### Example Request


```json

```

### Example Response


```json

```

## `PUT`

 * Method: `PUT`
 * Endpoint: `{hostname}/{userID}/exercises/{exerciseID}`
 
### Parameters

#### URL Parameters

 * [As described in "URL Structure"](docs.md#url-structure)


#### Request Body



### Validation

 * 
 
### What happens

If the request passes validation, the following query is run against the database:

```
UPDATE exercises SET WHERE userID={userID} AND exerciseID={exerciseID};
```

#### On Success

#### On Failure

* The appropriate status is returned, with an informative message indicating what failed and why.

### Example Request


```json

```

### Example Response

```json

```

## `DELETE`

 * Method: `DELETE`
 * Endpoint: `{hostname}/{userID}/exercises/{exerciseID}`
 
### Parameters

#### URL Parameters

 * [As described in "URL Structure"](docs.md#url-structure) 

### Validation

 * [General Validation ](docs.md#general-validation)
 
 
### What happens

If the request passes validation, the following query is run against the database:

```
DELETE FROM exercises WHERE userID={} AND exerciseID={exerciseID};
```

#### On Success

#### On Failure 

### Example Request

```

```

### Example Response

```json

```
