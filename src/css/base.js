import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "*": {
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0
    },
    "PC": {
        "width": 360,
        "height": 600,
        "overflowY": "scroll",
        "position": "relative",
        "zIndex": 9999999999
    },
    "body": {
        "fontSize": 15
    },
    "[data-dpr=\"2\"] body": {
        "fontSize": 30
    },
    "[data-dpr=\"3\"] body": {
        "fontSize": 45
    }
});