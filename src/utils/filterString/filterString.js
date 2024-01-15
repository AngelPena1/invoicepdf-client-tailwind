function filterString(array, text) {
  const result = [];
  if (array.includes(text)) {
    result.push();
  }
  //   array.forEach((element) => {
  //     console.log(element);
  //     if (element.toLowerCase().includes(text.toLowerCase())) {
  //       return result.push(element);
  //     }
  //   });
  console.log(result);
  return result;
}

module.exports = { filterString };
