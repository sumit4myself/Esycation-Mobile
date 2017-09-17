
export class ServerConfig {

  private static notificationSenderID = "19285209844";
  
  private static path: string = 'http://educoresystems.com/';
  private static version: string | number = 'api-v1.0';
  private static authPrefix: string = '';
  private static debug: boolean = true;
  private static viewName :string ='?RESPONSE_VIEW=';

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

  public static setDebugMode(isEnabled: boolean): void {
    ServerConfig.debug = isEnabled;
  }

  public static debuggable(): boolean {
    return ServerConfig.debug;
  }

  public static senderID(){
    return ServerConfig.notificationSenderID;
  }

}
