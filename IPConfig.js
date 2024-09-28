const allowedAddresses = {
  ip: `http://172.16.151.223:8080/api/v1`,
};

function formatUnderscoredString(inputString) {
  if (inputString?.includes('_')) {
    return inputString
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  } else {
    return (
      //nthi thy
      inputString?.charAt(0).toUpperCase() + inputString?.slice(1).toLowerCase()
    );
  }
}
module.exports = {
  allowedAddresses,
  formatUnderscoredString,
};
