export const CONFIG = {
    BASE_URL: 'http://localhost:3000',
    API_VERSION: 'api',
    GOOGLE_API_KEY: 'CHANGE ME',
    GOOGLE_CLIENT_ID: 'CHANGE ME',
    FACEBOOK_KEY: 'CHANGE ME',
}

/*
  configure ClientID for social login. 
  redirectUri:'http://localhost/' is required to allow redirect for social login to work on device
 */
import { CustomConfig } from 'ng2-ui-auth';
export class MyAuthConfig extends CustomConfig {
    defaultHeaders = { 'Content-Type': 'application/json' };
    providers = {
        google: {
            clientId: CONFIG.GOOGLE_CLIENT_ID,
            redirectUri: 'http://localhost/'
        },
        facebook: {
            clientId: CONFIG.FACEBOOK_KEY,
            redirectUri: 'http://localhost/'
        }
    };
    tokenName = 'accessToken';
    tokenPrefix = '';
    baseUrl = CONFIG.BASE_URL;
}

export const APPCONFIG = {
    iconMode: 'ios',
    mode: 'md',
    menuType: 'reveal',
    tabsHideOnSubPages: true,
    tabsPlacement: 'top',
    dayShortNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

}