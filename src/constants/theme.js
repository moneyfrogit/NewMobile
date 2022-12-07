import { Dimensions } from "react-native";
const {width, height} = Dimensions.get("window");

export const COLORS = {
    //base colors
    primary: "#194868", //Dark Blue
    secondary: "#FF615F", //peach
    main: "#a7ce51",  //moneyfrog theme color

    //colors
    black: "#1E1F20",
    white: "#FFFFFF",
    lightGrey: "#F5F7F9",
    lightGrey2: "#ececec",
    grey: "#BEC1D2",
    grey2: "#ececec",
    lightGrey3: "#F5f5f5",
    lightGrey4: "#FAFAFA",
    darkGrey2:"#D4D4D4",
    blue: "#42B0FF",
    darkGray: "#898C95",
    yellow: "#FFD573",
    lightBlue: "#95A9B8",
    darkGreen: "#00B159",
    peach: "#FF615F",
    purple: "#8C44AD",
    red: "#FF0000",
    brown: "#433A3F",
    lightBlue2: "#3D5A6C",
    nun: "#72A98F",
    lightGreen: "#8DE969",
    lightLime: "#CBEF43",
    dBlue: "#6290C3",
    limeGreen: "#C2E7DA",
    DarkBlue: "#1A1B41",
    darkLime: "#BAFF29",
};

export const SIZES = {
    //globle sizes
    base: 8,
    font: 14,
    radius: 12,
    padding1:12,
    padding: 24,
    padding2: 36,

    //font sizes
    largeTitle: 50,
    h1: 22,
    h2: 22,
    h3: 16,
    h4: 14,
    h5: 12,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,

    //app dimentions
    width,
    height
};

export const FONTS = {
    largeTitle: { fontFamily: "Roboto-Regular", fontSize: SIZES.largeTitle, lineHeight:50},
    h1: {fontFamily: "Roboto-Black", fontSize: SIZES.h1, lineHeight:36},
    h2: {fontFamily: "Roboto-Bold", fontSize: SIZES.h2, lineHeight:30},
    h3: {fontFamily: "Roboto-Bold", fontSize: SIZES.h3, lineHeight:22},
    h4: {fontFamily: "Roboto-Bold", fontSize: SIZES.h4, lineHeight:22},
    h5: {fontFamily: "Roboto-Bold", fontSize: SIZES.h5, lineHeight:22},
    body1: {fontFamily: "Roboto-Regular", fontSize: SIZES.body1, lineHeight:36},
    body2: {fontFamily: "Roboto-Regular", fontSize: SIZES.body2, lineHeight:30},
    body3: {fontFamily: "Roboto-Regular", fontSize: SIZES.body3, lineHeight:22},
    body4: {fontFamily: "Roboto-Regular", fontSize: SIZES.body4, lineHeight:22},
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
