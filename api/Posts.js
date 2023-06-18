import axios from 'axios';

export const fetchData = async () => {
  try {
    const response = await axios.get('https://cdn.contentful.com/spaces/0bv8gxydrej4/environments/master/entries?access_token=MSqGv82hkbo11Fto-9QR3nhBF-YizM-cnWYTwU0UaC4');
    return response.data.items
  } catch (error) {
    console.error(error);
  }
};