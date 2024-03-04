export const fetchData = async (apiUrl) => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Failed to fetch data: ');

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error in fetch data: ', error);
    return null;
  }
};
