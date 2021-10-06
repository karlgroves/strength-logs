# Users

## Introduction

The users routes are used for CRUD operations on users.

**Note** The `users` routes do not follow the same URL structures as other objects managed by this API, mostly because it would not make sense to do so. 

## `GET`

* Method: `GET`
* Endpoint: `{hostname}/users/`

### Parameters

* None

### Validation

 * [General Validation ](docs.md#general-validation) only
 
### What happens

If the request passes validation, the following query is run against the database:

```

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
* Endpoint: `{hostname}/users/{userID}`

### Parameters

#### URL Parameters

 * [As described in "URL Structure"](docs.md#url-structure)

### Validation

 * [General Validation ](docs.md#general-validation) only

### What happens

If the request passes validation, the following query is run against the database:

```

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
* Endpoint: `{hostname}/users/{userID}`

### Parameters

#### URL Parameters

 * [As described in "URL Structure"](docs.md#url-structure)
 
### Validation

 * [General Validation ](docs.md#general-validation) only

### What happens

If the request passes validation, the following query is run against the database:

```

```

#### On Success

#### On Failure

* The appropriate status is returned, with an informative message indicating what failed and why.

### Example Request

### Example Response

 * `HEAD` routes only return the relevant HTTP status code. No response body is returned.

## `POST`

* Method: `POST`
* Endpoint: `{hostname}/users/`

### Parameters

#### URL Parameters

* None

### Validation

### What happens

If the request passes validation, the following query is run against the database:

```

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
* Endpoint: `{hostname}/users/{userID}`

### Parameters

#### URL Parameters

 * [As described in "URL Structure"](docs.md#url-structure)

### Validation

 * [General Validation ](docs.md#general-validation) only
 
### What happens

If the request passes validation, the following query is run against the database:

```

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
* Endpoint: `{hostname}/users/{userID}`

### Parameters

#### URL Parameters

 * [As described in "URL Structure"](docs.md#url-structure)

### Validation

 * [General Validation ](docs.md#general-validation) only

### What happens

If the request passes validation, the following query is run against the database:

```

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
