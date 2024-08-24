Array.prototype.sum = function() {
  return this.reduce((acc, val) => acc + val, 0);
};

Array.prototype.average = function() {
  return this.sum() / this.length;
};

Array.prototype.max = function() {
  return Math.max(...this);
};

Array.prototype.min = function() {
  return Math.min(...this);
};

Array.prototype.median = function() {
  const sorted = [...this].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
};

Array.prototype.mode = function() {
  const frequency = {};
  let maxFreq = 0;
  let modes = [];

  this.forEach(value => {
    frequency[value] = (frequency[value] || 0) + 1;
    if (frequency[value] > maxFreq) {
      maxFreq = frequency[value];
    }
  });

  for (const key in frequency) {
    if (frequency[key] === maxFreq) {
      modes.push(Number(key));
    }
  }

  return modes;
};

Array.prototype.unique = function() {
  return [...new Set(this)];
};

Array.prototype.flatten = function() {
  return this.reduce((acc, val) => Array.isArray(val) ? acc.concat(val.flatten()) : acc.concat(val), []);
};

Array.prototype.compact = function() {
  return this.filter(Boolean);
};

Array.prototype.intersection = function(arr2) {
  return this.filter(value => arr2.includes(value));
};
