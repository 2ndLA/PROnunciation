const dictionary = [];
function importAll(requireJSON) {
  requireJSON.keys().forEach((key) => {
    const data = requireJSON(key);
    dictionary.push(data);
  });
}
importAll(require.context('./json/', true, /\.json$/));
export default dictionary;
