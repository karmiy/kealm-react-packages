import { AppRegistry } from 'react-native';
import { DemoHomePage } from './demo-home';

export const pages = [DemoHomePage];

pages.forEach(([Page, PageProvider]) => {
    AppRegistry.registerComponent(Page, PageProvider);
});
