define({ "api": [
  {
    "type": "post",
    "url": "/delete",
    "title": "Delete a Webhook",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>JWT Token</p>"
          }
        ]
      }
    },
    "name": "Delete",
    "group": "Webhook",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of Webhook</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/index.js",
    "groupTitle": "Webhook"
  },
  {
    "type": "post",
    "url": "/ip",
    "title": "Hit the Trigger Action",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>JWT Token</p>"
          }
        ]
      }
    },
    "name": "IP",
    "group": "Webhook",
    "version": "0.0.0",
    "filename": "routes/index.js",
    "groupTitle": "Webhook"
  },
  {
    "type": "post",
    "url": "/list",
    "title": "List all Webhhooks",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>JWT Token</p>"
          }
        ]
      }
    },
    "name": "List",
    "group": "Webhook",
    "version": "0.0.0",
    "filename": "routes/index.js",
    "groupTitle": "Webhook"
  },
  {
    "type": "post",
    "url": "/register",
    "title": "Register",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>JWT Token</p>"
          }
        ]
      }
    },
    "name": "Register",
    "group": "Webhook",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>Webhook URL</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/index.js",
    "groupTitle": "Webhook"
  },
  {
    "type": "post",
    "url": "/sign-jwt",
    "title": "Sign JWT Token",
    "name": "Sign_JWT",
    "group": "Webhook",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email ID of the User.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/index.js",
    "groupTitle": "Webhook"
  },
  {
    "type": "post",
    "url": "/update",
    "title": "Update",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>JWT Token</p>"
          }
        ]
      }
    },
    "name": "Update",
    "group": "Webhook",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>Webhook URL</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of Webhook</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/index.js",
    "groupTitle": "Webhook"
  }
] });
