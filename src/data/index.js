const dictionary = [];
let count = 0;
function importAll(requireJSON) {
  requireJSON.keys().forEach((key) => {
    const letter = key.replace(/^.*[\\/]/, '').split('.')[0].toUpperCase();
    const data = requireJSON(key);
    const section = {
      header: {
        letter,
        expand: true,
      },
      words: data,
    };
    count += Object.keys(data).length;
    dictionary.push(section);
  });
  return count;
}
const total = importAll(require.context('./json/', true, /\.json$/));
export { total, dictionary };
