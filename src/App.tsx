import { useState } from "react";
import "./App.css";

import { Controls } from "./components/Controls";
import { CurrentlyReading } from "./components/CurrentlyReading";
import { fetchContent, parseContentIntoSentences } from "./lib/content";
import { useSpeech } from "./lib/useSpeech";

function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  const { currentSentenceIdx, currentWordRange, playbackState, play, pause } =
    useSpeech(sentences);

  const getContent = async () => {
    await fetchContent().then((res) => {
      setSentences(parseContentIntoSentences(res));
    });
  };
  return (
    <div className="App">
      <div>
        <CurrentlyReading
          sentences={sentences}
          currentSentenceIdx={currentSentenceIdx}
          currentWordRange={currentWordRange}
        />
      </div>
      <div>
        <Controls
          state={playbackState}
          play={play}
          pause={pause}
          loadNewContent={getContent}
        />
      </div>
    </div>
  );
}

export default App;
