
export class ServerConfig {

      private static notificationSenderID = "19285209844";

      private static path: string = 'https://educoresystems.in/api-v1.0/';
     // private static path: string = 'http://192.168.0.110:9000/';
      private static version: string | number = 'api-v1.0';
      private static authPrefix: string = '';
      private static viewName :string ='?RESPONSE_VIEW=';
      private static imageView :string = "https://educoresystems.in/api-v1.0/zuul/files/browse/";

      public static setApiVersion(version: string = 'api-v1.0'): void {
        ServerConfig.version = version;
      }

      public static getApiVersion(): string | number {
        return ServerConfig.version;
      }

      public static setViewName(viewName:string):void{
        ServerConfig.viewName = ServerConfig.viewName+viewName;
      }

      public static getViewName():string{

        return ServerConfig.viewName;
      }

      public static setBaseURL(url: string = '/'): void {
        ServerConfig.path = url;
      }

      public static getPath(): string {
        return ServerConfig.path;
      }

      public static setAuthPrefix(authPrefix: string = ''): void {
        ServerConfig.authPrefix = authPrefix;
      }

      public static getAuthPrefix(): string {
        return ServerConfig.authPrefix;
      }

      public static senderID(){
        return ServerConfig.notificationSenderID;
      }

      public static imagePath():string{
        return ServerConfig.imageView;
      }

    }
