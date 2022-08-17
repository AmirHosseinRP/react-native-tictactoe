import {Button, StyleSheet, Text, View} from 'react-native';
import Block from "./components/Block";
import {useEffect, useState} from "react";
import {vw} from 'react-native-expo-viewport-units';
import {createContext} from "react";
import {DevSettings} from 'react-native';

export const IsXTurn = createContext(undefined);
export const Types = createContext(undefined);
export const Winner = createContext(undefined);

export default function App() {

    const [isXTurn, setIsXTurn] = useState(true);
    const [blocks, setBlocks] = useState([]);
    const [winner, setWinner] = useState('');
    const [types, setTypes] = useState(
        [
            'e1', 'e2', 'e3',
            'e4', 'e5', 'e6',
            'e7', 'e8', 'e9'
        ]
    );
    const checkWin = () => {
        if (!winner) {
            for (let i = 0; i < 9; i++) {
                if (
                    types[0] === types[1] &&
                    types[1] === types[2] ||
                    types[3] === types[4] &&
                    types[4] === types[5] ||
                    types[6] === types[7] &&
                    types[7] === types[8] ||
                    types[0] === types[3] &&
                    types[3] === types[6] ||
                    types[1] === types[4] &&
                    types[4] === types[7] ||
                    types[2] === types[5] &&
                    types[5] === types[8] ||
                    types[0] === types[4] &&
                    types[4] === types[8] ||
                    types[2] === types[4] &&
                    types[4] === types[6]
                ) {
                    if (isXTurn) {
                        setWinner('O Won');
                    } else {
                        setWinner('X Won');
                    }
                }
            }
        }
    }

    useEffect(() => {
        checkWin();
        console.log(types);
    }, [isXTurn])

    useEffect(() => {
        const temp = [];
        for (let i = 1; i < 10; i++) {
            temp.push(<Block key={i} id={i - 1}/>)
        }
        setBlocks(temp);
    }, []);

    return (
        <Winner.Provider value={winner}>
            <Types.Provider value={[types, setTypes]}>
                <IsXTurn.Provider value={[isXTurn, setIsXTurn]}>
                    <View style={styles.body}>
                        {!winner ?
                            <Text>{isXTurn ? 'X Turn' : 'O Turn'}</Text>
                            :
                            <Text>{winner}</Text>}
                        <View style={styles.container}>
                            {blocks.map((block) => {
                                return block;
                            })}
                        </View>
                        <Button title={'reset'} onPress={() => DevSettings.reload()}/>
                    </View>
                </IsXTurn.Provider>
            </Types.Provider>
        </Winner.Provider>
    );
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: 'cyan',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    container: {
        margin: 10,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: vw(66),
        aspectRatio: '1/1',
        flexWrap: 'wrap',
        borderRadius: 10,
        borderWidth: 5,
    },
});
