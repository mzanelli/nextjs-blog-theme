import axios from 'axios';
import moment from 'moment';

export const fetchData = async () => {
  try {
    const response = await axios.get('https://cdn.contentful.com/spaces/0bv8gxydrej4/environments/master/entries?access_token=MSqGv82hkbo11Fto-9QR3nhBF-YizM-cnWYTwU0UaC4');
    let data = response.data.items;
    data.sort((a, b) => moment(b.fields.dateCreated).diff(moment(a.fields.dateCreated)));   
    return data;
  } catch (error) {
    console.error(error);
    
  }
};