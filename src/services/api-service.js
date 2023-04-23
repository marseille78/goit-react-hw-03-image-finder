const API_KEY = '15123104-3b821bb91bdfb6ca9429ae7b9';
const STEP = 12;

class ApiService {
  BASE_URL = 'https://pixabay.com/api/';
  OPTS = `image_type=photo&orientation=horizontal&per_page=${ STEP }`;

  getResource(req, page) {
    const url = `${ this.BASE_URL }?key=${ API_KEY }&q=${ req }&${ this.OPTS }&page=${ page }`;

    return fetch(url).then(res => {
        if (!res.ok) {
          return Promise.reject(new Error(`There are not images in category ${req}`));
        }
        return res.json();
      })
      .then(data => {
        const { totalHits, hits } = data;
        return { totalHits, hits: this.transformResponse(hits) };
      });
  }

  transformResponse(res) {
    return res.map(item => {
      return {
        id: item.id,
        webformatURL: item.webformatURL,
        largeImageURL: item.largeImageURL,
      };
    });
  }
}

export const apiService = new ApiService();
