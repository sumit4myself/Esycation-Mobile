export class Batch {

    id: number;
    name: string;
    code: string;

    constructor() { }
}



export class TimetableTransormer {
    public static transformToDayTimetable(
        data: any,
        dayId: number
    ): any {
        let timetableDays: Array<any> = new Array<any>();
        for (let today of data.timetableDays) {
            if (dayId == today.dayId) {
                timetableDays.push(today);
            }
        }
        data.timetableDays = timetableDays;

        return data;
    }
}