# Training Logs

## Introduction

The users routes are used for CRUD operations on training logs.

## `GET`

* Method: `GET`
* Endpoint: `{hostname}/{userID}/traininglogs/`

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

## `GET` by ID

* Method: `GET`
* Endpoint: `{hostname}/{userID}/traininglogs/{traininglogID}`

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
* Endpoint: `{hostname}/{userID}/traininglogs/{traininglogID}`

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

 * `HEAD` routes only return the relevant HTTP status code. No response body is returned.

## `POST`

* Method: `POST`
* Endpoint: `{hostname}/{userID}/traininglogs/`

### Parameters

#### URL Parameters

 * [As described in "URL Structure"](docs.md#url-structure)

### Validation

#### URL Parameters

 * [As described in "URL Structure"](docs.md#url-structure)

#### Request Body

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
* Endpoint: `{hostname}/{userID}/traininglogs/{traininglogID}`

### Parameters

#### URL Parameters

 * [As described in "URL Structure"](docs.md#url-structure)
 
#### Request Body

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

## `DELETE`

* Method: `DELETE`
* Endpoint: `{hostname}/{userID}/traininglogs/{traininglogID}`

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
