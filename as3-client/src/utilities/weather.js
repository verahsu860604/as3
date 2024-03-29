export function getMoodIcon(group) {
    switch (group) {
        case 'Thunder':
            return 'fa fa-bolt';
        case 'Drizzle':
            return 'fa fa-tint';
        case 'Rain':
            return 'fa fa-umbrella';
        case 'Snow':
            return 'fa fa-snowflake-o';
        case 'Windy':
            return 'owf owf-905';
        case 'Clear':
            return 'fa fa-sun-o';
        case 'Clouds':
            return 'fa fa-cloud';
        default:
            return 'fa fa-question-circle';
    }
}
