import { Text, TouchableOpacity, props } from 'react-native'
import React from 'react'
import styles from './styles'

const UIButton = (props) => {
    const { onPress, title, isSelected } = props;
    return (

        <TouchableOpacity onPress={onPress}
    
            style={{
                borderWidth: 2,
                borderColor: "white",
                marginVertical: 20,
                marginHorizontal: 40,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: "center",
                padding: 5,
                backgroundColor : isSelected == true ? 'white' : null,
                height: 45,
            }}>

            <Text style={{ color: 'white', fontWeight: "600" }}>{title}</Text>
        </TouchableOpacity>

    )
}

export default UIButton