import axios from 'axios';

const API_KEY = '27706383-91c8b42ba8d974d916db19321';

export const fetchImages = (searchingTerm, page = 1) => {
  return axios
    .get(
      `https://pixabay.com/api/?q=${searchingTerm}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then(resp => resp.data);
};
