// lib/parser/index.js

const { createRule } = require("./rule");
const { createBuffer } = require("./buffer");

const createParser = (source) => {
  const buffer = createBuffer(source.toUpperCase());
  let state = "undefined";

  const rules = [];

  const addRule = (re, options = {}) => {
    rules.push(createRule(re, options));
  }

  // Lowercase vowels
  addRule(/^X([AIUEO])/, { push: ([_, a]) => a.toLowerCase() });

  // Lowercase tsu
  addRule(/^XTSU/, {push: 'tsu'});

  // Vowels
  addRule(/^[AIUEO]/);

  // : as U replacement
  addRule(/^:/, {push: 'U'});

  // N in kin'yobi
  addRule(/^N'/, {push: 'N'});

  // KYO, RYA, NYO etc
  addRule(/^([KGNHBPMR])(Y[AUO])/, {
    push: ([_, a, b]) => [a + "I", b.toLowerCase()]
  });

  // N before not vowel
  addRule(/^N([^AIUEO]|\s|$)/, { push: "N", drop: 1 });

  // Exceptions: CHI, DZU, TSU
  addRule(/^([CS]HI|DZ[IU]|TSU)/);
  addRule(/^D([IU])/, {
    push: ([_, a]) => "DZ" + a
  });

  // SHO --> SHI + yo
  addRule(/^([CS]H|J)([AUO])/, {
    push: ([_, a, b]) => [a + "I", "y" + b.toLowerCase()]
  });

  addRule(/^JI/);
  addRule(/^ZI/, { push: "JI" });
  addRule(/^FU/);

  addRule(/^F([AIEO])/, {
    push: ([_, a]) => ["FU", a.toLowerCase()]
  });

  // Double consonant
  addRule(/^(TC|([CKGSZTDHBPMR])\2)/, { push: "tsu", drop: 1 });

  // Common case, not all cases works though..
  addRule(/^[KGSZTDNHBPMYRW][AIUEO]/);

  //
  const getRule = (buffer) => {
    return rules.find((item) => item.accepts(buffer));
  }

  const stepParse = (buffer) => {
    const rule = getRule(buffer);
    if (rule) {
      rule.handle(buffer);
      return true;
    } else {
      return false;
    }
  }

  return {
    parse() {
      while(buffer.getTail() !== "") {
        if (!stepParse(buffer)) {
          break;
        }
      }

      state = buffer.getTail() === "" ? "success" : "failure";

      // return parser;
    },
    getResult() {
      return buffer.getSyllables();
    },
    getState() {
      return state;
    },
    getTail() {
      return buffer.getTail().toLowerCase();
    }
  }
}

module.exports = {
  createParser
}
