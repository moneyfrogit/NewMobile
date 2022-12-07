import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';



class DashboardSectionDivider extends Component{
	render() {
		return <View style={[ styles.divider, this.props.style ]} />;
	}
}

const styles = StyleSheet.create({
	divider: {
		alignSelf: 'center',
		backgroundColor: '#888',
		opacity: 0.4,
		height: 2,
		width: 100,
		borderRadius: 20,
		marginVertical: 8
	}
});

export default DashboardSectionDivider;
