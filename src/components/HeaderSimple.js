import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native'
import { Badge, Surface, Title } from 'react-native-paper'
import Feather from 'react-native-vector-icons/Feather'
import Colors from '../constants/Colors';
import navigationStrings from '../constants/navigationStrings';
import {useNavigation} from '@react-navigation/native';

const IconSize = 25;

const AppHeader = ({ style, menu, back, title, right, onRightPress, optionalBtn, optionalBtnPress, rightComponent, headerBg, iconColor, titleAlight, optionalBadge }) => {

	const navigation = useNavigation();

	const LeftView = () => (
		<View style={styles.view}>
			{menu && <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
				<Feather name="menu" size={IconSize} color={iconColor} />
			</TouchableOpacity>}
			{back && <TouchableOpacity onPress={() => navigation.goBack()}>
				<Feather name="arrow-left" size={IconSize} color={iconColor} />
			</TouchableOpacity>}
		</View>
	)
	const RightView = () => (
		rightComponent ? rightComponent :
			<View style={[styles.view, styles.rightView]}>
				{optionalBtn && <TouchableOpacity style={styles.rowView} onPress={optionalBtnPress}>
					<Feather name={optionalBtn} size={IconSize} color={iconColor} />
					{optionalBadge && <Badge style={{ position: 'absolute', top: -5, right: -10 }}>{optionalBadge}</Badge>}
				</TouchableOpacity>}
				{right && <TouchableOpacity onPress={onRightPress}>
					<Feather name={right} size={IconSize} color={iconColor} />
				</TouchableOpacity>}
			</View>
	)
	const TitleView = () => (
		<View style={styles.titleView}>
			<Title style={{ color: iconColor, textAlign: titleAlight }}>{title}</Title>
		</View>
	)
	return (
		<Surface style={[styles.header, style, { backgroundColor: headerBg }]}>
			<StatusBar backgroundColor='#a7ce51' barStyle="light-content"/>
			<LeftView />
			<TitleView />
			<RightView />
		</Surface>
	)
}

export default AppHeader

const styles = StyleSheet.create({
	header: {
		height: 50,
		elevation: 8,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		backgroundColor: Colors.black,
		borderRadius:5
	},
	view: {
		marginHorizontal: 16,
		alignItems: 'center',
		flexDirection: 'row',
		backgroundColor:'yello',
	},
	titleView: {
		flex: 1,
	},
	rightView: {
		justifyContent: 'flex-end',
	},
	rowView: {
		flexDirection: 'row',
		alignItems: 'center',
		marginRight: 10,
	}
})




// import { useNavigation } from '@react-navigation/native';
// import React from 'react';
// import { Text, TouchableOpacity, View } from 'react-native';

// const HeaderComp = ({
//     goBack,
//     text,

// }) => {
//     const navigation = useNavigation()
//     return (
//         <View style={{ flexDirection: "row", justifyContent: 'space-between', height: 42 }} >
//             {!!goBack ? <TouchableOpacity
//                 onPress={!!goBack ? goBack : () => navigation.goBack()}
//             >
//                 <Text>GoBack</Text>
//             </TouchableOpacity> : <Text />}
//             <Text>{text}</Text>
//             <Text />
//         </View>
//     );
// };


// export default HeaderComp;



// import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
// import React, {Component} from 'react';
// import {useNavigation} from '@react-navigation/native';
// import imagePath from '../constants/imagePath';

// const HeaderSimple = ({goBack, text}) => {
//   const navigation = useNavigation();

//   return (
//     <View
//       style={{
//         flexDirection: 'row',
//         height: 50,
//       }}>
//       <View style={{flex: 1, justifyContent: 'center'}}>
//         {!!goBack ? (
//           <TouchableOpacity
//             onPress={!!goBack ? goBack : () => navigation.goBack()}>
//             <Image
//               style={{resizeMode: 'contain', width: 24, height: 24}}
//               source={imagePath.ic_anotherback}
//             />
//           </TouchableOpacity>
//         ) : (
//           <Text />
//         )}
//       </View>

//       <View
//         style={{
//           flex: 2,
//           justifyContent: 'center',
//         }}>
//         <Text style={{textAlign: 'center', fontSize: 20}}>{text}</Text>
//       </View>
//     </View>
//   );
// };

// export default HeaderSimple;
