## Project Overview

TTS web app with indications for the current reading sentence, as well as the ability to highlight the currently playing word.

It should retrieve the SSML from an API, synthesize it into sentences, and use speech engine to implement the playback and UI.

## Setup

- Clone the repository and run `npm install` to install the dependencies.
- Run `npm run dev` to start the client development server.
- Run `npm run dev:server` to start the API server.

### API

- The code for the API is in the `api` directory. This piece is basically responsible for sending a random response from the array defined in `data.ts`.
- The API returns a response in form of a JSON object containing contents. The content string is in form of a subset of SSML.

### Parsing SSML

- The API returns the content in form of an SSML string. This string will only contain a subset of SSML features: `<speak>`, `<p>`, `<s>`.
- This project only requires focus on the `<s>`element which defines the beginning and the end of the sentences.
- Extract all the sentences from the SSML files ignoring everything else that is invalid.

Parser have the same output as below:

```ts
/*
 * input: "<speak><s>This is a sentence.</s><s>This is another sentence</s></speak>",
 * sentences: ['This is a sentence.', 'This is another sentence']
 *
 * input: <speak><s>This is a sentence.</s><s>This is another sentence</s>Some more text</speak>
 * sentences: ['This is a sentence.', 'This is another sentence']
 *
 * input: <speak><s>This is a sentence.</s><s>This is another sentence</s>Some more text<s>This is a longer piece of content</s></speak>
 * sentences: ['This is a sentence.', 'This is another sentence', 'This is a longer piece of content']
 */
```

### React App

- The project is a basic react app, and such should come with all of the standard built ins of react.
- Core logic for the project is hosted in `lib` folder.
- `content.ts` file in the lib folder is responsible for fetching and parsing content into sentences.
- `speech.ts` file contains an implementation for speech engine using the local window.speechSynthesis API.
- `useSpeech.ts` reactifies the speech engine implementation and returns the controls for playback and gives information about the currently spoken word and sentence.

### Running Project Example

![Example](example.gif)
