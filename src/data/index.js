const dictionary = [];
let count = 0;
function importAll(requireJSON) {
  requireJSON.keys().forEach((key) => {
    const data = requireJSON(key);
    count += Object.keys(data).length;
    dictionary.push(data);
  });
  return count;
}
const total = importAll(require.context('./json/', true, /\.json$/));
export { total, dictionary };
