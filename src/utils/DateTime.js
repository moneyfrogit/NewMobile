import Moment from 'moment'

const formatDate = (date) => {
	const formatDate = Moment(new Date(date)).format('DD MMMM YYYY')
	return formatDate;
};

export default formatDate 


