const replaceNumberWithCommas = (amount) => {
	if (amount == undefined) {
		amount = 0;
	}
	amount = Math.round(amount);
	amount = amount.toString();
	var check_dot = amount.search(/\./i);

	if (check_dot > 0) {
		amount = amount.replace(/,/g, '');
		var exp_array = amount.split('.');
		var x = exp_array['0'].toString();
		var lastThree = x.substring(x.length - 3);
		var otherNumbers = x.substring(0, x.length - 3);
		if (otherNumbers != '') lastThree = ',' + lastThree;
		var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
		return res + '.' + exp_array['1'];
	} else {
		amount = amount.replace(/,/g, '');

		if (amount < 0) {
			amount = amount.replace(/-/g, '');
			var x = amount.toString();
			var lastThree = x.substring(x.length - 3);
			var otherNumbers = x.substring(0, x.length - 3);
			if (otherNumbers != '') lastThree = ',' + lastThree;
			var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
			return '-' + res;
		} else {
			var x = amount.toString();
			var lastThree = x.substring(x.length - 3);
			var otherNumbers = x.substring(0, x.length - 3);
			if (otherNumbers != '') lastThree = ',' + lastThree;
			var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
			return res;
		}
	}
};

const amountToText = (amount, decimalPrecision = 2) => {
	amount = Math.abs(amount);
	if (isNaN(amount) || typeof amount == undefined) {
		return '-';
	}

	if (amount < 1000) {
		amount = parseFloat(Math.round(amount).toFixed(decimalPrecision));
	} else if (amount >= 10000000) {
		amount = parseFloat((amount / 10000000).toFixed(decimalPrecision)) + 'Cr';
	} else if (amount >= 100000) {
		amount = parseFloat((amount / 100000).toFixed(decimalPrecision)) + 'L';
	} else if (amount >= 1000) {
		amount = parseFloat((amount / 1000).toFixed(decimalPrecision)) + 'K';
	}

	return amount;
};

export { replaceNumberWithCommas, amountToText };
