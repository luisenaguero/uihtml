/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var root =
    'https://urbe-api.urbe.edu/';
    //'http://10.50.3.5/';
    //'http://localhost:8180/';
    //'http://10.200.36.27:8080/';
    //'http://10.50.2.135:8080/';
var url = root + 
      'urbe-api/rest/1.0/';
       // 'urbe-api-int/rest/1.0/'
                   
var news_events_url = root + 'urbe-api-ext/rest/1.0/';
var moodle = root + 'urbe-api-ext/rest/1.0/internacional';
var employee_url = root + 'urbe-rrhh/rest/1.0/';
var URL = {
    SCORE_PEOPLE_AND_PERIOD: 'score/inscription/{0}/owner?idPeriod={1}',
    INSCRIPTION_PEOPLE: 'inscription/people/{0}/owner',
    PERIOD_STUDY_TYPE: 'period/study-type/{0}',
    PERIOD_INSCRIPTION: 'inscription/{0}/periods/owner',
    SCHEDULE_PEOPLE: 'schedule/people/{0}/owner?plusDay={1}',
    SCHEDULE_TEACHER: 'schedule/teacher/{0}?plusDay={1}',    
    PAYMENT_PEOPLE: 'payment/people/{0}/payment-status/owner',
    LOGIN: 'auth/login',
    LOGOUT: 'auth/logout',
    INSCRIPTION_ACADEMIC_RECORD: 'inscription/{0}/academic-record/owner',
    IMAGE_PEOPLE: 'people/{0}/photo/owner',
    CHANGE_PASSWORD: 'user/change-password',
    RECOVERY_PASSWORD: 'user/recovery-password/{0}',
    FACULTY_STUDY_TYPE: 'faculty/study-type/{0}',
    SCHOOL_FACULTY: 'faculty/{0}/school',
    STUDY_SCHOOL: 'faculty/school/{0}/study',
    SUBJECT_STUDY: 'subject/study/{0}',
    NEWS_EVENTS_PATH: {
        NEWS: 'information/news',
        EVENTS: 'information/events',
        MOODLE_STUDIES: 'moodle/{0}',
        COLLABORATE_STUDIES: 'collaborate/{0}'
    },
    EMPLOYEE_PATH: {
        VOUCHER: 'voucher/{0}/owner',
        WORK_DAY:'check?from={0}&to={1}',
        SCHEDULE:'check/schedule/{0}'
    },
    EAD_LINK: root + "urbe-api-ext/MoodleProxy?id={0}&server={1}"
};
