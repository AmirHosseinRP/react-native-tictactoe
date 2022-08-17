import {Pressable, StyleSheet, Text} from 'react-native';
import {useEffect, useState} from "react";
import {vw} from 'react-native-expo-viewport-units';
import {useContext} from "react";
import {IsXTurn, Types, Winner} from "../App";

function Block(props) {

    const [isXTurn, setIsXTurn] = useContext(IsXTurn);
    const [types, setTypes] = useContext(Types);
    const [inner, setInner] = useState('');
    const winner = useContext(Winner);

    useEffect(() => {
        if (types[props.id] === 'X' || types[props.id] === 'O')
            setInner(types[props.id]);
    }, [isXTurn]);

    function handleClick() {
        if (!winner) {
            const temp = types;
            if (isXTurn) {
                temp[props.id] = 'X';
                setTypes(temp);
            } else {
                temp[props.id] = 'O';
                setTypes(temp);
            }
            setIsXTurn(!isXTurn);
        }
    }

    return (
        <Pressable
            style={styles.block}
            onPress={handleClick}>
            <Text>{inner}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    block: {
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        width: vw(19),
        margin: vw(1),
        aspectRatio: '1/1',
        borderRadius: 10,
        borderWidth: 5,
    }
});
export default Block;