# SteamOAuth

SteamOAuth is a TypeScript class that provides functionality for generating OpenID authentication URLs and verifying OpenID responses from Steam. This can be useful for applications that need to authenticate users using their Steam accounts.



## Features

- Generate OpenID authentication URLs for Steam.
- Verify OpenID responses to ensure user authenticity.
- Sanitize input parameters to prevent potential security issues.

## Installation

To use the SteamOAuth class, you need to have TypeScript installed in your project. You can install TypeScript and steam-oauth via npm:

```bash
npm install steam-oauth
npm install typescript --save-dev
```


# Usage

Importing the Class
First, import the SteamOAuth class into your TypeScript file:

```typescript
import {SteamOAuth} from 'steam-oauth';
```

Generating an OpenID Authentication URL
To generate an OpenID authentication URL, create an instance of the SteamOAuth class and call the generateOpenIDAuthURL method:

```typescript
const steamOAuth = new SteamOAuth();
const baseURL = "https://yourwebsite.com";
const returnURL = "/auth/steam/callback";
const authURL = steamOAuth.generateOpenIDAuthURL(baseURL, returnURL);
console.log(authURL); // Outputs the generated authentication URL
```

# Verifying OpenID Response

After the user has authenticated, you will receive a response containing parameters. You can verify these parameters using the verify method:

```typescript
const params = req.query

steamOAuth.verify(params).then((result) => {
  if (result) {
    console.log(`User ID: ${result}`); // Outputs the user's Steam ID
  } else {
    console.log("Verification failed.");
  }
});
```

## Methods

### `generateOpenIDAuthURL(baseURL: string, returnURL: string): string`

Generates an OpenID authentication URL for Steam.

**Parameters:**

- `baseURL`: The base URL of your application.
- `returnURL`: The URL to which the user will be redirected after authentication.

**Returns:** A string containing the OpenID authentication URL.

---

### `verify(params: Record<string, string>): Promise<string | boolean>`

Verifies the OpenID response from Steam.

**Parameters:**

- `params`: An object containing the OpenID parameters received from Steam.

**Returns:** A promise that resolves to the user's Steam ID as a string if verification is successful, or `false` if verification fails.

## License

This project is licensed under the MIT License.


