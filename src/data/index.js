const jsonArray = [];
function importAll(requireJSON) {
  requireJSON.keys().forEach((key) => {
    const data = requireJSON(key);
    jsonArray.push(data);
  });
}
importAll(require.context('./json/', true, /\.json$/));
export default jsonArray;
