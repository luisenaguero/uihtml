/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var root = 'https://api.urbeinternacional.com:8181/';

var url = root + 'urbe-int-api/rest/1.0/';
// 'urbe-api-int/rest/1.0/'

var news_events_url = root + 'urbe-api-ext/rest/1.0/';
var moodle = root + 'urbe-api-ext/rest/1.0/internacional/';
var employee_url = root + 'urbe-rrhh/rest/1.0/';
var URL = {
    SCORE_PEOPLE_AND_PERIOD: 'score/inscription/{0}/owner?idPeriod={1}',
    INSCRIPTION_PEOPLE: 'inscription/people/{0}/owner',
    PERIOD_STUDY_TYPE: 'period/study-type/{0}',
    PERIOD_INSCRIPTION: 'inscription/{0}/periods/owner',
    SCHEDULE_PEOPLE: 'schedule/people/{0}/owner?plusDay={1}',
    SCHEDULE_TEACHER: 'schedule/teacher/{0}?plusDay={1}',
    PAYMENT_PEOPLE: 'payment/people/{0}/payment-status/owner',
    LOGIN: 'auth/loginInter',
    LOGOUT: 'auth/logout',
    INSCRIPTION_ACADEMIC_RECORD: 'inscription/{0}/academic-record/owner',
    IMAGE_PEOPLE: 'people/{0}/photo/owner',
    CHANGE_PASSWORD: 'user/change-password',
    RECOVERY_PASSWORD: 'user/recovery-password/{0}',
    FACULTY_STUDY_TYPE: 'faculty/study-type/{0}',
    SCHOOL_FACULTY: 'faculty/{0}/school',
    STUDY_SCHOOL: 'faculty/school/{0}/study',
    SUBJECT_STUDY: 'subject/study/{0}',
    MOODLE_INT: root + 'urbe-api-ext/rest/1.0/internacional/',
    NEWS_EVENTS_PATH: {
        NEWS: 'information/news',
        EVENTS: 'information/events',
        MOODLE_STUDIES: 'moodle/{0}',
        COLLABORATE_STUDIES: 'collaborate/{0}'
    },
    EMPLOYEE_PATH: {
        VOUCHER: 'voucher/{0}/owner',
        WORK_DAY: 'check?from={0}&to={1}',
        SCHEDULE: 'check/schedule/{0}'
    },
    EAD_LINK: root + "urbe-api-ext/MoodleProxy?id={0}&server={1}"
};

// Nuevas URL 

var dir = {
    PERSONA: url + 'people/',
    REGISTRO_PERSONA: url + 'people/newPeopleInter',
    MODIFICAR_PERSONA: url + 'people/updatePeople',
    DATOS_PERSONALES: url + 'people/list',
    DATOS_CAMBIAR_FOTO: url + 'people/list',
    LOG: {
        IN: url + 'auth/loginInter'
    },
    CUENTA: {
        VERIFICAR: url + 'people/verifyEmail',
        REENVIARCODIGO: url + 'people/sendCode'
    },
    EDIT_PROFILE: url + 'people/',
    ESTUDIO: {
        PERSONA_REGISTRO_ACADEMICO: url + 'payment/inscripciones/persona/',
        ESTUDIO_INFO: url + 'study/:studyID',
        ESTUDIO_ALL: url+ 'payment/study-all/:studyID',
        PERSONA_ESTUDIO_ELEGIDO: 'payment/study-all/'
    }
};



