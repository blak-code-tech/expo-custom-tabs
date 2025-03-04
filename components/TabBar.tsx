import { View,StyleSheet } from 'react-native';
import TabBarButton from './TabBarButton';

function TabBar({ state, descriptors, navigation }: any) {
    
    const primaryColor = "#0891b2"
    const greyColor = "#737373"
    return (
        <View style={styles.container}>
            {state.routes.map((route:any, index:number) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;
                if (["_sitemap", "+not-found"].includes(route.name)) return null

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return <TabBarButton
                    key={route.name}
                    style={styles.tabbarItem}
                    onPress={onPress}
                    onLongPress={onLongPress}
                    isFocused={isFocused}
                    routeName={route.name}
                    color={isFocused ? primaryColor : greyColor}
                    label={label}
                />

                // return (
                //     <TouchableOpacity
                //         key={route.name}
                //         style={styles.tabbarItem}
                //         accessibilityRole="button"
                //         accessibilityState={isFocused ? { selected: true } : {}}
                //         accessibilityLabel={options.tabBarAccessibilityLabel}
                //         testID={options.tabBarTestID}
                //         onPress={onPress}
                //         onLongPress={onLongPress}
                //     >
                //         {
                //             icons[route.name]({ color: isFocused ? primaryColor : greyColor })
                //         }
                //         <Text style={{ color: isFocused ? primaryColor : greyColor, fontSize: 11 }}>
                //             {label}
                //         </Text>
                //     </TouchableOpacity>
                // );
            })}
        </View>
    );
}

export default TabBar

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        position: "absolute",
        bottom: 25,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        marginHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 25,
        borderCurve: "continuous",
        shadowColor: "black",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        shadowOpacity: 0.1
    },
    tabbarItem: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 5
    }
})
