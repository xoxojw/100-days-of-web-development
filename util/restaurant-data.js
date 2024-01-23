const filePath = path.join(__dirname, 'data', 'restaurants.json');

export const getStoredRestaurants = () => {
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  return storedRestaurants;
};

export const storeRestaurants = (storableRestaurants) => {
  fs.writeFileSync(filePath, JSON.stringify(storableRestaurants));
}