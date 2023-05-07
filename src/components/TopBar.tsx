import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface TopBarProps {
  title: string;
}

const TopBar: React.FC<TopBarProps> = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    left: 0,
    right: 0,
    top: 0,
    height: 30,
    margin: 0,
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    paddingLeft: 20,
    backgroundColor: '#101010',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default TopBar;
