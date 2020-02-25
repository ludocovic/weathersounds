import { playSound, setSelectedOctave, stopSound } from './soundcontrol.js';

const KeyToMidiOctaveBaseValueMap = {
  'a': 12,
  'w': 13,
  's': 14,
  'e': 15,
  'd': 16,
  'f': 17,
  't': 18,
  'g': 19,
  'z': 20,
  'h': 21,
  'u': 22,
  'j': 23,
};

const validOctaves = ['1', '2', '3', '4', '5', '6', '7',]

export function mapKeyToMidiValue(key, octave) {
  key = key.toLowerCase();

  if (!KeyToMidiOctaveBaseValueMap.hasOwnProperty(key)) {
    return 0;
  }

  const baseMidiValue = KeyToMidiOctaveBaseValueMap[key];

  return baseMidiValue +(12 * octave);
}

export function mapKeyToOctave(key) {
  if (validOctaves.includes(key)) {
    return parseInt(key);
  }

  return 0;
}

export function initializeKeyboard(p5Instance) {
  p5Instance.keyPressed = function() {
    const selectedOctave = mapKeyToOctave(p5Instance.key);
    if (selectedOctave != 0) {
      setSelectedOctave(mapKeyToOctave(p5Instance.key));
    }
    playSound(p5Instance.key);
  };

  p5Instance.keyReleased = function() {
    stopSound(p5Instance.key);
  };
}
