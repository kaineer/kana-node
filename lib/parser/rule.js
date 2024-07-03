//

const createRule = (re, options = {}) => {
  let matches = null;
  let groupNo = 0;

  const { drop, push } = options;

  const getGroupNo = () => {
    if (drop || push) {
      return 0;
    } else {
      return (matches || []).length > 1 ? 1 : 0;
    }
  }

  const getPush = () => {
    if (push) {
      if (typeof push === "function") {
        return push(matches);
      } else {
        return push;
      }
    } else {
      return matches[groupNo];
    }
  }

  const getDrop = () => {
    if (matches && !drop) {
      return matches[groupNo].length;
    } else if(typeof drop === "number") {
      return drop;
    }

    return 0;
  }

  return {
    accepts(buffer) {
      matches = buffer.getTail().match(re);
      if (matches) {
        groupNo = getGroupNo();
      }
      return !!matches;
    },
    getMatches() {
      return matches;
    },
    handle(buffer) {
      buffer.push(getPush());
      buffer.drop(getDrop());
    }
  }
}

module.exports = {
  createRule
}
