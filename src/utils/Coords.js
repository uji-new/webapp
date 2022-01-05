export default (coords) => {
	if (coords) return coords.split(',').map(coord => {
		return Number(coord).toLocaleString(undefined, {
			style: 'unit', unit: 'degree', minimumFractionDigits: 2, maximumFractionDigits: 2
		});
	}).join(' ');
}
