export class NotificationUtils {

    public static findColor(title: string): string {

        let type = title.substring(0, 1);
        if (type == 'S')
            return "#EA1E63";
        else if (type == 'O')
            return "#0059B2";
        else if (type == 'E')
            return "#8dc34b";
        else if (type == 'P')
            return "#ff9800";
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