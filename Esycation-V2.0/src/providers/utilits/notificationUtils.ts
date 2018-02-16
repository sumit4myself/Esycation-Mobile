export class NotificationUtils {

    public static findColor(title: string): string {

        let type = title.substring(0, 1);
        
        if (type == 'I')
            return "#488aff";
        else if (type == 'U')
            return "#f53d3d";
        else if (type == 'A')
            return "#ffeb3b";
        else if (type == 'H')
            return "#ff5722";
        else if (type == 'INFORMATIVE')
            return "#488aff";
        else if (type == 'URGENT')
            return "#f53d3d";
        else if (type == 'ACTIONABLE')
            return "#ffeb3b";
        else if (type == 'HOMEWORK')
            return "#ff5722";    
        else
            return "#9e9e9e";
    }

    public static findFirstLatter(title: string): string {

        return title.substring(0, 1);
    }
}