import { useEffect, useState } from "react";

import {
  PlayingState,
  SpeechEngineOptions,
  createSpeechEngine,
} from "./speech";

/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/

const useSpeech = (sentences: Array<string>) => {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [currentWordRange, setCurrentWordRange] = useState<[number, number]>([
    0, 0,
  ]);

  const [playbackState, setPlaybackState] = useState<PlayingState>("paused");

  const speechOptions: SpeechEngineOptions = {
    onBoundary: (e) => {
      setCurrentWordRange([e.charIndex, e.charIndex + e.charLength]);
    },
    onEnd: (e) => {
      setCurrentWordRange([0, 0]);
      setCurrentSentenceIdx(currentSentenceIdx + 1);
    },
    onStateUpdate: (state) => {
      setPlaybackState(state);
    },
  };

  const { play, pause, load } = createSpeechEngine(speechOptions);
  if (load) load(sentences[currentSentenceIdx]);

  useEffect(() => {
    setCurrentSentenceIdx(0);
  }, [sentences]);

  return {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    play,
    pause,
  };
};

export { useSpeech };
