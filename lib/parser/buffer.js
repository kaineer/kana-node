//

const createBuffer = (source) => {
  let tail = source;
  const syllables = [];

  const buffer = {
    getSource() {
      return source;
    },
    getTail() {
      return tail;
    },
    getSyllables() {
      return syllables;
    },
    push(...args) {
      syllables.push(...args);
      return buffer;
    },
    drop(n) {
      tail = tail.slice(n);
      return buffer;
    },
    slice(begin, len) {
      return tail.slice(begin, begin + len);
    }
  };

  return buffer;
}

module.exports = {
  createBuffer
}
