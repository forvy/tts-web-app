const API_URL = "http://localhost:5174/content";

/**
 * Fetch the content from the api
 * In case of an error, return content as "<speak><s>There was an error</s></speak>"
 */
const fetchContent = async (url = API_URL): Promise<string> => {
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result.content;
  } catch (err) {
    return "<speak><s>There was an error</s></speak>";
  }
};

/**
 * Parse the content into sentences, and return an array of sentences. Look at the Readme for sample input and expected output.
 * Avoid using DOMParser for implementing this function.
 */
const parseContentIntoSentences = (content: string): string[] => {
  if (!content.startsWith("<speak>")) throw new Error("This is not valid ssml");
  let text = [],
    m,
    rex = /<s>(.*?)<\/s>/g;

  while ((m = rex.exec(content)) != null) {
    text.push(m[1]);
  }
  return text;
};

export { fetchContent, parseContentIntoSentences };
