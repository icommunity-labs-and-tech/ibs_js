# ibs_js
The IBS javascript SDK for browser environments

## Table of contents

1. [Getting Started](#getting-started)
2. [Usage](#usage)
3. [License](#license)
4. [Contact](#contact)

## Getting Started

The main purpose of this library is to provide a way to attach evidences directly to IBS from client-side applications (mostly browsers).

### Prerequisites

You need to get a node.js environment to use this library. Get the latest version from https://nodejs.org/en/download/. The package also could be used in frontend libs like React or Angular.

### Installation

1. Get an API access token from https://dashboard.icommunitylabs.com/publictokens

2. Install the repository from the npm registry:
```sh
npm install ibs_js
```

Or if you are using HTML and JavaScript:

```html
<script src="https://cdn.icommunitylabs.com/client_bundle?v=v0.1.2"></script>
```

3. Set your access_token as an environment variable.

```sh
export IBS_PUBLIC_TOKEN="pub_ ..."
```

You could also set this in your .env file or whatever your frontend library uses. These examples assume you are using the dotenv library.

## Usage

```js
import { IbsClient } from "bundle.js";
import config from "dotenv";

const access_token = config.env.IBS_PUBLIC_TOKEN;

// get an access token here: https://dashboard.icommunitylabs.com/accesstokens
const client = new IbsClient(access_token);

const signatures = ["sig_XXXXXXXXXX", "sig_YYYYYYYYYY"];

const files = getFilesFromForm(); // an array of File objects

await client.certificate("Your evidence title", signatures, files);
```

## License

Distributed under the Apache 2.0 License. See `LICENSE` for more information.


## Contact

Get support at development@icommunitylabs.io