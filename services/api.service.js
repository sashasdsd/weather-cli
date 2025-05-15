import https from 'https';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';
import axios from 'axios';

const getIcon = (icon) => {
	switch (icon.slice(0, -1)) {
		case '01':
			return '☀️';      // ясно
		case '02':
			return '🌤️';     // невелика хмарність
		case '03':
			return '☁️';      // хмарно
		case '04':
			return '☁️';      // дуже хмарно
		case '09':
			return '🌧️';     // дощ
		case '10':
			return '🌦️';     // дощ із сонцем
		case '11':
			return '⛈️';      // гроза
		case '13':
			return '❄️';      // сніг
		case '50':
			return '🌫️';

	}
}
// const getIcon = (icon) => {
// switch(icon.slice(0, -1)){
// 	case '01':
// 		return ''
// }
// };

// const getWeather = async (city) => {
// 	const token = await getKeyValue(TOKEN_DICTIONARY.token);
// 	if (!token) {
// 		throw new Error('не задан ключ API, задайте його через команду -t [API_KEY]')
// 	}
// 	const url = new URL('https://api.openweathermap.org/data/2.5/weather');
// 	url.searchParams.append('q', city);
// 	url.searchParams.append('appid', token);
// 	url.searchParams.append('lang', 'uk');
// 	url.searchParams.append('units', 'metric');
// 	https.get(url, (response) => {
// 		let res = '';
// 		response.on('data', (chunk) => {
// 			res += chunk;

// 		});
// 		response.on('end', () => {
// 			console.log(res);
// 		});
// 	});
// }
const getWeather = async (city) => {
	const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);
	if (!token) {
		throw new Error('не задан ключ API, задайте його через команду -t [API_KEY]')
	}
	const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
		params: {
			q: city,
			appid: token,
			lang: 'ua',
			units: 'metric'
		}
	});

	return data;
};
export { getWeather, getIcon };