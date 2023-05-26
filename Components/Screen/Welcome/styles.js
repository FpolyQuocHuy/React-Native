import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerlogo: {
        height: 60,
        width: '100%',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
    },
    txtLogo: {
        color: "white",
        marginTop: 6,
        textTransform: 'uppercase'
    },
    imageBg: {

    },
    containerHeader: {
        flex: 1.7,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",

    },
    txtHeader: {
        color: "white"
    },
    txtHeaderChild2: {
        textTransform: 'uppercase',
        fontWeight: "700",
        marginVertical: 7,
    },
    containerBody: {
        flex: 3,
        width: "100%",
        color: "white",

    },



    containerFooter: {
        flex: 1.8,
        width: "100%",
        

    },
    txtFooter: {
       alignSelf:'center',
       color:"white",
       
    },
    txtLine : {
        textDecorationLine : 'underline',
        marginTop:7,
    }
})


export default styles