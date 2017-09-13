# Key Value API Documentation

**Description**
----
This API is for a simple key value pair storage application. The features are as follows:

```
Add key-value pair
Get key-value pair
Get key-value pair on specific timestamp
```
  
# API Endpoints

**Add key-value pair**
----
  Add a key-value pair or update the value if key is already existing.

* **URL**

  /api/object

* **Method:**

  `POST`
  
*  **URL Params**
  None

* **Data Params**

   **Required:**
 
   `[key]=[value]`
  
  **Example:**

  ```json
    {
      "key": "value"
    }
  ```


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"msg":"Successfully added key: key"}`
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{"err":"Error: missing key and value"}`
    

**Get value**
----
  Fetch latest value of key

* **URL**

  /api/object/[key]

* **Method:**

  `GET`
  
*  **URL Params**
  key = key string to query value

* **Data Params**
  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "msg": "Successfully fetched value of key: testkey",
    "value": "testvalue latest"
  }`
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ "error": "Unable to find key: key" }`


**Get value at timestamp**
----
  Fetch value of key at a given timestamp

* **URL**

  /api/object/[key]/[timestamp]

* **Method:**

  `GET`
  
*  **URL Params**
  key = key string to query value
  timestamp = timestamp to query

* **Data Params**
  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "msg": "Successfully fetched value of key: testkey at Timestamp: 1505315102517",
    "value": "testvalue old"
  }`
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ "error": "Unable to find key: key" }`
    
    
  * **Code:** 400 <br />
    **Content:** `{"err":"Error: Could not find the value of key: testkey at Timestamp: 1"}`
