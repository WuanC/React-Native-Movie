import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import AppNavigator from './src/components/AppNavigator';

const API_KEY = '77292bdf9885177363d6cb3a223abef1';

export default function App() {
  return (
    <AppNavigator />
  );
}
