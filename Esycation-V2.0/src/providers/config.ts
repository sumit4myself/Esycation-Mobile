export class ServerConfig {

  //private static path: string = "http://demo.educoresystems.com/";
  private static path: string = "https://educoresystems.in/";

  private static version: string | number = "api-v1.0/";

  private static viewName: string = "?RESPONSE_VIEW=";
  private static browseFileUri: string = "zuul/files/browse/";
  private static downloadFileUri: string = "zuul/files/download/";

  public static getApiVersion(): string | number {
    return ServerConfig.version;
  }

  public static setViewName(viewName: string): void {
    ServerConfig.viewName = ServerConfig.viewName + viewName;
  }

  public static getViewName(): string {
    return ServerConfig.viewName;
  }

  public static getPath(): string {
    return ServerConfig.path + ServerConfig.version;
  }

  public static browseFilePath(): string {
    return ServerConfig.getPath() + ServerConfig.browseFileUri;
  }

  public static downloadFilePath(): string {
    return ServerConfig.getPath() + ServerConfig.downloadFileUri;
  }
}
